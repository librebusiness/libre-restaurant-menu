import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    signInWithEmailAndPassword(this.auth, email, password)
    .then(result => {
      this.router.navigate(['dashboard']);
    })
    .catch(err => {
      alert(err.message);
    });
  }

}
