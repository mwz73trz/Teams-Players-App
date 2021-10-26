from django.db import router
from django.urls import path, include
from rest_framework import urlpatterns
from rest_framework.routers import DefaultRouter
from team_player_app.views import TeamViewSet, PlayerViewSet

router = DefaultRouter()
router.register("teams", TeamViewSet, basename="team")
router.register("players", PlayerViewSet, basename="player")

urlpatterns = [
    path('', include(router.urls)),
]