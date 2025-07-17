from django.db import models
from django.conf import settings
from Devtool.models import Devtool

# Create your models here.
class Idea(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="images/%Y%m%d",
                                blank=True,
                                null=True)
    content = models.TextField()
    interest = models.IntegerField(default=0)
    devtool = models.ForeignKey('Devtool.Devtool', 
                                on_delete=models.SET_NULL, 
                                null=True, 
                                blank=True)

    def __str__(self):
        return self.title

class IdeaStar(models.Model):
    idea = models.ForeignKey(Idea, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('idea', 'user')