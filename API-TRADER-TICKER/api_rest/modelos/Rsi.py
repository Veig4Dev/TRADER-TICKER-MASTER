import json
import ta as ta

class Rsi():

    def __init__(self,rsi=[],dates=[]):
        self.rsi = rsi
        self.dates = dates
    

    def Calcular(self,acao_selecionada):
        
        resultados_rsi = ta.momentum.RSIIndicator(acao_selecionada["Close"],14,False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.rsi = round(resultados_rsi.rsi().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.rsi)).tolist()

        return self.convertJson()
    

    def convertJson(self):
        
        newObj = {
            'rsi':self.rsi,            
            'dates':self.dates
        }
        

        return newObj