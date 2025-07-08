from django.shortcuts import render

# Create your views here.

#커밋 메세지 수정
def post_list(request):
    return render(request, 'blog/post_list.html', {})