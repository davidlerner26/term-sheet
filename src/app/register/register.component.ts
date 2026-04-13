import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldInputComponent } from '../shared/components/form-field-input/form-field-input.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, FormFieldInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private loadingService: LoadingService,
  ) {}

  async register() {
    this.loadingService.loadingUserMerchantSubject.next(true);
    try {
      await this.auth.createUser(this.form.getRawValue());
      this.loadingService.loadingUserMerchantSubject.next(false);
      this.router.navigateByUrl('/');
    } catch (e) {
      console.error(e);
      this.loadingService.loadingUserMerchantSubject.next(false);
    }
  }
}
