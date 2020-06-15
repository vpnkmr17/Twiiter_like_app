
from django.http import HttpResponse,Http404,JsonResponse
from django.shortcuts import render,redirect
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import parser_classes
from django.conf import settings
from rest_framework.authentication import SessionAuthentication
from django.utils.http import is_safe_url
from ..serializers import (
tweetSerializer,
TweetActionSerializer,
tweetCreateSerializer,
)
from rest_framework.response import Response
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Tweet
from ..forms import TweetForm

ALLOWED_HOSTS=settings.ALLOWED_HOSTS


def get_paginated_queryset_response(qs,request):
    paginator=PageNumberPagination()
    paginator.page_size=20
    paginated_qs=paginator.paginate_queryset(qs,request)
    serializer=tweetSerializer(paginated_qs,many=True,context={"request":request})
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def tweet_list_view(request):
    qs=Tweet.objects.all()
    username=request.GET.get("username")
    if username!=None:
        qs=qs.filter(user__username__iexact=username)
    return get_paginated_queryset_response(qs,request)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def api_feed_view(request):
    user=request.user
    qs=Tweet.objects.feed(user)
    return get_paginated_queryset_response(qs,request)


@api_view(['GET'])
def tweet_detail_view(request,tweet_id):
    obj=Tweet.objects.get(id=tweet_id)  
    serializer=tweetSerializer(obj)
    return Response(serializer.data,status=200)

@api_view(['DELETE','POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request,tweet_id):
    qs=Tweet.objects.get(id=tweet_id) 
    try:
        print(qs.id)
        if Tweet.objects.filter(id=qs.id).exists() and Tweet.objects.filter(user=request.user).exists():
            print("first is ",Tweet.objects.filter(id=qs.id).first())
            qs.delete()  
            return Response({"message:Tweet Deleted Successfully!"},status=200)
    except:
        return Response({"message: You ar unable to delete this tweet"},status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request,*args,**kwargs):
    # '''
    # id is required
    # action=['like','unlike','retweet']
    # Let's use serializer to handle this
    # '''
    serializer=TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data=serializer.validated_data
        tweet_id=data.get("id")
        action=data.get("action")
        content=data.get("content")
        #print("starttttttttttttttttt",Tweet.objects.filter(id=tweet_id))
        qs=Tweet.objects.filter(id=tweet_id)
        if not Tweet.objects.filter(id=tweet_id).exists():
            # print("True")
            return Response({},status=404)
        obj=qs.first()
        if action=='like':
            obj.likes.add(request.user)
            serializer=tweetSerializer(obj)
            print("Final seriralizer data is ",serializer.data)
            return Response(serializer.data,status=200)
        elif action=='unlike':
            obj.likes.remove(request.user)
            serializer=tweetSerializer(obj)
            return Response(serializer.data,status=200)
        elif action=='retweet':
            new_tweet=Tweet.objects.create(user=request.user,
                            parent=obj,
                            content=content)
            serializer=tweetSerializer(new_tweet)
            return Response(serializer.data,status=201)
    return Response({},status=200)


    


@api_view(['POST']) # http method the client == POST
@permission_classes([IsAuthenticated]) # REST API course
def tweet_create_view(request, *args, **kwargs):
    serializer = tweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)
    



def tweet_create_view_pure_django(request):
    '''
    REST API CREATE VIEW ->
    '''
    user=request.user
    print("user is ",user)
    if not request.user.is_authenticated:
        user=None
        if request.is_ajax():
            return JsonResponse({},status=401)
        return settings.LOGIN_URL

    form=TweetForm(request.POST or None)
    next_url=request.POST.get("next") or None
    if form.is_valid():
        obj=form.save(commit=False)
        #do other logic with form relaed
        obj.user=user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(),status=201) #201 for created items
        if next_url!=None and is_safe_url(next_url,ALLOWED_HOSTS):
            return redirect(next_url)
        form=TweetForm()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors,status=400)
    return render(request,'components/form.html',{'form':form})

def tweet_list_view_pure_django(request,*args,**kwargs):
    obj=Tweet.objects.all()
    tweet_list=[x.serialize() for x in obj]
    data={
        'isUser':False,
        'response':tweet_list,
        
    }
    return JsonResponse(data)

def tweet_detail_view_pure_django(request,tweet_id,*args,**kwargs):
    data={
        'id':tweet_id,
    }
    status=200
    try:
        obj=Tweet.objects.get(id=tweet_id)   
        data['content']=obj.content   
    except:
        data['message']='Not Found'
        status=404
    
    return JsonResponse(data,status=404) #similiar to json.dumps() in python

