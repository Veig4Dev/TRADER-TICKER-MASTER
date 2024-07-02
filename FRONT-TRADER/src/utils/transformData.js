import { Macd } from '../models/graphycs/Macd';
import { Adx } from '../models/graphycs/Adx';
import { Aroon } from '../models/graphycs/Aroon';
import { Awesome } from '../models/graphycs/Awesome';
import { Kama } from '../models/graphycs/Kama';
import { Bollinger } from '../models/graphycs/Bollinger';
import { Tsi } from '../models/graphycs/Tsi';
import { Rsi } from '../models/graphycs/Rsi';
import { Stc } from '../models/graphycs/Stc';

export const transformData = (apiData) => {
  console.log('Dados da API antes da transformação:', apiData);

  const transformedData = {
    macd: apiData.map(item => new Macd(item.diff, item.signal, item.macd, item.dates)),
    adx: apiData.map(item => new Adx(item.pos, item.negs, item.dates)),
    aroon: apiData.map(item => new Aroon(item.aroon_up, item.aroon_down, item.dates)),
    awesome: apiData.map(item => new Awesome(item.awesome, item.dates)),
    kama: apiData.map(item => new Kama(item.kama, item.dates)),
    bollinger: apiData.map(item => new Bollinger(item.hband_struct, item.hband_indicator, item.lband_struct, item.lband_indicator, item.dates)),
    tsi: apiData.map(item => new Tsi(item.tsi, item.dates)),
    rsi: apiData.map(item => new Rsi(item.rsi, item.dates)),
    stc: apiData.map(item => new Stc(item.stc, item.dates)),
  };

  console.log('Dados transformados:', transformedData);
  return transformedData;
};
