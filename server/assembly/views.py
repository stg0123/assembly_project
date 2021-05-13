from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AuthUser
from .serializers import AccountSerializer ,LawmakerCarrerSerializer,LawmakerRecodeSerializer
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate
import datetime

from rest_framework.parsers import JSONParser
from .models import Law, Lawmaker,LawmakerRecord,LawmakerCareer, Comments, LikeLaw, CommentsLike
from .serializers import LawSerializer, LawmakerSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from django.db.models import F, Q
from django.shortcuts import get_object_or_404


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 100

class LawViewset(viewsets.ModelViewSet):
    queryset = Law.objects.all()
    serializer_class = LawSerializer
    pagination_class = LargeResultsSetPagination

    # ?search=키워드
    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.GET.get('search', '')
        if search:
            qs = qs.filter(bill_name__contains=search)
        return qs

class LawmakerViewset(viewsets.ModelViewSet):
    queryset = Lawmaker.objects.all()
    serializer_class = LawmakerSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.GET.get('search', '')
        if search:
            qs = qs.filter(name__contains=search)
        return qs

class Top3Viewset(viewsets.ModelViewSet):
    queryset = Law.objects.annotate(like_sum=F('law_like')+F('law_dislike')).order_by('-like_sum')[:3]
    serializer_class = LawSerializer


@csrf_exempt
def law_detail(request, law_id):
    detail = list(Law.objects.filter(law_id=law_id).values())[0]
    comments = sorted(list(Comments.objects.filter(law_id=law_id).values()), key=lambda c: -c['comment_like'])
    like_comments = [comment for comment in comments if comment['like_dislike']=='like']
    dislikes_comments = [comment for comment in comments if comment['like_dislike']=='dislike']

    return JsonResponse({
        'detail': detail,
        'like_comments': like_comments,
        'dislikes_comments': dislikes_comments,
    }, safe=False, json_dumps_params={'ensure_ascii': False})


@csrf_exempt
def like_law(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_id = data['username']
        like_dislike = data['like_dislike']
        law_id = data['law_id']

        try:
            ll = LikeLaw.objects.get(Q(user_id=user_id) & Q(law_id=law_id))
        except LikeLaw.DoesNotExist:
            ll = None

        if ll:
            return JsonResponse({"success": False, "message": "already clicked"}, status=200)

        LikeLaw.objects.create(user_id=user_id, law_id=law_id, like_dislike=like_dislike)
        law = Law.objects.get(law_id=law_id)
        if like_dislike == 'like':
            law.law_like = law.law_like + 1
        else:
            law.law_dislike = law.law_dislike + 1
        law.save()

        return JsonResponse({"success": True,"message": "click success"},status=200)

@csrf_exempt
def append_comment(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_id = data['username']
        law_id = data['law_id']
        content = data['content']
        like_dislike = data['like_dislike']

        Comments.objects.create(user_id=user_id, comment=content, like_dislike=like_dislike, law_id=law_id, comment_like=0)

        return JsonResponse({"success": True, "message": "comment success"},status=200)

@csrf_exempt
def like_comment(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        user_id = data['username']
        # law_id = data['law_id']
        comment_id = data['comment_id']

        try:
            cl = CommentsLike.objects.get(Q(user_id=user_id) & Q(id=comment_id))
        except CommentsLike.DoesNotExist:
            cl = None

        if cl:
            return JsonResponse({"success": False, "message": "already clicked"}, status=200)

        CommentsLike.objects.create(user_id=user_id, comment_id=comment_id)
        comment = Comments.objects.get(id=comment_id)
        comment.comment_like = comment.comment_like + 1
        comment.save()

        return JsonResponse({"success": True, "message": "like comment success"},status=200)

@csrf_exempt
def account_list(request):
    if request.method == 'GET':
        query_set = Account.objects.all()
        serializer = AccountSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        data['is_superuser']=0
        data['is_staff']=0
        data['is_active']=1
        data['date_joined']=datetime.datetime.now()
        serializer = AccountSerializer(data=data)
        temp=dict()
        #success
        if serializer.is_valid():
            serializer.save()
            temp["success"]=True
            temp['message']="accounts success"
            return JsonResponse(temp, status=200)
        #error handle
        temp['success']=False
        temp['message']=str(serializer.errors['username']).split("'")[1]
        return JsonResponse(temp, status=200)


@csrf_exempt
def account(request, pk):

    obj = Account.objects.get(pk=pk)

    if request.method == 'GET':
        serializer = AccountSerializer(obj)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(obj, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        obj.delete()
        return HttpResponse(status=204)

@csrf_exempt
def person_detail(request,id):
    if request.method == 'GET':
        result ={}
        data1 = LawmakerSerializer(Lawmaker.objects.get(id=id))
        name = data1.data["name"]
        data2 = LawmakerRecodeSerializer(LawmakerRecord.objects.filter(lawmaker_name=name)[0])
        data3 = LawmakerCareer.objects.filter(lawmaker_name=name)
        result[0]=data1.data
        result[1]=data2.data
        n=2
        for d in data3:
            result[n] = LawmakerCarrerSerializer(d).data
            n+=1
    return JsonResponse(result, safe=False, json_dumps_params={'ensure_ascii': False})
        

        
    



@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search_email = data['username']

        #user = authenticate(username=search_email, password=data['password'])
        obj=AuthUser.objects.get(username=search_email)
        if data['password']==obj.password:
        #if user:
            return JsonResponse({"success": True,"message": "login success"},status=200)
        return JsonResponse({"success": False,"message": "login fail"},status=200)
