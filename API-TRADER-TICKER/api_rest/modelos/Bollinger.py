import json
import ta as ta
import pandas as pd


class Bollinger():

    def __init__(self,hband_struct=[],hband_indicator=[],lband_struct=[],lband_indicator=[],dates=[]):
        
        self.hband_struct = hband_struct
        self.hband_indicator = hband_indicator
        self.lband_struct = lband_struct
        self.lband_indicator = lband_indicator
        self.datas_bollinger = dates
    

    def Calcular(self,acao_selecionada):
        
        resultados_bollinger = ta.volatility.BollingerBands(acao_selecionada["Close"],20,2,False)

        bollinger_hband = round(resultados_bollinger.bollinger_hband().dropna(),2).tolist()
        bollinger_hband_indicator = round(resultados_bollinger.bollinger_hband_indicator().dropna(),2).tolist()
        bollinger_lband = round(resultados_bollinger.bollinger_lband().dropna(),2).tolist()
        bollinger_lband_indicator = round(resultados_bollinger.bollinger_lband_indicator().dropna(),2).tolist()

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        self.datas_bollinger = acao_selecionada["Date"].tail(len(bollinger_hband)).tolist()
        
            
        bollinger_hband_df = pd.DataFrame()
        bollinger_hband_df["Date"] = acao_selecionada["Date"].tail(len(bollinger_hband))
        bollinger_hband_df["hband"] = bollinger_hband
        hband_convertido = bollinger_hband_df[['Date','hband']].to_dict('index')
        self.hband_struct = bollinger_hband


        bollinger_hband_indicator_df = pd.DataFrame()
        bollinger_hband_indicator_df["Date"] = acao_selecionada["Date"].tail(len(bollinger_hband_indicator))
        bollinger_hband_indicator_df["hband_indicator"] = bollinger_hband_indicator
        hband_indicator_convertido = bollinger_hband_indicator_df[['Date','hband_indicator']].to_dict('index')
        self.hband_indicator = bollinger_hband_indicator

        bollinger_lband_df = pd.DataFrame()
        bollinger_lband_df["Date"] = acao_selecionada["Date"].tail(len(bollinger_lband))
        bollinger_lband_df["lband"] = bollinger_lband
        lband_convertido = bollinger_lband_df[['Date','lband']].to_dict('index')
        self.lband_struct = bollinger_lband

        bollinger_lband_indicator_df = pd.DataFrame()
        bollinger_lband_indicator_df["Date"] = acao_selecionada["Date"].tail(len(bollinger_lband_indicator))
        bollinger_lband_indicator_df["lband_indicator"] = bollinger_lband_indicator
        lband_indicator_convertido = bollinger_lband_indicator_df[['Date','lband_indicator']].to_dict('index')
        self.lband_indicator = bollinger_lband_indicator


        return self.convertJson()      
    
    
    def convertJson(self):
        
        newObj = {
            'hband_struct':self.hband_struct,
            'hband_indicator':self.hband_indicator,
            'lband_struct':self.lband_struct,
            'lband_indicator':self.lband_indicator,
            'dates':self.datas_bollinger
        }        

        return newObj