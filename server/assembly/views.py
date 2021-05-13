from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Law
from .serializers import LawSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'page_size'
    max_page_size = 100

# @csrf_exempt
# def law_list(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         laws = Law.objects.all()
#         serializer = LawSerializer(laws, many=True)
#         return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False})
class LawViewset(viewsets.ModelViewSet):
    queryset = Law.objects.all()
    serializer_class = LawSerializer
    pagination_class = LargeResultsSetPagination
