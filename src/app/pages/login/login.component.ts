import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  loginObj: Login;
  signupObj: Signup;
  errorMessages: string[];

  constructor(private http: HttpClient, private router: Router) {
    this.loginObj = new Login();
    this.signupObj = new Signup();
    this.errorMessages = [];
  }

  onLogin() {
    const apiUrl = "http://localhost:3000/auth/login";
    this.http.post(apiUrl, this.loginObj).subscribe(
      (response: any) => {
        console.log("Login successful:", response);

        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

        this.router.navigateByUrl("/user-profile");
      },
      (error) => {
        alert(JSON.stringify(error.error));
        console.error("Login failed:", error);
      }
    );
  }

  onSignup() {
    const apiUrl = 'http://localhost:3000/auth/register';

    this.http.post(apiUrl, this.signupObj).subscribe((response: any) => {
      alert('Signup successful');
      console.log('Signup successful:', response);
      this.signIn();
      this.resetSignUpForm();
    }, 
    (error: HttpErrorResponse) => {
      console.error("Login failed:", error);

      if (error.status === 400) {
        this.errorMessages = error.error.message;
      } else if (error.status === 409) {
        this.errorMessages = [error.error.message];
      }else {
        this.errorMessages = ['An error occurred during login. Please try again later.'];
      }
    })
  }
  
  resetSignUpForm() {
    this.signupObj = { name: '', phone: '', email: '', password: '' };
  }

  signUp() {
    const container = document.querySelector(".tech-container");
    container?.classList.add("sign-up-mode");
  }

  signIn() {
    const container = document.querySelector(".tech-container");
    container?.classList.remove("sign-up-mode");
  }

  setFocus(on: boolean) {
    const element = document.activeElement as HTMLElement;
    const parent = element.parentElement;
    if (on) {
      parent?.classList.add("focus");
    } else {
      parent?.classList.remove("focus");
    }
  }
}

export class Login {
  email: string;
  password: string;
  constructor() {
    this.email = "";
    this.password = "";
  }
}

export class Signup {
  name: string;
  phone: string;
  email: string;
  password: string;
  constructor() {
    this.name = "";
    this.phone = "";
    this.email = "";
    this.password = "";
  }
}
