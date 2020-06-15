from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from .views import (
    profile_detail_api_view,
)

urlpatterns = [
   path('<str:username>/',profile_detail_api_view),
   path('<str:username>/follow',profile_detail_api_view),
]

