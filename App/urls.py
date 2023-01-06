from django.urls import path
from .views import *

urlpatterns = [
    path('',homePage),
    path('recognize',theif),
    path('attendence',attendence),
    path('emotion-detection',medical),
    path('api',api),
    path('script1',script1),
    path('media/js/*',media),
    path('register',formPage),
    path('submit',studForm),
]
