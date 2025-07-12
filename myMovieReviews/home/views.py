from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Review

def home(request):
    sort_key = request.GET.get('sort', 'title')

    allowed_sort_keys = ['title', '-title', 'score', '-score', 'running_time', '-running_time']
    if sort_key not in allowed_sort_keys:
        sort_key = 'title'

    reviews = Review.objects.all().order_by(sort_key)
    context = {
        "reviews": reviews,
        "current_sort": sort_key,
    }
    return render(request, "home.html", context)


def review_read(request, pk):
    review = Review.objects.get(id=pk)
    context = {"review":review}
    return render(request, "review_read.html", context)

def review_create(request):
    if request.method == "POST":
        Review.objects.create(
            title = request.POST["title"],
            launch_year = request.POST["year"],
            genre = request.POST["genre"],
            score = request.POST["score"],
            running_time = request.POST["running_time"],
            content = request.POST["review"],
            director = request.POST["director"],
            cast = request.POST["actor"]
        )
        return redirect("/")
    return render(request, "review_create.html")

def review_update(request, pk):
    review = Review.objects.get(id=pk)
    if request.method == "POST":
        review.title = request.POST["title"]
        review.launch_year = request.POST["year"]
        review.genre = request.POST["genre"]
        review.score = request.POST["score"]
        review.running_time = request.POST["running_time"]
        review.content = request.POST["review"]
        review.director = request.POST["director"]
        review.cast = request.POST["actor"]
        review.save()
        return redirect(f"/{pk}")
    context = {"review":review}
    return render(request, "review_update.html", context)

def review_delete(request, pk):
    if request.method == "POST":
        review = Review.objects.get(id=pk)
        review.delete()
    return redirect("/")
