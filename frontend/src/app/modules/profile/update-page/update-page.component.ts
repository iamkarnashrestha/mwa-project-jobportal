import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import IUserState from 'src/app/IUserState.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-page',
  template: `
    <div class="container">
      {{ user.role }}
      <div class="card">
        <div class="card-header">Profile Update Page</div>
        <form [formGroup]="userForm" (ngSubmit)="updateProfile()">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              formControlName="fullname"
            />
          </div>
          <div class="input-group mb-3">
            <input type="text" class="form-control" aria-label="Username" formControlName="email" />
          </div>
         
          <div class="input-group mb-3">
            <select name="" id="" formControlName="role" class="form-control">
              <option value="Employee">Employee</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          <button class="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class UpdatePageComponent {
  userState!: IUserState;
  userService = inject(UserService);
  user: any = {};
  router=inject(Router)
  route = inject(ActivatedRoute);
  userId=this.route.snapshot.paramMap.get('id') as string

  userForm = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required],
  });
  constructor() {
    this.userService.getUserState$.subscribe((response) => {
      this.userState = response;
    });
  }
  ngOnInit() {
    this.userService.getUserById(this.userState.email).subscribe((response) => {
      if (response.success) {
        this.userForm.get('fullname')?.patchValue(response.results.fullname);
        this.userForm.get('email')?.patchValue(response.results.email);
        this.userForm.get('role')?.patchValue(response.results.role);
      }
    });
  }

  updateProfile(){
    this.userService.updateProfileByID(this.userId,this.userForm.value as { fullname:string,email:string,role:string }).subscribe((response:any) => {
      if (response.success) {
        this.router.navigate(['category']);
      }
    })
  }
}
