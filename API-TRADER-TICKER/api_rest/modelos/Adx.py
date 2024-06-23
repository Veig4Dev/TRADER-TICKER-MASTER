import json
import ta as ta
from datetime import datetime

class Adx():

    def __init__(self,pos=[],neg=[],dates=[]):
        self.pos = pos
        self.neg = neg
        self.dates = dates
    

    def Calcular(self,acao_selecionada):
                

        resultados_adx = ta.trend.ADXIndicator(acao_selecionada["High"],acao_selecionada["Low"],acao_selecionada["Close"],14,False)
        
        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.pos = round(resultados_adx.adx_pos().dropna(),2).tolist()
        self.neg = round(resultados_adx.adx_neg().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.pos)).tolist()
        

        return self.convertJson()
    

    def convertJson(self):
        
        newObj = {
            'pos':self.pos,
            'neg':self.neg,
            'dates':self.dates
        }
        

        return newObj