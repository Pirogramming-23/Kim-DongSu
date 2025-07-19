from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from datetime import timedelta
from .models import Story, StoryImage
from users.models import User

@login_required
def create_story(request):
    if request.method == 'POST':
        images = request.FILES.getlist('images')
        if images:
            now = timezone.now()
            since = now - timedelta(hours=24)

            # 1. 최근 24시간 내에 만든 스토리 가져오기
            story = Story.objects.filter(user=request.user, created_at__gte=since).first()

            # 2. 없으면 새로 생성
            if not story:
                story = Story.objects.create(user=request.user)

            # 3. 이미지 추가
            for img in images:
                StoryImage.objects.create(story=story, image=img)

            return redirect('home')

    return render(request, 'stories/create.html')



def story_detail(request, username):
    user = get_object_or_404(User, username=username)
    since = timezone.now() - timedelta(hours=24)

    # 해당 유저의 24시간 이내 스토리
    story = Story.objects.filter(user=user, created_at__gte=since).prefetch_related('images').first()

    return render(request, 'stories/detail.html', {
        'story_user': user,
        'story': story,
    })




def story_json(request, username):
    since = timezone.now() - timedelta(hours=24)
    user = get_object_or_404(User, username=username)

    story = Story.objects.filter(user=user, created_at__gte=since).prefetch_related('images').first()

    if not story:
        return JsonResponse({'images': []})

    image_urls = [img.image.url for img in story.images.all()]
    return JsonResponse({'images': image_urls})
