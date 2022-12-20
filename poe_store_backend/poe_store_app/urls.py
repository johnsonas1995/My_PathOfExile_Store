from . import views
from django.urls import path, re_path

urlpatterns = [
    path('', views.index),
    path('signIn/', views.signIn),
    path('signUp/', views.signUp),
    path('signOut/', views.signOut),
    path('current_user', views.curr_user),
    path('stashes/<str:league>/<int:tab_index>/', views.getStashTabs),
    path('stashes/<str:league>/database/pull/', views.pull_all_tabs_to_db),
    path('category/<str:category>/', views.getCategory),
    re_path('.*', views.index)
]