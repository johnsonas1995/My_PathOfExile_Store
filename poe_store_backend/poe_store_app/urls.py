from . import views
from django.urls import path

urlpatterns = [
    path('', views.index),
    path('stashes/<str:league>/<int:tab_index>/', views.getStashTabs),
]