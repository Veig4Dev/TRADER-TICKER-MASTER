import json
import ta as ta

class Tsi():

    def __init__(self,tsi=[],dates=[]):
        self.tsi = tsi        
        self.dates = dates
    
    
    def Calcular(self,acao_selecionada):
        
        resultados_tsi = ta.momentum.TSIIndicator(acao_selecionada["Close"],25,13,False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.tsi = round(resultados_tsi.tsi().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.tsi)).tolist()

        return self.convertJson()   
    

    def convertJson(self):
        
        newObj = {
            'tsi':self.tsi,            
            'dates':self.dates
        }
        

        return newObj