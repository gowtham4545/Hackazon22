from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import *
import mimetypes

# Create your views here.
def homePage(req):
    return render(req,'landing.html')

def attendence(req):
    return render(req,'index.html')

def medical(req):
    return render(req,'medical.html')

def theif(req):
    return render(req,'face-recognition.html')

def studForm(req):
    name=req.POST.get('name')
    img=req.FILES.get('img')
    var=Student()
    var.name=name
    var.img=img
    var.save()
    return redirect('')

def formPage(req):
    return render(req,'register.html')

def api(req):
    print(req.__dir__())
    return render(req,'face-api.min.js',content_type='text/javascript')

def script1(req):
    return render(req,'script.js',content_type='text/javascript')


def media(req):
    req.content_type='text/javascript'
    return redirect(req.path)