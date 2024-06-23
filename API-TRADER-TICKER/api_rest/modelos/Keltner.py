import json
import ta as ta
import pandas as pd

class Keltner():

    def __init__(self,keltner_hband_estrutura=[],keltner_lband_estrutura=[],keltner_mband_estrutura=[],dates=[]):
        self.keltner_hband_estrutura = keltner_hband_estrutura
        self.keltner_lband_estrutura = keltner_lband_estrutura
        self.keltner_mband_estrutura = keltner_mband_estrutura
        self.dates = dates      
    

    def Calcular(self,acao_selecionada):
        
        resultados_keltner = ta.volatility.KeltnerChannel(acao_selecionada["High"],
                                                        acao_selecionada["Low"], 
                                                        acao_selecionada["Close"],
                                                            20,10,False,True,2)
        
        keltner_hband = round(resultados_keltner.keltner_channel_hband().dropna(),2).tolist()
        keltner_lband = round(resultados_keltner.keltner_channel_lband().dropna(),2).tolist()
        keltner_mband = round(resultados_keltner.keltner_channel_mband().dropna(),2).tolist()
        

        acao_selecionada["Date"] = acao_selecionada.index
        acao_selecionada["Date"] = acao_selecionada["Date"].astype(str)

        

        keltner_hband_df = pd.DataFrame()
        keltner_hband_df["Date"] = acao_selecionada["Date"].tail(len(keltner_hband))
        keltner_hband_df["hband"] = keltner_hband
        keltner_hband_convertido = keltner_hband_df[['Date','hband']].to_dict('index')
        keltner_hband_estrutura = [{'x':dados['Date'], 'y': [dados['hband']]} for _, dados in keltner_hband_convertido.items()]
        self.keltner_hband_estrutura = keltner_hband


        self.dates = acao_selecionada["Date"].tail(len(keltner_hband)).tolist()


        keltner_lband_df = pd.DataFrame()
        keltner_lband_df["Date"] = acao_selecionada["Date"].tail(len(keltner_lband))
        keltner_lband_df["hband"] = keltner_lband
        keltner_lband_convertido = keltner_lband_df[['Date','hband']].to_dict('index')
        keltner_lband_estrutura = [{'x':dados['Date'], 'y': [dados['hband']]} for _, dados in keltner_lband_convertido.items()]
        self.keltner_lband_estrutura = keltner_lband


        keltner_mband_df = pd.DataFrame()
        keltner_mband_df["Date"] = acao_selecionada["Date"].tail(len(keltner_mband))
        keltner_mband_df["hband"] = keltner_mband
        keltner_mband_convertido = keltner_mband_df[['Date','hband']].to_dict('index')
        keltner_mband_estrutura = [{'x':dados['Date'], 'y': [dados['hband']]} for _, dados in keltner_mband_convertido.items()]
        self.keltner_mband_estrutura = keltner_mband


        return self.convertJson()
    
    
    def convertJson(self):
        
        newObj = {
            'keltner_hband_estrutura':self.keltner_hband_estrutura,
            'keltner_lband_estrutura':self.keltner_lband_estrutura,
            'keltner_mband_estrutura':self.keltner_mband_estrutura,
            'dates':self.dates
        }
        
        return newObj