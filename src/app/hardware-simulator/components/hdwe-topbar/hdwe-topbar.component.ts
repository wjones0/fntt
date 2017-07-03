import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'fntt-hdwe-topbar',
  templateUrl: './hdwe-topbar.component.html',
  styleUrls: ['./hdwe-topbar.component.css']
})
export class HdweTopbarComponent implements OnInit {

  user: firebase.User;
  userSub: Subscription;

  @Output()
  onMenuToggled = new EventEmitter<boolean>();

  constructor(public afAuth: AngularFireAuth) {
    this.userSub = afAuth.authState.subscribe((value) => this.user = value);
  }

  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  toggleMenu() {
    this.onMenuToggled.emit(true);
  }

}
