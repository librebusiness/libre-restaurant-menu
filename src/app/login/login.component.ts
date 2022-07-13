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
      const alert = document.createElement('div');
      alert.className = "alert alert-danger alert-dismissible fade show my-2";
      alert.setAttribute('role', 'alert');
      const strong = document.createElement('strong');
      strong.textContent = 'Error';
      alert.appendChild(strong);
      alert.append(`: ${err.message}`);
      const button = document.createElement('button');
      button.className = 'btn-close';
      button.setAttribute('data-bs-dismiss', 'alert');
      button.setAttribute('aria-label', 'close');
      button.onclick = () => alert.remove();
      alert.appendChild(button);
      document.querySelector('div#logger')!.appendChild(alert);
    });
  }

}
