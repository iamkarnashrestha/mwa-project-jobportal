import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './list-category/list-category.component';
import { RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    ListCategoryComponent,
    AddComponent,
    UpdateComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path:'',component:ListCategoryComponent},
      {path:'add',component:AddComponent},
      {path:'update/:id',component:UpdateComponent}



    ])]
})
export class CategoryModule { }
