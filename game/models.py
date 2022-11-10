from django.db import models

# Create your models here.
# 플레이어 데이터정보: 점수,

class Score(models.Model):
    score = models.BigIntegerField()

    def __init__(self,score):
        return self.score + score

class Guest(models.Model):
    put_score = models.ForeignKey(Score, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
