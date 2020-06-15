from django.db import models
from django.contrib.auth import settings
from django.db.models.signals import post_save

# Create your models here.

User=settings.AUTH_USER_MODEL

class FollowerRelation(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    profiles=models.ForeignKey("Profiles",on_delete=models.CASCADE)
    timestamp=models.DateTimeField(auto_now_add=True)


class Profiles(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    location=models.CharField(max_length=220,null=True,blank=True)
    bio=models.TextField(max_length=220,null=True,blank=True)
    timestamp=models.DateTimeField(auto_now_add=True)
    updated=models.DateTimeField(auto_now=True)
    followers=models.ManyToManyField(User,related_name='following',blank=True)
    '''
    project_obj=Profile.objecs.firsts()
    project_obj.followers.all() -> All users following this user
    user.following.all() -> All users I follow
    '''
def user_did_save(sender,instance,created,*args,**kwargs):
    Profiles.objects.get_or_create(user=instance)
    if created:
        Profiles.objects.get_or_create(user=instance)


post_save.connect(user_did_save,sender=User)