import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IUserState from 'src/app/IUserState.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-header">User Profile</div>
        <div class="card-body">
          <p class="card-text">
            Full Name: {{ user.fullname }} <br />
            Email: {{ user.email }} <br>
            Role: {{ user.role }} <br>
            
          </p>
          <a
            [routerLink]="['', 'profile', 'updateProfile',user._id]"
            class="btn btn-primary"
            >Update Profile</a
          >
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class ProfileComponent {
  userState!: IUserState;
  userService = inject(UserService);
  user: any = {};
  constructor() {
    this.userService.getUserState$.subscribe((response) => {
      this.userState = response;
    });

    this.userService.getUserById(this.userState.email).subscribe((response) => {
      this.user = response.results;
    });
  }
}
