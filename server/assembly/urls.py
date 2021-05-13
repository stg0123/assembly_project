# from django.urls import path
# from . import views
#
# urlpatterns = [
#     path('laws/', views.LawViewset),
#     # path('snippets/<int:pk>/', views.snippet_detail),
# ]

from .views import LawViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'laws', LawViewset, basename='law')
urlpatterns = router.urls
