import { For } from './../../../../node_modules/@babel/types/lib/index-legacy.d';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-log-buttons',
  imports: [FormsModule, RouterModule],
  templateUrl: './log-buttons.component.html',
  styleUrl: './log-buttons.component.scss'
})
export class LogButtonsComponent {
  constructor() { }

  @Output() logInEvent = new EventEmitter<any>();
  @Output() signUpEvent = new EventEmitter<any>();


  logIn() {
    this.logInEvent.emit();
    console.log("logIn");
  }

  signUp() {
    this.signUpEvent.emit();
    console.log("signUp");
  }
}
