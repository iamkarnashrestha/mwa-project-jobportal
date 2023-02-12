import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-update',
  template: `
    <div class ="container">
   <form [formGroup]="categoryForm" >
  <div class="form-group">
    <label for="exampleInputEmail1">Update Category</label>
    <input type="input" class="form-control" formControlName="title">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <textarea type="input" class="form-control" formControlName="description"> </textarea>
  </div>
  <button type="submit" class="btn btn-primary"(click)="updateCategory()">Update</button>
</form>
   </div>
  `,
  styles: [
  ]
})
export class UpdateComponent {
  router = inject(Router);
  categoryService = inject(CategoryService);
  route = inject(ActivatedRoute);
  categoryId=this.route.snapshot.paramMap.get('id') as string
  item:any = {}


  ngOnInit(){
    this.categoryService.getCataegoryById(this.categoryId)
    .subscribe((response) => {
      // console.log(response);
      if(response.success){
        this.categoryForm.get('title')?.patchValue(response.results.title)
        this.categoryForm.get('description')?.patchValue(response.results.description)
      }
    });

  }

  categoryForm=inject(FormBuilder).nonNullable.group({
    title:['',Validators.required],
description:['',Validators.required],
  });

  updateCategory() {
    this.categoryService
      .updateCategory(this.categoryForm.value as { title:string,description:string  },this.categoryId)
      .subscribe((response:any) => {
        if (response.success) {
          this.router.navigate(['category']);
        }
      });
  }
}

