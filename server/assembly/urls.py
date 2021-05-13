from django.urls import path
from .views import *
from django.conf.urls import include

from .views import LawViewset
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'laws', LawViewset, basename='law')
urlpatterns = router.urls

urlpatterns += [
    path('accounts', account_list),
    path('accounts/<int:pk>', account),
    path('login/<str:username>/<str:password>/', login),
    path('auth', include('rest_framework.urls', namespace='rest_framework'))
]
