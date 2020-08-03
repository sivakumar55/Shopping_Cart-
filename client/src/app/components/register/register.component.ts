import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {}

  onHandleSubmit(form: NgForm) {
    let user = {
      name: form.value.name,
      email: form.value.email,
      username: form.value.username,
      password: form.value.password,
      password2: form.value.password2
    };

    //Validate Name..........................
    if (!this.validateService.validateName(user.name)) {
      alert('Invalid Name!')
      return false;
    }

    //Validate Email Id...............................
    if (!this.validateService.validateEmail(user.email)) {
      alert('Invalid Email Id!');
      return false;
    }

    //Validate Username...........................
    if (!this.validateService.validateUsername(user.username)) {
      alert('Invalid Username!');
      return false;
    }

    //Validate Password....................
    if (!this.validateService.validatePassword(user.password, user.password2)) {
      alert('Password not matched!');
      return false;
    }

    //If there is no any errors then add user....................
    this.authService.registerUser(user).subscribe(data => {
      if (data) {
        alert("Your account successfully created, Let's get logged in!")
        this.router.navigate(['authenticate']);
        form.resetForm();
        return true;
      } else {
        alert('Something went wrong!')
        this.router.navigate(['items']);
        return false;
      }
    });
  }
}
