import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  links = [
    { title: 'Menu', fragment: '' },
  ];
  signedInLinks = [
    { title: 'Dashboard', fragment: 'dashboard' },
    { title: 'Profile', fragment: 'profile' },
  ];
  user$: Observable<User | null>;

  constructor(
    public route: ActivatedRoute,
    public auth: Auth
  ) {
    this.user$ = authState(this.auth);
  }

  logout() {
    signOut(this.auth);
  }
}
