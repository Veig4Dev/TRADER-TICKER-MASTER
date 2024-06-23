import json
import ta as ta

class Stc():

    def __init__(self,stc=[],dates=[]):
        self.stc = stc        
        self.dates = dates
    

    def Calcular(self,acao_selecionada):
        
        resultados_stc = ta.trend.STCIndicator(acao_selecionada["High"],50,23,10,3,3,False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.stc = round(resultados_stc.stc().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.stc)).tolist()

        return self.convertJson()
    
    def convertJson(self):
        
        newObj = {
            'stc':self.stc,            
            'dates':self.dates
        }
        

        return newObj