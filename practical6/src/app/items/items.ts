import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items',
  imports: [CommonModule],
  templateUrl: './items.html',
  styleUrl: './items.css',
})
export class Items {
  items: any[] = [];
  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.apiService.getItems().subscribe((data) => {
      this.items = data.data.slice(0, 10);
      this.cdr.detectChanges();
    });
  }
}
