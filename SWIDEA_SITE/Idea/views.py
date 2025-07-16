from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.db.models import Count
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.template.loader import render_to_string
from django.urls import reverse_lazy
from django.views import generic
from django.views.decorators.http import require_POST
from .models import Idea, IdeaStar
from .forms import IdeaForm

class SignUpView(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'registration/signup.html'

def idea_list(request):
    order_by = request.GET.get('order_by')
    ideas = Idea.objects.all()

    if order_by == 'interest':
        ideas = ideas.order_by('-interest')
    elif order_by == 'title':
        ideas = ideas.order_by('title')
    elif order_by == 'star_count':
        ideas = ideas.annotate(star_count=Count('ideastar')).order_by('-star_count')

    starred_idea_ids = set()
    if request.user.is_authenticated:
        starred_idea_ids = set(
            IdeaStar.objects.filter(user=request.user).values_list('idea_id', flat=True)
        )
    # Paginator에 queryset과 페이지당 개수 전달
    paginator = Paginator(ideas, 4)

    # 현재 페이지 번호를 GET 파라미터에서 가져오기 (없으면 1)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'idea_list.html', {
        'page_obj': page_obj,
        'order_by': order_by,
        'starred_idea_ids' : starred_idea_ids,
    })

@require_POST
def toggle_star(request, idea_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=403)
    
    idea = Idea.objects.get(id=idea_id)

    starred = IdeaStar.objects.filter(idea=idea, user=request.user)

    if starred.exists():
        starred.delete()
        is_starred = False
    else:
        IdeaStar.objects.create(idea=idea, user=request.user)
        is_starred = True
    
    return JsonResponse({'is_starred' : is_starred})

def increase_interest(request, idea_id):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST 요청만 허용됩니다.'}, status=405)
    
    idea = Idea.objects.get(id=idea_id)
    idea.interest += 1
    idea.save()
    return JsonResponse({'interest': idea.interest})

def decrease_interest(request, idea_id):
    if request.method != 'POST':
        return JsonResponse({'error': 'POST 요청만 허용됩니다.'}, status=405)
    
    idea = Idea.objects.get(id=idea_id)
    if idea.interest > 0:
        idea.interest -= 1
    idea.save()
    return JsonResponse({'interest': idea.interest})

def idea_create(request):
    if request.method == "POST":
        form = IdeaForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('Idea:idea_list')
    else:
        form = IdeaForm()
    return render(request, 'idea_create.html', {'form' : form})

def idea_detail(request, pk):
    idea = Idea.objects.get(id=pk)
    is_starred = False
    if request.user.is_authenticated:
        is_starred = IdeaStar.objects.filter(idea=idea, user=request.user).exists()

    return render(request, 'idea_detail.html', {
        'idea': idea,
        'is_starred': is_starred,
    })

def idea_update(request, idea_id) :
    idea = Idea.objects.get(id=idea_id)

    if request.method == "POST":
        form = IdeaForm(request.POST, request.FILES, instance=idea)
        if form.is_valid():
            form.save()
            return redirect('Idea:idea_detail', pk=idea.pk)
    else:
        form = IdeaForm(instance=idea)
    
    return render(request, 'idea_update.html', {'form' : form})

@login_required
@require_POST
def idea_delete(request, pk):
    idea = Idea.objects.get(id=pk)
    idea.delete()
    return redirect('Idea:idea_list')

def idea_search(request):
    query = request.GET.get('q', '')
    ideas = Idea.objects.all()
    if query:
        ideas = ideas.filter(title__icontains=query)

    starred_ids = []
    if request.user.is_authenticated:
        starred_ids = list(
            IdeaStar.objects.filter(user=request.user).values_list('idea_id', flat=True)
        )

    html = render_to_string(
        'partials/idea_list_items.html',
        {
            'ideas': ideas,
            'user': request.user,
            'starred_idea_ids': starred_ids
        },
        request=request
    )
    return JsonResponse({'html': html})