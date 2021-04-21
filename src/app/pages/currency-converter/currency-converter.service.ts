import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {

  public basePath: String = 'https://experimentfy.herokuapp.com/currency-converter'

  constructor(private http: HttpClient) { }

  currencyConverter(data) {
    return this.http.get(`${this.basePath}?amount=${data.amount}&from=${data.currencyFromSelected}&to=${data.currencyToSelected}`);
  }
}
