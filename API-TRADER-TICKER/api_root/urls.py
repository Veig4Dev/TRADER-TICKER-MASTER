from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('api/',include('api_rest.urls'),name="api_rest_urls")
]
