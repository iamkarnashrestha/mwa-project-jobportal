import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import IUserState from 'src/app/IUserState.interface';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-signup',
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
                      Sign up
                    </p>

                    <form
                      class="mx-1 mx-md-4"
                      [formGroup]="signupForm"
                      (ngSubmit)="signup()"
                    >
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            class="form-control"
                            formControlName="fullname"
                            required
                          />
                          <label class="form-label" for="form3Example1c"
                            >Your Full Name</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            formControlName="email"
                            required="required"
                          />
                          <label class="form-label" for="form3Example3c"
                            >Your Email</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                            formControlName="password"
                          />
                          <label class="form-label" for="form3Example4c"
                            >Password</label
                          >
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <select
                            class="Role"
                            class="form-control"
                            formControlName="role"
                          >
                            <option value="undefined">Select Role</option>
                            <option value="Employee">Employee</option>
                            <option value="Employer">Employer</option>
                          </select>
                          <label class="form-label" for="form3Example4cd"
                            >Select Role</label
                          >
                        </div>
                      </div>

                      <div
                        class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      >
                        <button
                          type="button"
                          class="btn btn-primary btn-lg"
                          (click)="signup()"
                        >
                          Sign Up
                        </button>
                      </div>
                    </form>
                  </div>
                  <div
                    class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                  >
                    <img
                      src="https://media.licdn.com/dms/image/C4D12AQFi4yZvoIWupw/article-cover_image-shrink_600_2000/0/1520245690802?e=2147483647&v=beta&t=DPku0cXBtug4yRb87m-lAIlBPF7NdQsmQ8gLoCaQrAU"
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
export class SignupComponent {
  selected = 'isSelected';
  userService = inject(UserService);
  router = inject(Router);
  signupForm = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    role: ['undefined', Validators.required],
  });

  signup() {
    this.userService
      .signup(
        this.signupForm.value as {
          fullname: String;
          email: string;
          password: string;
          role: string;
        }
      )
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['login']);
        }
      });
  }
}
