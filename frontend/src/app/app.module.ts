import { NgModule, APP_INITIALIZER, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Router, RouterModule } from '@angular/router';
import { ProfileComponent } from './modules/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTokenInterceptor } from './add-token.interceptors';
import { AuthGuardService } from './services/AuthGuardService.service';
import { SignupComponent } from './components/signup/signup.component';
import { CategoryDetailsComponent } from './modules/category/category-details/category-details.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

function initializeAppFactory(userService: UserService): () => void {
  return () => {
    const localStorage_state = localStorage.getItem('USER_STATE');
    if (localStorage_state) {
      userService.setUserState(JSON.parse(localStorage_state));
    }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    DashboardComponent,
    SignupComponent,
    LandingpageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      {
        path: 'signup',
        component: SignupComponent,
      },

      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: '',
        component: LandingpageComponent,
        
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (module) => module.ProfileModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('./modules/jobs/jobs.module').then(
            (module) => module.JobsModule
          ),
        canActivate: [AuthGuardService],
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./modules/category/category.module').then(
            (module) => module.CategoryModule
          ),
        canActivate: [AuthGuardService],
      },

      {
        path: 'details/:id',
        component: CategoryDetailsComponent,
        canActivate: [AuthGuardService],
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [UserService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  router = inject(Router);
}
