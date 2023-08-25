import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/app/store/auth.reducer';
import * as AuthActions from '../../store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  constructor(private router: Router, private store: Store<AuthState>) {}

  ngOnInit() {}

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/']); // home page, login again
  }
}
