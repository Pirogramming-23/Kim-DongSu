from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from datetime import timedelta
from stories.models import Story
from users.models import Follow

@login_required
def home(request):
    user = request.user
    # 1. 내가 팔로우한 유저 ID 목록
    followings = Follow.objects.filter(follower=user).values_list('following', flat=True)

    # 2. 24시간 이내의 스토리만 필터링
    since = timezone.now() - timedelta(hours=24)
    stories = Story.objects.filter(
        user__in=followings,
        created_at__gte=since
    ).prefetch_related('images', 'user')

    return render(request, 'posts/home.html', {
        'stories': stories,
    })