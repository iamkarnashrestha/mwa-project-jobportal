import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-category',
  template: `
   <div class="container">
    <div style="    display: flex;
    justify-content: space-between;">

  <h4>Available Jobs</h4>
    <a *ngIf="!empcheck" class="btn btn-primary" [routerLink]="['add']">Add Category</a>
    </div>

  <div class="list-group">
    <div class="list-group-item" *ngFor="let item of items">
      <h4 class="list-group-item-heading">{{item.title}}</h4>

<!--
      <a class="btn btn-success" [routerLink]="['','jobs','details',job._id]">Details</a> &nbsp;
          <a  class="btn btn-success" [routerLink]="['','jobs','update',job._id]">Update Job </a>&nbsp;
          <button  class="btn btn-danger" (click)="deleteJob(job._id)">Delete Job </button> -->


      <button type="submit" class="btn btn-success" (click)="goToDetails(item._id)">Details</button>&nbsp;
      <a *ngIf="!empcheck" class="btn btn-success" [routerLink]="['','category','update',item._id]" routerLinkActive="router-link-active" >Update</a>&nbsp;

      <button *ngIf="!empcheck" class="btn btn-danger" (click)="removeCategory(item._id)">Remove</button>
</div>
</div>
  `,
  styles: [
  ]
})
export class ListCategoryComponent {
  userService=inject(UserService)
  router = inject(Router);
  categoryService = inject(CategoryService);
  empcheck:boolean=false

  items:any = []

  ngOnInit(){

    if(this.userService._userState.value.role==="Employee"){
      this.empcheck=true
    }

    this.categoryService.getCategories().subscribe((response) => {
      // console.log(response);
      if(response.success){
        this.items = response.results;
      }
    });
  }

  goToDetails(id: string){
    this.router.navigate(["/details",id]);

  }

  updateCategory(id:string){
    this.router.navigate(["/updateCategory",id])
  }
  removeCategory(id:string){

    this.categoryService.removeCategory(id).subscribe((response)=>{

        this.router.navigate(['category']);
        this.ngOnInit()

    })

  }

}
