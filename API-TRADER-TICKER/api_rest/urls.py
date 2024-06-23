from django.urls import path
from . import views

urlpatterns = [
    path('macd/',views.get_macd, name='get_macd'),
    path('adx/',views.get_adx, name ='get_adx'),
    path('bollinger/',views.get_bollinger, name ='get_bollinger'),
    path('keltner/',views.get_keltner, name ='get_keltner'),
    path('aroon/',views.get_aroon, name ='get_aroon'),
    path('stc/',views.get_stc, name = 'get_stc'),
    path('awesome/',views.get_awesome, name = 'get_awesome'),
    path('kama/',views.get_kama, name = 'get_kama'),
    path('tsi/',views.get_tsi, name = 'get_tsi'),
    path('rsi/',views.get_rsi, name = 'get_rsi')
]
