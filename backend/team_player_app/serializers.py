from rest_framework.serializers import ModelSerializer
from team_player_app.models import Team, Player

class TeamSerializer(ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'title', 'stadium', 'city', 'state', 'year_established', 'players']
        depth = 1

class PlayerSerializer(ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'