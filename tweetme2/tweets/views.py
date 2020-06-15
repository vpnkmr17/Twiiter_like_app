from django.http import HttpResponse,Http404,JsonResponse
from django.shortcuts import render,redirect
from django.conf import settings
from .models import Tweet
from .forms import TweetForm

ALLOWED_HOSTS=settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request,*args,**kwargs):
    return render(request,'pages/feed.html')

def tweets_list_view(request,*args,**kwargs):
    return render(request,'tweets/list.html')

def tweets_detail_view(request,tweet_id,*args,**kwargs):
    return render(request,'tweets/detail.html',{"tweet_id":tweet_id})

# def tweets_profile_view(request,username,*args,**kwargs):
#     return render(request,'tweets/profile.html',{"username":username})

