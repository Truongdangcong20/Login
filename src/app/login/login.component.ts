import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/user.model';
import { AuthenService } from '../services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenService],
})
export class LoginComponent implements OnInit {
  form: UserLogin = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthenService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    //const { username, password } = this.form;

    this.authService.login(JSON.stringify(this.form)).subscribe(
      (data) => {
        this.router.navigate(['/user']);
      },
      (err) => {
        console.log(err);
        alert('login false');
      }
    );
  }
}
