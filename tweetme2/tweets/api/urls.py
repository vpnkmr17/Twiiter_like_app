from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import (
    api_feed_view,
    tweet_list_view,
    tweet_delete_view,
    tweet_detail_view,
    tweet_create_view,
    tweet_action_view
)

urlpatterns = [
    path('', tweet_list_view),
    path('feed/',api_feed_view),
    path('action/', tweet_action_view),
    path('create-tweet', tweet_create_view),
    path('<int:tweet_id>', tweet_detail_view),
    path('<int:tweet_id>/delete', tweet_delete_view),
]

urlpatterns+= static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)