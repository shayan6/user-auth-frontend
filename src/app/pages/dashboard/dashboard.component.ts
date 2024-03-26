import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {


  users:any[]=[];
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getAllusers();
  }

  getAllusers() {
    this.http.get('http://localhost:3000/users').subscribe((res:any) => {
      this.users = res;
    } , error => {
      alert("Error From API")
    })
  }

}
