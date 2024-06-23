import json
import ta as ta
import pandas as pd

class Kama():

    def __init__(self,struct=[],dates=[]):
        self.struct = struct        
        self.dates = dates
    

    def Calcular(self,acao_selecionada):
        
        resultados_kama = ta.momentum.KAMAIndicator(acao_selecionada["High"],10,2,30,False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        kama = round(resultados_kama.kama().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(kama))                        
        self.struct = kama

        return self.convertJson()
    

    def convertJson(self):
        
        newObj = {
            'kama':self.struct,            
            'dates':self.dates.tolist()
        }
        

        return newObj