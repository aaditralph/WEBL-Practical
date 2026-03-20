import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  listItems: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  formDemo = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  onSubmit() {
    this.listItems.push(this.formDemo.value);
    console.warn(this.formDemo.value);
    this.cdr.detectChanges();
  }
}
