
import random

from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import Profiles
from ..serializers import PublicProfileSerializer

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def user_profile_detail_view(request, username, *args, **kwargs):
#     current_user = request.user
#     to_follow_user = ??
#     return Response({}, status=200)

@api_view(['GET', 'POST'])
def profile_detail_api_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profiles.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = request.data or {}
    if request.method == "POST":
        me = request.user
        action = data.get("action")
        if profile_obj.user != me:
            if action == "follow":
                profile_obj.followers.add(me)
            elif action == "unfollow":
                profile_obj.followers.remove(me)
            else:
                pass
    serializer = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(serializer.data, status=200)










# from django.http import HttpResponse,Http404,JsonResponse
# from django.shortcuts import render,redirect
# from rest_framework.parsers import JSONParser
# from rest_framework.decorators import parser_classes
# from django.conf import settings
# from django.contrib.auth import get_user_model
# from rest_framework.authentication import SessionAuthentication
# from django.utils.http import is_safe_url

# from rest_framework.response import Response
# from rest_framework.decorators import api_view,permission_classes
# from rest_framework.permissions import IsAuthenticated
# from ..models import Profiles
# from ..serializers import PublicProfileSerializer

# User=get_user_model()
# ALLOWED_HOSTS=settings.ALLOWED_HOSTS

# @api_view(['GET'])
# def profile_detail_api_view(request,username,*args,**kwargs):
#     qs=Profiles.objects.filter(user__username=username)
#     if not Profiles.objects.filter(user__username=username).exists():
#         raise Http404
#     profile_obj=qs.first()
#     data=PublicProfileSerializer(instance=profile_obj,context={"request":request})
#     return Response(data.data,status=200)
   



# @api_view(['GET','POST'])
# def user_follow_view(request,username):
#     me=request.user
#     other_user=User.objects.filter(username=username)
#     if not User.objects.filter(username=username).exists():
#         return Response({},status=404)
#     other=other_user.first()
#     other=other.profiles
#     data={}
#     print(other)
#     try:
#         data=request.data
#     except:
#         pass
#     print(data)
#     action=data.get("action")
#     if action=="follow":
#         other.followers.add(me)

#     elif action=="unfollow":
#         other.followers.remove(me)
    
#     else:
#         pass
#     data=PublicProfileSerializer(instance=other,context={"request":request})
#     return Response(data.data,status=200)

