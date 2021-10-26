from django.db.models import query
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from team_player_app.serializers import TeamSerializer, PlayerSerializer
from team_player_app.models import Team, Player

class TeamViewSet(ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerViewSet(ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
