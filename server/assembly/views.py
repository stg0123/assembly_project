from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AuthUser
from .serializers import AccountSerializer
from rest_framework.parsers import JSONParser
from django.contrib.auth import authenticate
import datetime
@csrf_exempt
def account_list(request):
    if request.method == 'GET':
        query_set = AuthUser.objects.all()
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
        return JsonResponse(temp, status=400)


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
        
        #user = authenticate(username=search_email, password=data['password'])
        obj=AuthUser.objects.get(username=search_email)
        if data['password']==obj.password:
        #if user:
            return JsonResponse({"success": True,"message": "login success"},status=200)
        return JsonResponse({"success": False,"message": "login fail"},status=400)