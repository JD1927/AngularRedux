import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Ng Bootstrap
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';

// Angular Firebase
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';

// NgRX Modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  routerReducer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './app-store/reducers/reducers';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/store/effects/auth.effects';
// NGRX Imports
const NGRX_IMPORTS = [
  StoreModule.forRoot(reducers, { metaReducers }),
  // StoreRouterConnectingModule.forRoot({ stateKey: 'router'}),
  EffectsModule.forRoot([]),
  StoreDevtoolsModule.instrument({
    name: 'Angular-Chat',
    logOnly: environment.production,
    maxAge: 25
  })
];
// FIRE Imports
const FIRE_IMPORTS = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFirestoreModule
];
@NgModule({
  declarations: [
    AppComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ...NGRX_IMPORTS,
    ...FIRE_IMPORTS,
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal],
  entryComponents: [AlertModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
