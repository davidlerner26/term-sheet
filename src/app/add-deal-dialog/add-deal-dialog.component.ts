import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldInputComponent } from '../shared/components/form-field-input/form-field-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DealService } from '../services/deal.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
export class AddDealDialog {
  form = this.fb.nonNullable.group({
    dealName: ['', Validators.required],
    price: [0, Validators.required],
    address: ['', Validators.required],
    noi: [0, Validators.required],
    capRate: [{ value: 0, disabled: true }, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<AddDealDialog>,
    private fb: FormBuilder,
    private dealsService: DealService,
  ) {
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value.noi && value.price) {
        const { noi, price } = value;
        this.form.controls['capRate']?.setValue((noi / price) * 100);
      }
    });
  }

  async submit() {
    try {
      await this.dealsService.addDeal(this.form.getRawValue());
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
    }
  }
}
