from django.conf.urls import url
from . import views
from django.views.generic import TemplateView


urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^api/captcha$', views.get_captcha),
    url(r'^api/reset-password-email$', views.reset_password_email),
    url(r'^api/reset-password$', views.reset_password),
    url(r'^api/register$', views.register),
    url(r'^api/login$', views.login),
    url(r'^api/check-email', views.check_email)
]