import json
import ta as ta

class Macd():

    def __init__(self,diff=[],signal=[],macd=[],dates=[]):
        self.diff = diff
        self.signal = signal
        self.macd = macd
        self.dates = dates
    

    def Calcular(self,acao_selecionada):
        
        resultados_macd = ta.trend.MACD(acao_selecionada["Close"],26,12, 9, False)

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.diff = round(resultados_macd.macd_diff().dropna(),4).tolist()
        self.signal = round(resultados_macd.macd_signal().dropna(),4).tolist()
        self.macd = round(resultados_macd.macd().dropna(),4).tail(len(self.signal)).tolist()
        self.dates = acao_selecionada["Date"].tail(len(self.macd)).tolist()

        return self.convertJson()


    def convertJson(self):
        
        newObj = {
            'diff':self.diff,
            'signal':self.signal,
            'macd':self.macd,
            'dates':self.dates
        }

        return newObj