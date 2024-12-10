import { AddedFormat } from './../../../../node_modules/ajv/dist/types/index.d';
// import { Marker, AdvancedMarkerElement } from './../../../../node_modules/@types/google.maps/index.d';

import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA, inject, ViewChild, ElementRef, Renderer2, Input, SimpleChanges, Output, EventEmitter, } from '@angular/core';
import { GoogleMap, GoogleMapsModule, MapMarker} from '@angular/google-maps';
import { MapServicesService } from '../../tools/services/pings.service';
import { Ilocalisation } from '../../tools/models/ILocalisation';
import { map } from 'rxjs';
import { mapStyles } from './map.styles';
import { style } from '@angular/animations';

declare var google: any;

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapComponent implements OnInit {

  @ViewChild('mapElement', {static: true}) mapElementRef!: ElementRef;
  
  center : google.maps.LatLngLiteral = {lat:48.88617857881954, lng:2.362484523876069 }; 
  
  @Input() mapCenter= this.center;
  @Output() clickCreatePing = new EventEmitter<google.maps.LatLngLiteral>();
  
  zoom : number = 20;
  mapId : string = 'DEMO_MAP_ID';
  map: any;
  marker: any;
  customMarker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;
  localisations: Ilocalisation[] = [];
  private renderer = inject(Renderer2);
  lastClick?: {lat:number, lng:number};

  constructor(private mapServices : MapServicesService) { 
    this.mapServices.getLocalisations().subscribe(localisations => {
      this.localisations = localisations;
      this.addMarkers();
    });
  }

  ngOnInit(): void {
    this.loadMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.map.setCenter(this.mapCenter);
  }

  async loadMap() {
    const {Map} = await google.maps.importLibrary('maps');


    const mapEl = this.mapElementRef.nativeElement;

    // const location = new google.maps.LatLng(37.421903, -122.084674);

    this.map = new Map(mapEl, {
      center: this.center,
      zoom: 10,
      mapId: '67194a45d5ce92ac',
      disableDefaultUI: true,
      styles: mapStyles
      // scaleControl : false,
      // zoomControl: false,
      // disableDoubleClickZoom: true,
      // disableDragging: true,
      // disableKeyboard: true,

      
    });
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      // Récupérer les coordonnées du clic
      if(event.latLng){
        this.lastClick = {lat:event.latLng.lat(), lng:event.latLng.lng()};
        console.log('Dernier clic:', this.lastClick);  // Afficher les coordonnées dans la console
        this.createCustomMarker();
      }
    });
    this.renderer.addClass(mapEl, 'visible');
    
  }

  async addMarkers() {
    const {AdvancedMarkerElement} = await google.maps.importLibrary('marker');
    // this.marker = new AdvancedMarkerElement({
    //   map: this.map,
    //   position: new google.maps.LatLng(50.4249144715562, 4.45908341921676),
      
    //   });
    // };
    for (let localisation of this.localisations) {
      console.log("localisation : "+localisation.lattitude+" "+localisation.longitude);
      const marker = new AdvancedMarkerElement({
        map: this.map,
        position: new google.maps.LatLng(localisation.lattitude, localisation.longitude),
      });
      marker.addListener('gmp-click', () => {
        console.log('Marker cliqué:', localisation);
      });
      
    }
    
    
  
  }


  async createCustomMarker() {
    console.log('createCustomMarker');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    const { PinElement } = await google.maps.importLibrary('marker');
  
    const customGlyphImg = document.createElement('img');
      customGlyphImg.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 511.99">
          <path fill="#00AB42" fill-rule="nonzero" d="M256 0c70.68 0 134.69 28.66 181.01 74.98C483.35 121.31 512 185.31 512 255.99c0 70.68-28.66 134.69-74.99 181.02-46.32 46.32-110.33 74.98-181.01 74.98-70.68 0-134.69-28.66-181.02-74.98C28.66 390.68 0 326.67 0 255.99S28.65 121.31 74.99 74.98C121.31 28.66 185.32 0 256 0zm116.73 236.15v39.69c0 9.39-7.72 17.12-17.11 17.12h-62.66v62.66c0 9.4-7.71 17.11-17.11 17.11h-39.7c-9.4 0-17.11-7.69-17.11-17.11v-62.66h-62.66c-9.39 0-17.11-7.7-17.11-17.12v-39.69c0-9.41 7.69-17.11 17.11-17.11h62.66v-62.67c0-9.41 7.7-17.11 17.11-17.11h39.7c9.41 0 17.11 7.71 17.11 17.11v62.67h62.66c9.42 0 17.11 7.76 17.11 17.11zm37.32-134.21c-39.41-39.41-93.89-63.8-154.05-63.8-60.16 0-114.64 24.39-154.05 63.8-39.42 39.42-63.81 93.89-63.81 154.05 0 60.16 24.39 114.64 63.8 154.06 39.42 39.41 93.9 63.8 154.06 63.8s114.64-24.39 154.05-63.8c39.42-39.42 63.81-93.9 63.81-154.06s-24.39-114.63-63.81-154.05z"/>
        </svg>
      `);

      

    // Supprime l'ancien customMarker s'il existe
    if (this.customMarker) {
      this.customMarker.setMap(null);
    }
    const pinGlyph = new PinElement({
      glyph: customGlyphImg, // Ajoute le SVG au centre du pin
      glyphColor: 'white', // Couleur du texte si nécessaire
      background: 'white', // Couleur de fond personnalisée
      borderColor : "green",
      // ?? borderWidth: 2,
    });


    // Crée un nouveau marker à la position de lastClick
    this.customMarker = new AdvancedMarkerElement({
      map: this.map,
      position: new google.maps.LatLng(this.lastClick!.lat, this.lastClick!.lng),
      content: pinGlyph.element,

    });

    // Ajouter un écouteur sur ce marker
    this.customMarker.addListener('gmp-click', () => {
      if (this.lastClick) {
        this.clickCreatePing.emit({ lat: this.lastClick.lat, lng: this.lastClick.lng });
      } else {
        console.error("Erreur : lastClick est undefined.");
      }
      console.log('Custom Marker cliqué à:', this.lastClick);
      this.customMarker.setMap(null);      
    });
  }
}



    // localisations.forEach((localisation: Ilocalisation) => {
    //   this.marker = new AdvancedMarkerElement({
    //     map: this.map,
    //     position: new google.maps.LatLng(localisation.lattitude, localisation.longitude),
        
    //   });
    // });

  

//   constructor(private _mapServices : MapServicesService ) { }
//   localisations : Ilocalisation[] = [];
//   OnInit() {
//     this._mapServices.getLocalisations().subscribe(localisations => {
//       this.localisations = localisations;
//     });
//   }

//   title = 'mapAppV2';
//   center : any = {lat: 37.421903, lng: -122.084674};
//   centerString = "37.4220656,-122.0840897";
//   zoom : number = 10;
//   mapId : string = 'DEMO_MAP_ID';
//   content: any;





//   //crée un element img pour l'icone du marker. cete img aura pour src le lienIcon
//   imgTag = document.createElement("img");
//   lienIcon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

//   parser = new DOMParser();
//   svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
//                     <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
//                     </svg>`;

//   options: google.maps.MapOptions = {
//     mapId: this.mapId,
//     center: this.center,
//     zoom: this.zoom,
//   };

//   ngOnInit(): void {
//   this.OnInit();
//   // intégre l'icone SVG dans le DOM
//   this.content = this.parser.parseFromString(this.svgString, 'image/svg+xml').documentElement;
//   //
//   //intégration de l'icone PNG dans le DOM
//   this.imgTag.src = this.lienIcon;

   

// }
//   positionString(localisation: Ilocalisation): string {
//     console.log("positionString() : "+localisation.lattitude+","+localisation.longitude);
//     return `${localisation.lattitude},${localisation.longitude}`;
//   }

