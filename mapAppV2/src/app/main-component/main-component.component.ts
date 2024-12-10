import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from '../navBarComponents/nav-bar/nav-bar.component';
import { RegisterComponent } from "../authComponents/register/register.component";
import { LoginComponent } from "../authComponents/login/login.component";
import { AuthService } from '../tools/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-component',
  imports: [NavBarComponent,  RouterModule],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent implements OnInit {
  private routerService = inject(Router);
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.routerService.navigate(['/dashboard']);
      }
    else{
      this.routerService.navigate(['/login']);
  }


}
}