// src/models/graphycs/Bollinger.js

class Bollinger {
  constructor(hband_struct, hband_indicator, lband_struct, lband_indicator, dates) {
    this.hband_struct = hband_struct;
    this.hband_indicator = hband_indicator;
    this.lband_struct = lband_struct;
    this.lband_indicator = lband_indicator;
    this.dates = dates;
  }
}