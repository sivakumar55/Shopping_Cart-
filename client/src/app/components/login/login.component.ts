import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";
import { ValidateService } from "../../services/validate.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {}

  onHandleLogin(form: NgForm) {
    let user = {
      username: form.value.username,
      password: form.value.password
    };

    //Validate Username...........................
    if (!this.validateService.validateUsername(user.username)) {
      alert ('Invalid Username!');
      return false;
    }

    //If there is no any errors let's logged in..........
    this.authService.authenticateUser(user).subscribe(data => {
      if (data) {
        this.authService.storeUserData(data.token, data.user);
        alert ('You are logged in!');
        this.router.navigate(['dashboard']);
        return true;
      } else {
        alert ('User Not Found');
        this.router.navigate(['authenticate']);
        return false;
      }
    });
  }
}
