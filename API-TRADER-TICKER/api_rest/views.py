from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
from .modelos.Adx import Adx
from .modelos.Aroon import Aroon
from .modelos.Awesome import Awesome
from .modelos.Bollinger import Bollinger
from .modelos.Kama import Kama
from .modelos.Keltner import Keltner
from .modelos.Macd import Macd
from .modelos.Rsi import Rsi
from .modelos.Stc import Stc
from .modelos.Tsi import Tsi



@api_view(['GET'])
def get_macd(request):

    if request.method == 'GET':
        
        data = get_stock_data(request)
        
        if len(data) > 0:
            
            macd = Macd()
            return Response(macd.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_adx(request):

    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            adx = Adx()
            return Response(adx.Calcular(data))
        
        else:
            return Response(status = status.HTTP_404_NOT_FOUND)

    
    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_bollinger(request):

    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            bollinger = Bollinger()
            return Response(bollinger.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_keltner(request):

    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            keltner = Keltner()
            return Response(keltner.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_aroon(request):

    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            aroon = Aroon()
            return Response(aroon.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_stc(request):

    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            stc = Stc()
            return Response(stc.Calcular(data))  
    
    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_awesome(request):
    
    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            awesome = Awesome()
            return Response(awesome.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_kama(request):
    
    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            kama = Kama()
            return Response(kama.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_tsi(request):
    
    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            tsi = Tsi()
            return Response(tsi.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_rsi(request):
    
    if request.method == 'GET':

        data = get_stock_data(request)
    
        if len(data) > 0:
            
            rsi = Rsi()
            return Response(rsi.Calcular(data))

    return Response(status = status.HTTP_400_BAD_REQUEST)


def get_stock_data(request):
    
    base = []
    if request.GET['ticker'] and request.GET['datainicio'] != "" and request.GET['datafim']:

        ticker = request.GET['ticker']
        datainicio = request.GET['datainicio']
        datafim = request.GET['datafim']

        base = yf.download(tickers=ticker,start=datainicio,end=datafim)

        if base["Open"].tail(1)[0] == 0:
            base = base[:len(base)-1]
        
        base.dropna(inplace=True)
        
    return base