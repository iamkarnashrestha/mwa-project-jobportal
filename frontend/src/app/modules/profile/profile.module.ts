import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UpdatePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:ProfileComponent},
      {path:'updateProfile/:id',component:UpdatePageComponent},
    ])
  ]
})
export class ProfileModule { }
