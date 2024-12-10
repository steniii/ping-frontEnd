import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './../../tools/services/auth.service';
import { Component, inject } from '@angular/core';
import { ItemsComponent } from "../items/items.component";
import { RouterModule } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { Ilocalisation } from '../../tools/models/ILocalisation';
import { AddPingFormComponent } from '../add-ping-form/add-ping-form.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [ItemsComponent, RouterModule, MapComponent, AddPingFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isOnCreateMode : boolean = false;
  newPositionForm! : {lat:number, lng:number};

  constructor() {
  }

 
  onCreateMode(newPosition : {lat:number, lng:number}) {
    console.log("onCreateMode() : "+newPosition.lat+" "+newPosition.lng);
    if (!this.newPositionForm) {
      this.newPositionForm = { lat: 0, lng: 0 }; // Initialisez-le si nécessaire
    }
    this.newPositionForm.lat = newPosition.lat;
    this.newPositionForm.lng = newPosition.lng;
    this.isOnCreateMode= true;
  }
  onNavigateMode(){
    this.isOnCreateMode = false;
  }

  mapCenter : any;
  onItemsClick(localisation: Ilocalisation) {
    this.mapCenter= {lat: localisation.lattitude, lng: localisation.longitude};
  }

    logOut(){
        console.log("logOut demandé");
        console.log(this.authService.currentUserValue);
        this.authService.logout();
        console.log("logOut effectué");
        this.router.navigate(['/login']);
    }
}
