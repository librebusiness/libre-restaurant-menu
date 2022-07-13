import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishItemComponent } from './dish-item/dish-item.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore, enableMultiTabIndexedDbPersistence } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ProfileComponent } from './profile/profile.component';

let resolvePersistenceEnabled: (enabled: boolean) => void;

export const persistenceEnabled = new Promise<boolean>(resolve => {
  resolvePersistenceEnabled = resolve;
});

@NgModule({
  declarations: [
    AppComponent,
    DishDetailComponent,
    DishListComponent,
    DishItemComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      const firestore = getFirestore();
      enableMultiTabIndexedDbPersistence(firestore).then(
        () => resolvePersistenceEnabled(true),
        () => resolvePersistenceEnabled(false)
      );
      return firestore;
    }),
    provideStorage(() => getStorage()),
    NgbModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
