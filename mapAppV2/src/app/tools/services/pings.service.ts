import { Injectable } from '@angular/core';
import { Ilocalisation } from '../models/ILocalisation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MapServicesService{

  private apiUrl = 'http://localhost:8000/pings/';  // URL de votre API Django
  private infoURl = "https://maps.googleapis.com/maps/api/geocode/json";
  private googleAPIKey = "AIzaSyCc_QoX81AZDfjQ125iXnh0JQyBSneLSOI";

  constructor(private http: HttpClient) { }

 


  getLocalisations(): Observable<Ilocalisation[]> {
    const userTokens = localStorage.getItem('userTokens');
  
    if (userTokens) {
      try {
        const token = JSON.parse(userTokens).access;
  
        if (!token) {
          console.error("Token d'accès manquant dans les userTokens.");
          throw new Error("Token manquant.");
        }
  
        console.log("in getLocalisations() localstorage tokens: ", userTokens);
        console.log("in getLocalisations() token to api: ", token);
  
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}` // Ajouter l'en-tête Authorization
        });
  
        return this.http.get<Ilocalisation[]>(`${this.apiUrl}`, { headers });
  
      } catch (error) {
        console.error("Erreur lors de l'analyse de userTokens : ", error);
        throw new Error("Erreur dans le format des tokens.");
      }
    } else {
      console.warn("Aucun token trouvé dans le localStorage.");
      throw new Error("Utilisateur non authentifié.");
    }
  }
  


  createLocalisation(localisation: google.maps.LatLngLiteral, description: string='Description auto', image: File | null = null) {
    //const newLocalisation : Ilocalisation = {lattitude: parseFloat(localisation.lat.toString()), longitude: parseFloat(localisation.lng.toString()), description: description, date : new Date(), image:File};
    const formData = new FormData();
    formData.append('lattitude', localisation.lat.toString());
    formData.append('longitude', localisation.lng.toString());
    formData.append('description', description);
    formData.append('date', new Date().toString());
    if (image != null) {
      formData.append('image', image);
    }
    console.log("createLocation() : "+JSON.stringify(formData));
    const userTokens = localStorage.getItem('userTokens')
    if (userTokens) {
      try {
        const token = JSON.parse(userTokens).access;
  
        if (!token) {
          console.error("Token d'accès manquant dans les userTokens.");
          throw new Error("Token manquant.");
        }
  
        console.log("in getLocalisations() localstorage tokens: ", userTokens);
        console.log("in getLocalisations() token to api: ", token);
  
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}` // Ajouter l'en-tête Authorization
        });
  
        return this.http.post<any>(this.apiUrl, formData, { headers });
  
      } catch (error) {
        console.error("Erreur lors de l'analyse de userTokens : ", error);
        throw new Error("Erreur dans le format des tokens.");
      }
    } else {
      console.warn("Aucun token trouvé dans le localStorage.");
      throw new Error("Utilisateur non authentifié.");
    }
    
  }

  deleteLocalisation(id: number) {
    console.log("deleteLocalisation() : "+id);
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }

  searchByTag(tag: string) {
    console.log("searchByTag() SERVICE API !!!!!!! : "+tag);
    return this.http.get<Ilocalisation[]>(`${this.apiUrl}search-by-tag/?tag=${tag}`);
  }

  getInfoLocalisation(localisation : google.maps.LatLngLiteral) {
    console.log("recherche d'info sur "+localisation.lat +localisation.lng )
    return this.http.get<any>(`${this.infoURl}?latlng=${localisation.lat},${localisation.lng}&key=${this.googleAPIKey}`);
  }
}