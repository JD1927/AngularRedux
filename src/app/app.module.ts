import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Ng Bootstrap
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// NgRX Modules
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  routerReducer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { metaReducers, reducers } from './app-store/reducers/reducers';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/store/effects/auth.effects';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';
// Imports
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
    NgbModule.forRoot()
  ],
  providers: [NgbActiveModal],
  entryComponents: [AlertModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
