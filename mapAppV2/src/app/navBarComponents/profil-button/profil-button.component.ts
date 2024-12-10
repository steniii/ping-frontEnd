import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profil-button',
  imports: [],
  templateUrl: './profil-button.component.html',
  styleUrl: './profil-button.component.scss'
})
export class ProfilButtonComponent {

  @Output() clickOnLogoutEvent = new EventEmitter<any>();
  @Output() clickOnMyPingsEvent = new EventEmitter<any>();

  clickOnLogout() {
    this.clickOnLogoutEvent.emit();
  }

  clickMyPings() {
    this.clickOnMyPingsEvent.emit();
  }

}
