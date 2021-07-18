from django.urls import path
from .views import *
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('laws', LawViewset, basename='laws')
router.register('top3', Top3Viewset, basename='top3')
router.register('lawmakers', LawmakerViewset, basename='lawmakers')
urlpatterns = router.urls

urlpatterns += [
    path('accounts', account_list),
    path('accounts/<int:pk>', account),
    path('login', login),
    path('person/<int:id>',person_detail),
    path('auth', include('rest_framework.urls', namespace='rest_framework')),
    path('law_detail/<str:law_id>', law_detail),
    path('like_law', like_law),
    path('append_comment', append_comment),
    path('like_comment', like_comment),
]
