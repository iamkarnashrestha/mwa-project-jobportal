import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  template: `
   <div class ="container">
   <form [formGroup]="categoryForm" >
  <div class="form-group">
    <label for="exampleInputEmail1">New Category</label>
    <input type="input" class="form-control"  placeholder="Enter New Category" formControlName="title">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <textarea type="input" class="form-control" formControlName="description"> </textarea>
  </div>
  <button type="submit" class="btn btn-primary"(click)="addCategory()">Add</button>
</form>
   </div>
  `,
  styles: [
  ]
})
export class AddComponent {

  router = inject(Router);
  categoryService = inject(CategoryService);
  ngOnInit(){
    this.categoryService.getCategories().subscribe((response) => {
      // console.log(response);
      if(response.success){

      }
    });
  }

  categoryForm=inject(FormBuilder).nonNullable.group({
    title:['',Validators.required],
    description:['',Validators.required],

  });

  addCategory() {
    this.categoryService
      .addCategory(this.categoryForm.value as { title:string,description:string })
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['category']);
        }
      });
  }
}
