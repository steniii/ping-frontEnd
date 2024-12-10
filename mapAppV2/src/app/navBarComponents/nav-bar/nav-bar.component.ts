import { AuthService } from './../../tools/services/auth.service';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { LogButtonsComponent } from '../log-buttons/log-buttons.component';
import { ProfilButtonComponent } from '../profil-button/profil-button.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  imports: [LogButtonsComponent, ProfilButtonComponent, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  AuthServices = inject(AuthService);
  routerServices = inject(Router);

  @Output() myPingsEvent = new EventEmitter<any>();

  isLoggedIn!:boolean;
  constructor() {
    
  }
  
  ngOnInit(): void {
    this.AuthServices.isUserAuthenticated.subscribe(isUserAuthenticated => {
      this.isLoggedIn = isUserAuthenticated;
    });
  }

  
  logInEvent(event: any) {
    this.routerServices.navigate(['/login']);
  }

  signUpEvent(event: any) {
    this.routerServices.navigate(['/register']);
  }

  logOut(){
    this.AuthServices.logout();
  }

  myPings(){
    this.myPingsEvent.emit();
  }

  

}
