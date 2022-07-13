import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, authState, updateProfile, updateEmail, updatePassword, User } from '@angular/fire/auth';
import { getBytes, ref, uploadBytesResumable, uploadString, getDownloadURL, Storage } from '@angular/fire/storage';
import { Firestore, doc, docData, collection, CollectionReference, updateDoc } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { BusinessData } from '../business-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm = this.fb.group({
    displayName: [''],
    email: [''],
    password: [''],
  });
  businessForm = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
    address: [''],
  });
  photoUrl = '';
  user$: Observable<User | null>;

  constructor(
    private auth: Auth,
    private storage: Storage,
    private fb: FormBuilder,
    private firestore: Firestore,
  ) {

    const businessDataCollection = collection(this.firestore, 'businessData') as CollectionReference<BusinessData>;
    this.user$ = authState(this.auth)
    this.user$.subscribe(user => {
      if (user) {
        this.profileForm.get('displayName')?.setValue(user.displayName);
        this.profileForm.get('email')?.setValue(user.email);
        if (user.photoURL) {
          this.photoUrl = user.photoURL;
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadBusinessData();
  }

  async loadBusinessData() {
    docData<BusinessData>(
      doc(this.firestore, 'businessData', 'business-info')
    ).subscribe(data => {
      if (data) {
        this.businessForm.setValue(data);
      }
    });
  }

  createAlert(success: boolean, message = 'Your changes were saved correctly!') {
    const alert = document.createElement('div');
    alert.className = "change-alert alert alert-dismissible fade show my-2 p-3 " + (success ? "alert-info" : 'alert-danger');
    alert.setAttribute('role', 'alert');
    const strong = document.createElement('strong');
    strong.textContent = success ? 'Notice' : 'Error';
    alert.appendChild(strong);
    alert.append(`: ${message}`);
    const button = document.createElement('button');
    button.className = 'btn-close';
    button.setAttribute('data-bs-dismiss', 'alert');
    button.setAttribute('aria-label', 'close');
    button.onclick = () => alert.remove();
    alert.appendChild(button);
    document.querySelector('div#logger')!.appendChild(alert);
  }

  uploadPicture(e: any) {
    const reader = new FileReader();

    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.onload = async () => {
        const storageRef = ref(this.storage, 'profile-picture.' + file!.name.split('.').pop());
        uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef)
          .then(url => {
            this.user$.subscribe(user => {
              if (user) {
                updateProfile(user, {
                  photoURL: url
                }).then(() => {
                  this.createAlert(true);
                  this.photoUrl = url;
                }).catch((err) => this.createAlert(false, err.message));
              }
            });
          }).catch(err => this.createAlert(false, err.message));
        }).catch(err => this.createAlert(false, err.message));
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.user$.subscribe(user => {
      if (user) {
        if (user.email !== this.profileForm.value.email) {
          updateEmail(user, this.profileForm.value.email)
            .then(() => this.createAlert(true))
            .catch((err) => this.createAlert(false, err.message));
        }
        if (user.displayName !== this.profileForm.value.displayName) {
          updateProfile(user, {
            displayName: this.profileForm.value.displayName
          })
            .then(() => this.createAlert(true))
            .catch((err) => this.createAlert(false, err.message));
        }
        if (this.profileForm.value.password) {
          updatePassword(user, this.profileForm.value.password)
            .then(() => this.createAlert(true))
            .catch((err) => this.createAlert(false, err.message));
        }
      }
    });
  }

  onBusinessFormSubmit() {
    const businessData = this.businessForm.value;
    updateDoc<BusinessData>(
      doc(this.firestore, 'businessData', 'business-info'),
      businessData as BusinessData
    ).then(() => {
      this.createAlert(true);
    }).catch((err) => this.createAlert(false, err.message));
  }

}
