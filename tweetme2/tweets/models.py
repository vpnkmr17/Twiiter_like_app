from django.db import models
from django.conf import settings
from django.db.models import Q
import random

User=settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    tweet=models.ForeignKey("Tweet",on_delete=models.CASCADE)
    timestamp=models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    def feed(self,user):
        profiles_exist=user.following.exists()
        followed_user_id=[]
        if profiles_exist:
            followed_user_id=user.following.values_list("user__id",flat=True) #[x.user.id for x in profile]
        return self.filter(
            Q(user__id__in=followed_user_id) |
            Q(user=user)
        ).distinct().order_by("-timestamp") # Models.objects===self

class TweetManager(models.Manager):
    def get_queryset(self,*args,**kwargs):
        return TweetQuerySet(self.model,using=self._db)
    
    def feed(self,user):
        return self.get_queryset().feed(user)


class Tweet(models.Model):
    #id =models.AutoField(primary_key=True)
    parent=models.ForeignKey("self",null=True,on_delete=models.SET_NULL)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    likes=models.ManyToManyField(User,blank=True,related_name='tweet_user',through=TweetLike)
    content=models.TextField(blank=True,null=True)
    image=models.FileField(upload_to='images/',blank=True,null=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    objects=TweetManager()

    class Meta:
        ordering=['-id']

    @property
    def is_retweet(self):
        return self.parent!=None

    def serialize(self):
        return{
            "id":self.id,
            "content":self.content,
            "likes":random.randint(0,299)
        }