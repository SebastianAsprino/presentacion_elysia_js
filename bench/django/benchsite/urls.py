from django.http import HttpResponse
from django.urls import path


def hello(request):
    return HttpResponse('hello world', content_type='text/plain')


urlpatterns = [
    path('', hello),
    path('django', hello),
]
