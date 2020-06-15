from django.test import TestCase
from .models import Tweet
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User=get_user_model()

# Create your tests here.
class TweetTest(TestCase):
    def setUp(self):
        self.user=User.objects.create(username="vips",password="1234")
        Tweet.objects.create(user=self.user,content="this is a test case")
        Tweet.objects.create(user=self.user,content="this is second test case")
        Tweet.objects.create(user=self.user,content="this is third test case")

    def test_User(self):
        user=User.objects.get(username="vips")
        self.assertEqual(user.username,"vips")

    def test_create_tweet(self):
        tweet_obj=Tweet.objects.create(user=self.user,content="this is fourth test case")
        self.assertEqual(tweet_obj.id,4)

    def test_api_login(self):
        client=APIClient()
        client.login(username=self.user.username,password="1234")
        return client
    
    def test_tweet_list(self):
        client=self.test_api_login()
        response=client.get("/api/tweet/")
        #print(response.json())

    def test_tweet_action_api_view(self):
        client=self.test_api_login()
        response=client.post("/api/tweet/action/",{"id":1,"action":"like"})
        print(response.status_code)
        print(response.json())