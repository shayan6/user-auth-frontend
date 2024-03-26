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


  users:any[]=[];
  filteredUsers: any[] = [];
  sortField: string = 'id';
  sortOrder: string = 'ASC';
  perPage: number = 10;
  searchQuery: string = '';


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getAllusers();
  }

  applyFilters() {
    
    this.filteredUsers = this.users.sort((a, b) => {
      if (this.sortOrder === 'ASC') {
        return a[this.sortField] > b[this.sortField] ? 1 : -1;
      } else {
        return a[this.sortField] < b[this.sortField] ? 1 : -1;
      }
    });

    if (this.searchQuery) {
      console.log(this.searchQuery);
      this.filteredUsers = this.users.filter(user =>
        Object.values(user).some(value => value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
      );
    }

    this.filteredUsers = this.filteredUsers.slice(0, this.perPage);
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

  getAllusers() {
    this.http.get('http://localhost:3000/users').subscribe((res:any) => {
      this.users = res;
      this.filteredUsers = res;
    } , error => {
      alert("Error From API")
    })
  }

}
