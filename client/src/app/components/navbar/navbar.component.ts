import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


import { AuthService } from "../../services/auth.service";

//Import LocalUser Model
import { LocalUserModel } from "../../models/local-user.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: string;
  user: LocalUserModel;
  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.title = "Shopclub";
    this.onLoadUser();
  }

  onCartClick() {
    this.onLoadUser();
    this.router.navigate(['user/item', this.user.id]);
  }

  onHandleLogOut() {
    this.authService.logoutUser()
    alert('You are logged out!')
    this.router.navigate(['']);
  }

  onLoadUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
