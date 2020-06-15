from django.test import TestCase

# Create your tests here.
from .models import Profiles
from django.contrib.auth import get_user_model

User=get_user_model()

class ProfileTestCase(TestCase):
    def setUp(self):
        self.user=User.objects.create(username="hack",password="1234")
        self.userb=User.objects.create(username="bunty",password="1234")

    def test_profile_created(self):
        qs=Profiles.objects.all()
        self.assertEqual(qs.count(),2)

    def test_following(self):
        first=self.user
        second=self.userb
        # first_profile=first.profiles
        first.profiles.followers.add(second) #added a follower
        second_user_following_whom=second.following.all()
        qs=second.following.filter(user=first) #from a user,check other user is being followed
        self.assertTrue(qs.exists())
        first_user_following_no_one=first.following.all() #check new user has is not following anyone
        self.assertFalse(first_user_following_no_one.exists())