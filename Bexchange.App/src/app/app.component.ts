import { Component, EventEmitter, Output, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  
  title: string = 'Bexchange';
  modal: boolean = false;
  registerModal: boolean = false;
  loggedIn: boolean = false;
  @ViewChild('accountText', {static: false})
  accountText!: ElementRef;

  ngOnInit() {
  }

  checkLoggedVal() {
    this.accountText.nativeElement.value = this.loggedIn == false ? 'Увійти в акаунт' : "Дії з акаунтом";
    this.accountText.nativeElement.value = 'dsf'
  } 
}
