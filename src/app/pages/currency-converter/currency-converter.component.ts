import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { CurrencyConverterService } from "./currency-converter.service";

@Component({
  selector: "currency-converter",
  moduleId: module.id,
  templateUrl: "currency-converter.component.html",
})
export class CurrencyConverterComponent implements OnInit {
  currencyConverterForm: FormGroup;
  private subscriptionCurrencyConverter: Subscription;
  public showSpinner: boolean = false;
  public responseConverter = {
      amount: null,
      apiName: ''
  };
  public messageError: String = "";
  public currencyList = [
    { name: "AUD", value: "AUD" },
    { name: "BGN", value: "BGN" },
    { name: "BRL", value: "BRL" },
    { name: "CAD", value: "CAD" },
    { name: "CHF", value: "CHF" },
    { name: "CNY", value: "CNY" },
    { name: "CZK", value: "CZK" },
    { name: "DKK", value: "DKK" },
    { name: "EUR", value: "EUR" },
    { name: "GBP", value: "GBP" },
    { name: "HKD", value: "HKD" },
    { name: "HRK", value: "HRK" },
    { name: "HUF", value: "HUF" },
    { name: "IDR", value: "IDR" },
    { name: "ILS", value: "ILS" },
    { name: "INR", value: "INR" },
    { name: "ISK", value: "ISK" },
    { name: "JPY", value: "JPY" },
    { name: "KRW", value: "KRW" },
    { name: "MXN", value: "MXN" },
    { name: "MYR", value: "MYR" },
    { name: "NOK", value: "NOK" },
    { name: "NZD", value: "NZD" },
    { name: "PHP", value: "PHP" },
    { name: "PLN", value: "PLN" },
    { name: "RON", value: "RON" },
    { name: "RUB", value: "RUB" },
    { name: "SEK", value: "SEK" },
    { name: "SGD", value: "SGD" },
    { name: "THB", value: "THB" },
    { name: "TRY", value: "TRY" },
    { name: "USD", value: "USD" },
    { name: "ZAR", value: "ZAR" },
  ];

  constructor(
    private fb: FormBuilder,
    private currencyConverterService: CurrencyConverterService
  ) {
    this.createForm();
  }
  ngOnInit() {}

  createForm() {
    this.currencyConverterForm = this.fb.group({
      currencyFromSelected: ["", Validators.required],
      currencyToSelected: ["", Validators.required],
      amount: ["", Validators.required],
    });
  }

  valueConverter(currencyConverterForm) {
    this.showSpinner = true;
    this.messageError = "";
    this.responseConverter = {
        amount: '',
        apiName: ''
    };  

    if(currencyConverterForm.value.currencyFromSelected === currencyConverterForm.value.currencyToSelected ) {
        this.messageError = "From and To cannot be the same";
        this.showSpinner = false;
        return;
    }

    this.subscriptionCurrencyConverter = this.currencyConverterService
      .currencyConverter(currencyConverterForm.value)
      .subscribe(
        (success) => {
            if(success[`value`] === null) {
                this.messageError = "It was not possible to perform the conversion with the selected parameters.";
                return;
            }
            let v = success['value'];
            this.responseConverter.amount = Number(v).toFixed(2);
            this.responseConverter.apiName = success['apiName'];
        },
        (error) => {
            this.showSpinner = false;
            this.messageError = "Internal Server Error, sorry, try again."
        },
        () => this.showSpinner = false
      );
  }

  ngOnDestroy(): void {
    if (this.subscriptionCurrencyConverter) {
      this.subscriptionCurrencyConverter.unsubscribe();
    }
  }
}
