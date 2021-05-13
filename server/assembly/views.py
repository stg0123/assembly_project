from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AuthUser
from .serializers import AccountSerializer
from rest_framework.parsers import JSONParser

from rest_framework.parsers import JSONParser
from .models import Law
from .serializers import LawSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets
from django.db.models import F

class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 100

class LawViewset(viewsets.ModelViewSet):
    queryset = Law.objects.all()
    serializer_class = LawSerializer
    pagination_class = LargeResultsSetPagination

    def get_queryset(self):
        qs = super().get_queryset()
        search = self.request.GET.get('search', '')
        if search:
            qs = qs.filter(bill_name__contains=search)
        return qs

class Top3Viewset(viewsets.ModelViewSet):
    queryset = Law.objects.annotate(like_sum=F('law_like')+F('law_dislike')).order_by('-like_sum')[:3]
    serializer_class = LawSerializer


@csrf_exempt
def account_list(request):
    if request.method == 'GET':
        query_set = AuthUser.objects.all()
        serializer = AccountSerializer(query_set, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = AccountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def account(request, pk):

    obj = AuthUser.objects.get(pk=pk)

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
def login(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search_email = data['username']
        obj = AuthUser.objects.get(email=search_email)

        if data['password'] == obj.password:
            return HttpResponse(status=200)
        return HttpResponse(status=400)
