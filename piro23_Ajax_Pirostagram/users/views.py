from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .forms import CustomUserCreationForm
from .models import User, Follow
from django.http import JsonResponse


def index(request):
    if request.user.is_authenticated:
        return redirect('home')  # 로그인된 사용자는 홈 화면으로
    else:
        return redirect('login')  # 로그인 안된 사용자는 로그인 화면으로



def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('login')  # 로그인 페이지로 이동 (URL 이름은 추후 설정)
    else:
        form = CustomUserCreationForm()
    return render(request, 'users/signup.html', {'form': form})



def profile(request, username):
    profile_user = get_object_or_404(User, username=username)
    is_me = request.user == profile_user
    is_following = False
    is_follower = False

    if request.user.is_authenticated and not is_me:
        is_following = request.user.following_set.filter(following=profile_user).exists()
        is_follower = request.user.follower_set.filter(follower=profile_user).exists()

    context = {
        'profile_user': profile_user,
        'is_me': is_me,
        'is_following': is_following,
        'is_follower': is_follower,
    }
    return render(request, 'users/profile.html', context)



@login_required
def toggle_follow_ajax(request, username):
    if request.method == 'POST':
        target_user = get_object_or_404(User, username=username)

        if request.user == target_user:
            return JsonResponse({'error': '자기 자신은 팔로우할 수 없습니다.'}, status=400)

        follow_qs = Follow.objects.filter(follower=request.user, following=target_user)
        if follow_qs.exists():
            follow_qs.delete()
            is_following = False
        else:
            Follow.objects.create(follower=request.user, following=target_user)
            is_following = True

        # 상대가 나를 팔로우 중인지 확인
        is_follower = Follow.objects.filter(follower=target_user, following=request.user).exists()

        return JsonResponse({
            'is_following': is_following,
            'is_follower': is_follower,
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)