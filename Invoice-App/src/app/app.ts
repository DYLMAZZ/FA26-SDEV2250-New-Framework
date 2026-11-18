import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InvoiceItem {
  item: string;
  quantity: number;
  cost: number;
}

interface InvoiceSheet {
  id: number;
  items: InvoiceItem[];
  tax: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  sheets: InvoiceSheet[] = [
    {
      id: 0,
      items: [
        { item: '', quantity: 0, cost: 0 },
        { item: '', quantity: 0, cost: 0 }
      ],
      tax: 6
    },
    {
      id: 1,
      items: [
        { item: '', quantity: 0, cost: 0 },
        { item: '', quantity: 0, cost: 0 }
      ],
      tax: 6
    }
  ];

  addRow(sheet: InvoiceSheet): void {
    sheet.items.push({
      item: '',
      quantity: 0,
      cost: 0
    });
  }

  calculateItemTotal(item: InvoiceItem): number {
    return this.round(
      (Number(item.quantity) || 0) *
      (Number(item.cost) || 0)
    );
  }

  calculateSubtotal(sheet: InvoiceSheet): number {
    return this.round(
      sheet.items.reduce(
        (sum, item) => sum + this.calculateItemTotal(item),
        0
      )
    );
  }

  calculateTax(sheet: InvoiceSheet): number {
    return this.round(
      this.calculateSubtotal(sheet) *
      ((Number(sheet.tax) || 0) / 100)
    );
  }

  calculateTotal(sheet: InvoiceSheet): number {
    return this.round(
      this.calculateSubtotal(sheet) +
      this.calculateTax(sheet)
    );
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
