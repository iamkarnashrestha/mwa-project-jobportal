import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/jobList.component';
import { RouterModule } from '@angular/router';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';




@NgModule({
  declarations: [
    ListComponent,
    JobDetailsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:ListComponent},
      {path:'details/:id',component:JobDetailsComponent},
      {path:'add',component:AddComponent},
      {path:'update/:id',component:AddComponent},
      {path:'posted/:id',component:ListComponent,data:{title:'Posted Jobs',type:'posted'}},
      {path:'applied/:id',component:ListComponent,data:{title:'Applied Jobs',type:'applied'}},


    ])
  ]
})
export class JobsModule { }
