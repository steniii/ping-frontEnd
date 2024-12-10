import { Component, EventEmitter, Output } from '@angular/core';
import { Ilocalisation } from '../../tools/models/ILocalisation';
import { MapServicesService } from '../../tools/services/pings.service';

@Component({
  selector: 'app-items',
  imports: [],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  localisations : Ilocalisation[] = [];
  @Output() clickItemSelection = new EventEmitter<Ilocalisation>();

  constructor(pingsServices: MapServicesService) {
    pingsServices.getLocalisations().subscribe(localisations => {
      this.localisations = localisations;
    });
  }

  onClick(localisation: Ilocalisation) {
    console.log("onClick() : "+localisation.lattitude+" "+localisation.longitude);
    this.clickItemSelection.emit(localisation);
  }



}
