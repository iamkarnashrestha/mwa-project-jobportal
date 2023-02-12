import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import ICategory from 'src/app/ICategory.interface';
import IJobState from 'src/app/IJobState.interface';
import IUserState from 'src/app/IUserState.interface';
import { CategoryService } from 'src/app/services/category.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './jobList.component.html',
  styles: [],
})
export class ListComponent {
  jobService = inject(JobService);
  router = inject(Router);
  jobs$!: Observable<IJobState[]>;
  userService = inject(UserService);
  categoryService = inject(CategoryService);
  categories$!: Observable<ICategory[]>;
  userState!: IUserState;
  empcheck: boolean = false;
  title: string = '';
  data: any;
  selectedCategory = '';
  allJobListCheck:boolean=true
  constructor(route: ActivatedRoute) {
    if (this.userService._userState.value.role === 'Employee') {
      this.empcheck = true;
    }
    this.data = route.data;
    this.categories$ = this.jobService.getAllCategories();
  }
  ngOnInit() {
    if (this.data._value.type === 'posted') {
      this.jobs$ = this.jobService.getPostedJobs(
        this.userService._userState.value._id
       
      );
      this.title = 'Jobs You Posted';
      this.allJobListCheck=false
    } else if (this.data._value.type === 'applied') {
      this.jobs$ = this.jobService.getAppliedJobs(
        this.userService._userState.value._id
      );
      this.title = 'Jobs You Applied';
      this.allJobListCheck=false
    } else {
      this.jobs$ = this.jobService.getAllJobs();
      this.title = 'All Job List';

    }
    
  }

  deleteJob(id: string) {
    this.jobService.deleteJob(id).subscribe((response) => {
      this.router.navigate(['jobs']);
      this.ngOnInit();
    });
  }

  filterJobs() {
    if (this.form.valid) { 
      const category = this.form.get('category')?.value as string
      if(category==='all')
      {
        this.jobs$ = this.jobService.getAllJobs();
        this.ngOnInit()
      }
      else{
        this.jobs$=this.jobService.filterjobsByCategory(category)
      }
      
    }

  }

  form = inject(FormBuilder).nonNullable.group({
    category:['all',Validators.required]
  });
}
