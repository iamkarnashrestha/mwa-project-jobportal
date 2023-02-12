import { Component } from '@angular/core';

@Component({
  selector: 'app-landingpage',
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
                      Welcome to MWA Job Portal
                    </p>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <a
                        type="button"
                        class="btn btn-primary btn-lg"
                        [routerLink]="['login']"
                      >
                        Login
                      </a>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <a
                        type="button"
                        class="btn btn-primary btn-lg"
                        [routerLink]="['signup']"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <a [routerLink]="['login']" class="btn btn-success">Login</a>
        <a [routerLink]="['signup']" class="btn btn-secondary">Signup</a> -->
  `,
  styles: [],
})
export class LandingpageComponent {}
