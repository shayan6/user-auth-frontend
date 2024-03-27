import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  orders:any[]=[];
  filteredorders: any[] = [];
  sortField: string = 'id';
  sortOrder: string = 'ASC';
  perPage: number = 10;
  searchQuery: string = '';


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllorders();
  }

  applyFilters() {
    
    this.filteredorders = this.orders.sort((a, b) => {
      if (this.sortOrder === 'ASC') {
        return a[this.sortField] > b[this.sortField] ? 1 : -1;
      } else {
        return a[this.sortField] < b[this.sortField] ? 1 : -1;
      }
    });

    if (this.searchQuery) {
      console.log(this.searchQuery);
      this.filteredorders = this.orders.filter(user =>
        Object.values(user).some(value => value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }

    this.filteredorders = this.filteredorders.slice(0, this.perPage);
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  onPerPageChange() {
    this.applyFilters();
  }

  getAllorders() {
    this.http.get('http://localhost:3000/users').subscribe((res:any) => {
      this.orders = res;
      this.filteredorders = res;
    } , error => {
      alert("Error From API")
    })
  }

}
