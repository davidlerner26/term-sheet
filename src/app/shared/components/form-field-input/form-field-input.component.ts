import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form-field-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './form-field-input.component.html',
  styleUrl: './form-field-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldInputComponent {
  @Input({ required: true }) form!: UntypedFormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) name = '';
  @Input({ required: true }) label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
}
