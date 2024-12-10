import { Component, EventEmitter, inject, Input, Output, ChangeDetectorRef } from '@angular/core';
import { MapServicesService } from '../../tools/services/pings.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-ping-form',
  templateUrl: './add-ping-form.component.html',
  styleUrls: ['./add-ping-form.component.scss'],
  imports: [FormsModule]
  
})
export class AddPingFormComponent {
  pingServices = inject(MapServicesService);
  cdr = inject(ChangeDetectorRef);

  @Output() closeFormEvent = new EventEmitter<void>();

  private _newPosition!: { lat: number; lng: number };
  infosPosition: string = 'Chargement...';
  description: string = '';
  selectedFile: File | null = null;

  @Output() onClickAdd = new EventEmitter<{ description: string; image: File }>();

  @Input()
  set newPosition(value: { lat: number; lng: number }) {
    this._newPosition = value;
    this.fetchLocationInfo();
  }
  get newPosition(): { lat: number; lng: number } {
    return this._newPosition;
  }

  private _isOnCreateMode = false;

  @Input()
  set isOnCreateMode(value: boolean) {
    this._isOnCreateMode = value;
    this.updateModalVisibility();
    this.cdr.detectChanges();
  }
  get isOnCreateMode(): boolean {
    return this._isOnCreateMode;
  }

  fetchLocationInfo() {
    this.pingServices.getInfoLocalisation({ lat: this.newPosition.lat, lng: this.newPosition.lng }).subscribe({
      next: (response) => {
        this.infosPosition = response.results[0]?.formatted_address || 'Adresse introuvable';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de la localisation :', err);
        this.infosPosition = 'Erreur de localisation';
      }
    });
  }

  updateModalVisibility() {
    if (this.isOnCreateMode) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
      this.resetForm();
    }
  }

  closeForm() {
    this.closeFormEvent.emit()
    this.selectedFile = null;
   
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.description || !this.selectedFile) {
      console.error('Description ou fichier manquant');
      return;
    }

    this.pingServices.createLocalisation(
      { lat: this.newPosition.lat, lng: this.newPosition.lng },
      this.description,
      this.selectedFile
    ).subscribe({
      next: (response) => {
        console.log('Localisation ajoutée avec succès :', response);
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout de la localisation :', error);
      },
      complete: () => {
        console.log('Ajout terminé.');
        this.resetForm();
      },
    });
  }

  resetForm(fileInput?: HTMLInputElement) {
    this.description = '';
    this.selectedFile = null;
  
    if (fileInput) {
      fileInput.value = ''; // Réinitialise la valeur de l'input file
    }
    this.closeForm();
  }
}
