from django.urls import path
from .views import *
from django.conf.urls import include

from .views import LawViewset, Top3Viewset, LawmakerViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'laws', LawViewset, basename='laws')
router.register(r'top3', Top3Viewset, basename='top3')
router.register(r'lawmakers', LawmakerViewset, basename='lawmakers')
urlpatterns = router.urls

urlpatterns += [
    path('accounts', account_list),
    path('accounts/<int:pk>', account),
    path('login', login),
    path('auth', include('rest_framework.urls', namespace='rest_framework')),
    path('law_detail/<str:law_id>', law_detail),
]
