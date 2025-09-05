from django.db import models
from django.conf import settings
from django.utils import timezone

# Create your models here.
class ChildScreening(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    questions = models.JSONField(null=True, blank=True)
    answers = models.JSONField(null=True, blank=True)
    result = models.CharField(null=True, blank=True,max_length=15)
    screening = models.CharField(null=True, blank=True,max_length=45)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"triagem de {self.user.username} - {self.screening} em {self.date}"

