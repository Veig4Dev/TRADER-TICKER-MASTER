import { Macd } from '../models/graphycs/Macd';
import { Adx } from '../models/graphycs/Adx';
import { Aroon } from '../models/graphycs/Aroon';
import { Awesome } from '../models/graphycs/Awesome';
import { Kama } from '../models/graphycs/Kama';



export const transformData = (apiData) => {
  console.log('Dados da API antes da transformação:', apiData);

  const transformedData = {
    macd: apiData.map(item => new Macd(item.diff, item.signal, item.macd, item.dates)),
    adx: apiData.map(item => new Adx(item.pos, item.negs, item.dates)),
    aroon: apiData.map(item => new Aroon(item.aroon_up, item.aroon_down, item.dates)),
    awesome: apiData.map(item => new Awesome(item.awesome, item.dates)),
    kama: apiData.map(item => new Kama(item.kama, item.dates)),

  };

  console.log('Dados transformados:', transformedData);
  return transformedData;
};
