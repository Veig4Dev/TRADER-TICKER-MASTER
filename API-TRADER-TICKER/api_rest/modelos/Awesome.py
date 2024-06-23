import json
import ta as ta

class Awesome():

    def __init__(self,awesome=[],dates=[]):
        self.awesome = awesome                
        self.dates = dates
    

    def Calcular(self,acao_selecionada):
        
        resultados_awesome = ta.momentum.AwesomeOscillatorIndicator(acao_selecionada["High"],acao_selecionada["Low"], 5,34,False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.awesome = round(resultados_awesome.awesome_oscillator().dropna(),2).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.awesome)).tolist()

        return self.convertJson()
    
    
    def convertJson(self):
        
        newObj = {
            'awesome':self.awesome,            
            'dates':self.dates
        }
        

        return newObj