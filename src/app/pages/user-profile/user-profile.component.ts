import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  user:any;
  
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    const decodedToken: any = this.decodeToken();
    console.log({decodedToken});
    const userId = decodedToken ? decodedToken.id : null;
    if (userId) {
      this.getUserById(userId);
    }
  }

  getUserById(id: string) {
    this.http.get('http://localhost:3000/users' + id).subscribe((res:any) => {
      this.user = res;
    } , error => {
      alert("Error From API")
    })
  }

  decodeToken(): any {
    const token = localStorage.getItem('access_token');
    if (token) {
      return jwtDecode(token);
    } else {
      return null;
    }
  }

}
