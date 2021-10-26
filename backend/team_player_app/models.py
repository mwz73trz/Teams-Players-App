from django.db import models

class Team(models.Model):
    title = models.CharField(max_length=200)
    stadium = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    year_established = models.IntegerField(max_length=4, default=0000, null=True)

    def __str__(self):
        return f"{self.title}"

class Player(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    jersey_number = models.CharField(max_length=10)
    position = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="players")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
