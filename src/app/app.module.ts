import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import routes from './app-routing.module';
import {AppComponent} from './app.component';
import {TaskComponent} from './components/task.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TaskAddComponent} from './components/task-add.component';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ModalDialogModule} from 'ngx-modal-dialog';
import {ModalTaskDeleteComponent} from './components/modal-task-delete.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthComponent} from './components/auth.component';
import {MenuContainerComponent} from './components/menu-container.component';
import {AuthInterceptor} from './interceptor/auth.interceptor';
import {AuthGuard} from './helpers/auth.guard';
import {TopBarComponent} from './components/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaskAddComponent,
    AuthComponent,
    MenuContainerComponent,
    ModalTaskDeleteComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalDialogModule.forRoot(),
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt'),
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/authenticate']
      }
    })
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
