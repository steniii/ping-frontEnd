import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../tools/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required,]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required,]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
  
    const { username, password, confirmPassword } = this.registerForm.value;

    if(password !== confirmPassword){
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }
  
    this.authService.register(username, password).subscribe({
      next: () => {
        console.log("Création de l'utilisateur réussie");
        
        this.router.navigate(['/login']); // Redirige vers le tableau de bord après connexion
      },
      error: (err) => {
        this.errorMessage = 'Création de l\'utilisateur échouée.';
        console.error(err);  // Pour afficher l'erreur dans la console si besoin
      }
    });


  }

    

  //   const { username, password, confirmPassword } = this.registerForm.value;

  //   if (password !== confirmPassword) {
  //     this.errorMessage = "Les mots de passe ne correspondent pas.";
  //     return;
  //   }

  //   this.authService.register(username, password).subscribe(
  //     () => {
  //       this.router.navigate(['/login']);
  //     },
  //     error => {
  //       this.errorMessage = "Erreur lors de l'inscription.";
  //     }
  //   );
  // }
}
