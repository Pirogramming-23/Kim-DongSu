from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from .forms import DevtoolForm
from .models import Devtool
from Idea.models import Idea

def devtool_list(request):
    devtools = Devtool.objects.all()
    paginator = Paginator(devtools, 5)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    return render(request, 'devtool_list.html', {'page_obj': page_obj})

def devtool_detail(request, devtool_id):
    devtool = Devtool.objects.get(id=devtool_id)

    related_ideas = devtool.idea_set.all()

    return render(request, "devtool_detail.html", {
        'devtool' : devtool,
        'related_ideas' : related_ideas,
    })

def devtool_create(request):
    if request.method == "POST":
        form = DevtoolForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('Devtool:devtool_list')
    else:
        form = DevtoolForm()
    
    return render(request, 'devtool_create.html', {'form' : form})

def devtool_update(request, devtool_id) :
    devtool = Devtool.objects.get(id=devtool_id)

    if request.method == "POST":
        form = DevtoolForm(request.POST, request.FILES, instance=devtool)
        if form.is_valid():
            form.save()
            return redirect('Devtool:devtool_detail', devtool_id=devtool.id)
    else:
        form = DevtoolForm(instance=devtool)
    
    return render(request, 'devtool_update.html', {'form' : form})

@login_required
@require_POST
def devtool_delete(request, devtool_id):
    devtool = Devtool.objects.get(id=devtool_id)
    devtool.delete()
    return redirect('Devtool:devtool_list')