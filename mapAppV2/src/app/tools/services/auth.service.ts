// src/app/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/auth'; // Remplacez par l'URL de votre API
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private router = inject(Router);
  isUserAuthenticated : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('userTokens');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
    if(storedUser) {
      this.isUserAuthenticated.next(true);
    }
    
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Inscription
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, { username, password });
  }

  // Connexion
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { username, password }).pipe(
      map((response: any) => {
        if (response && response.access && response.refresh) {
          // Stocke les tokens dans le localStorage
          localStorage.setItem('userTokens', JSON.stringify(response));
          this.currentUserSubject.next(response);
          console.log(response);
          // console.log(this.isLoggedIn());
        }
        //console.log(response['access']);
        return response;
        
      })
    );
  }

  // Déconnexion
  logout(){
    localStorage.removeItem('userTokens');
    this.currentUserSubject.next(null);
    this.isUserAuthenticated.next(false);
    console.log("logged out")
    this.router.navigate(['/login']);


    // const refreshToken = this.currentUserValue?.refresh;
    // if (!refreshToken) {
    //   console.log("No refresh token found");
    //   return new Observable(observer => {
    //     observer.error('No refresh token found');
    //     observer.complete();
    //   });
    // }
    // console.log("refreshToken : " + refreshToken);
    // return this.http.post(`${this.apiUrl}/logout/`, { refresh_token: refreshToken }).pipe(
    //   map(() => {
    //     // Supprime les données de l'utilisateur du localStorage
    //     localStorage.removeItem('userTokens');
    //     this.currentUserSubject.next(null);
    //     this.router.navigate(['/login']);
    //   })
    // );
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    if(localStorage.getItem('userTokens')){
      console.log("isLoggedIn : " + this.currentUserValue);
      return true;
    }
    else{
      console.log("isLoggedIn : false pas de token");
      return false;
    }
  }

  // Ajoute un header d'autorisation avec le token d'accès
  getAuthHeaders(): HttpHeaders {
    const token = this.currentUserValue?.access;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
