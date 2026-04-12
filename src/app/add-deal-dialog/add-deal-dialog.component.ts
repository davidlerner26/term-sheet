import { Component, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { debounceTime, Subscription } from 'rxjs';
import { DealService } from '../services/deal.service';
import { FormFieldInputComponent } from '../shared/components/form-field-input/form-field-input.component';

@Component({
  selector: 'app-add-deal-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormFieldInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './add-deal-dialog.component.html',
  styleUrl: './add-deal-dialog.component.scss',
})
export class AddDealDialog implements OnDestroy {
  form = this.fb.nonNullable.group({
    dealName: ['', Validators.required],
    price: [0, Validators.required],
    address: ['', Validators.required],
    noi: [0, Validators.required],
    capRate: [{ value: 0, disabled: true }, Validators.required],
  });
  formSubscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<AddDealDialog>,
    private fb: FormBuilder,
    private dealsService: DealService,
  ) {
    this.formSubscription = this.form.valueChanges
      .pipe(debounceTime(1000), takeUntilDestroyed())
      .subscribe((value) => {
        if (value.noi && value.price) {
          const { noi, price } = value;
          this.form.controls['capRate']?.setValue((noi / price) * 100);
        }
      });
  }

  async submit() {
    try {
      await this.dealsService.addDeal(this.form.getRawValue());
      this.dialogRef.close();
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }
}
