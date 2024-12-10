import { Session } from './../../../../node_modules/socket.io-adapter/dist/in-memory-adapter.d';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../tools/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
  
    const { username, password } = this.loginForm.value;
  
    this.authService.login(username, password).subscribe({
      next: () => {
        console.log("Log réussi");
        this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord après connexion
        
      },
      error: (err) => {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
        console.error(err);  // Pour afficher l'erreur dans la console si besoin
      }
    });
  }
  
}
