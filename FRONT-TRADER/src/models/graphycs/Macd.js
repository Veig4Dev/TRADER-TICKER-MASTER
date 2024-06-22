// src/models/graphycs/Macd.js

export class Macd {
  constructor(diff, signal, macd, dates) {
    this.diff = diff;
    this.signal = signal;
    this.macd = macd;
    this.dates = dates;
  }
}
