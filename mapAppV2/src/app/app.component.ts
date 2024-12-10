import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GoogleMap, GoogleMapsModule, MapMarker} from '@angular/google-maps';
import { MainComponentComponent } from "./main-component/main-component.component";


@Component({
  selector: 'app-root',
  imports: [GoogleMapsModule, MainComponentComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  // title = 'mapAppV2';
  // center : any = {lat: 37.421903, lng: -122.084674};
  // zoom : number = 10;
  // mapId : string = 'DEMO_MAP_ID';
  // content: any;

  // //crée un element img pour l'icone du marker. cete img aura pour src le lienIcon
  // imgTag = document.createElement("img");
  // lienIcon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  // parser = new DOMParser();
  // svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
  //                   <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
  //                   </svg>`;

  // options: google.maps.MapOptions = {
  //   mapId: this.mapId,
  //   center: this.center,
  //   zoom: this.zoom,
  // };

  // ngOnInit(): void {
  // // intégre l'icone SVG dans le DOM
  // this.content = this.parser.parseFromString(this.svgString, 'image/svg+xml').documentElement;
  // //
  // //intégration de l'icone PNG dans le DOM
  // this.imgTag.src = this.lienIcon;

  }

