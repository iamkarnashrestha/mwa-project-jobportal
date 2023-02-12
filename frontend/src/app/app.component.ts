import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import IUserState from './IUserState.interface';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  template: `
     <nav class="navbar navbar-expand-lg" style="background-color: #e3f2fd;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MWA Job Portal</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent"  *ngIf="userState.fullname;">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" [routerLink]="['dashboard']">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" [routerLink]="['jobs']">Jobs</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" [routerLink]="['category']">Categories</a>
        </li>
      </ul>

        <li class="nav-item dropdown" style="list-style: none;">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Welcome {{userState.fullname}}!
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#" [routerLink]="['profile']">Profile</a></li>
            <li *ngIf="empcheck"><a class="dropdown-item" href="#" [routerLink]="['jobs','applied',userId]">Applied Jobs</a></li>
            <li *ngIf="!empcheck"><a class="dropdown-item" href="#" [routerLink]="['','jobs','posted',userId]">Posted Jobs</a></li>
            <li><a class="dropdown-item" (click)="logout()"  >Log Out</a></li>
          </ul>
        </li>
    </div>
  </div>
</nav>


   <ng-template #login>
    <!-- <a [routerLink]="['']">Login</a> -->
   </ng-template>
   <router-outlet/>

  `,
  styles: [],
})
export class AppComponent {
  userState!: IUserState;
  userService = inject(UserService);
  router = inject(Router);
  empcheck: boolean;
  userId: string = '';
  constructor() {
    this.empcheck = false;
    this.userService.getUserState$.subscribe((response) => {
      this.userState = response;
      this.userId = this.userState._id as string;
      if (this.userState.role === 'Employee') {
        this.empcheck = true;
      } else {
        this.empcheck = false;
      }
    });
  }

  logout() {
    this.userService.setUserState({
      jwt: '',
      _id: '',
      email: '',
      fullname: '',
      role: '',
    });
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
