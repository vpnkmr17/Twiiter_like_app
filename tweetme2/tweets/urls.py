from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from tweets.views import (
    tweets_list_view,
    tweets_detail_view,
)

urlpatterns = [
    path('',tweets_list_view),
    path('<int:tweet_id>',tweets_detail_view),
    # path('detail/<str:username>',tweets_profile_view),
    # path('', tweet_list_view),
    # path('action', tweet_action_view),
    # path('create-tweet', tweet_create_view),
    # path('<int:tweet_id>', tweet_detail_view),
    # path('<int:tweet_id>/delete', tweet_delete_view),
]


urlpatterns+= static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)