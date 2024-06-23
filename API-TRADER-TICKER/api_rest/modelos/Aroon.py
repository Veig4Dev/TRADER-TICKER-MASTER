import json
import ta as ta

class Aroon():

    def __init__(self,aroon_up=[],aroon_down=[],dates=[]):
        self.aroon_up = aroon_up
        self.aroon_down = aroon_down
        self.dates = dates        
    

    def Calcular(self,acao_selecionada):
        
        resultados_aroon = ta.trend.AroonIndicator(acao_selecionada["Close"],25,False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)
        
        self.aroon_up = round(resultados_aroon.aroon_up().dropna(),2).tolist()
        self.aroon_down = round(resultados_aroon.aroon_down().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.aroon_up)).tolist()

        return self.convertJson()
    

    def convertJson(self):
        
        newObj = {
            'aroon_up':self.aroon_up,
            'aroon_down':self.aroon_down,
            'dates':self.dates
        }
        

        return newObj