import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import IUserState from 'src/app/IUserState.interface';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  template: `
    <section class="vh-100" style="background-color: #eee;">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px;">
              <div class="card-body p-md-5">
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form
                      class="mx-1 mx-md-4"
                      [formGroup]="loginForm"
                      (ngSubmit)="login()"
                    >
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example3c"
                            >Email</label
                          >
                          <input
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            formControlName="email"
                          />
                          
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                        <label class="form-label" for="form3Example4c"
                            >Password</label
                          >
                          <input
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                            formControlName="password"
                          />
                         
                        </div>
                      </div>
                      <p *ngIf="error" class="text-danger">{{ error }}</p>

                      <div
                        class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      >
                        <button
                          type="button"
                          class="btn btn-primary btn-lg"
                          (click)="login()"
                        >
                          Login
                        </button>
                       
                        &nbsp; &nbsp;
                        
                      </div>
                      <br>
                      <label for=""> Don't have account?</label>
                        <a style="display:block" [routerLink]="['','signup']" class="btn btn-primary">Sign Up</a>
                    </form>
                  </div>
                  <div
                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [],
})
export class LoginComponent {
  userService = inject(UserService);
  error: string = '';
  router = inject(Router);
  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['agburi89@gmail.com', Validators.required],
    password: ['12345', Validators.required],
  });

  login() {
    this.userService
      .login(this.loginForm.value as { email: string; password: string })
      .subscribe(
        (response) => {
          if (response.success) {
            //save state
            const decoded: IUserState = jwt_decode(response.results);
            this.userService.setUserState({
              ...decoded,
              jwt: response.results,
            });
            localStorage.setItem(
              'USER_STATE',
              JSON.stringify({
                ...decoded,
                jwt: response.results,
              })
            );

            this.router.navigate(['dashboard']);
          }
        },
        (err) => {
          this.error = 'Invalid Credentials, Please Re-Check';
        }
      );
  }
}
