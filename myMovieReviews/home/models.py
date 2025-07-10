from django.db import models

class Review(models.Model):
    GENRE_CHOICES = [
        ('Action', 'Action'),
        ('SF', 'SF'),
        ('Drama', 'Drama'),
        ('Comedy', 'Comedy'),
        ('Romance', 'Romance'),
        ('Thriller', 'Thriller'),
    ]

    title = models.CharField(max_length=255)
    launch_year = models.IntegerField()
    genre = models.CharField(max_length=100, choices=GENRE_CHOICES)
    score = models.FloatField()
    director = models.CharField(default="감독 미상", max_length=100)
    cast = models.CharField(default="배우 미상", max_length=255)
    running_time = models.IntegerField(default=0)
    content = models.TextField(default="")

    def __str__(self):
        return self.title
    
    @property
    def running_time_display(self):
        hours = self.running_time // 60
        minutes = self.running_time % 60
        if hours > 0:
            return f"{hours}시간 {minutes}분"
        else:
            return f"{minutes}분"
