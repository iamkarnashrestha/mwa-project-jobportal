import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-details',
  template: `




<div class="container">
<div class="card">
  <div class="card-header">
  {{category.title}}
  </div>
  <div class="card-body">
    <p class="card-text">

      Description: {{category.description}}

  </div>
</div>
</div>




  `,
  styles: [
  ]
})
export class CategoryDetailsComponent {
  route = inject(ActivatedRoute);
  categoryService=inject(CategoryService)
category:any={}
categoryId=this.route.snapshot.paramMap.get('id')
constructor()
{

this.categoryService.getCataegoryById(this.categoryId as string).subscribe((response)=>{
  this.category=response.results
})

}
}
