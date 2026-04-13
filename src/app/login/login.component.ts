import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormFieldInputComponent } from '../shared/components/form-field-input/form-field-input.component';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormFieldInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  async login() {
    this.loadingService.loadingUserMerchantSubject.next(true);
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.formControlValue('email'),
        this.formControlValue('password'),
      );
      this.loadingService.loadingUserMerchantSubject.next(false);
      this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);
      this.loadingService.loadingUserMerchantSubject.next(false);
    }
  }

  formControlValue(control: string) {
    return this.form.get(control)?.value;
  }
}
