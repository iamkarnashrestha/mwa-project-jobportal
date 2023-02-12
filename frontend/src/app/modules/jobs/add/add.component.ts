import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import ICategory from 'src/app/ICategory.interface';
import IJobState from 'src/app/IJobState.interface';
import IUserState from 'src/app/IUserState.interface';
import { CategoryService } from 'src/app/services/category.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add',
  template: `
    <div class="container">
 
      <form [formGroup]="addJobForm" (ngSubmit)="addJob()">
        <div class="row">
          <div class="form-group col-md-3">
            <label for="inputJobTitle4">Job Title</label>
            <input
              type="text"
              class="form-control"
              id="inputJobTitle4"
              placeholder="Job Title"
              formControlName="job_title"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="inputPassword4">Category</label>
            <select
              name=""
              id=""
              class="form-control"
              formControlName="category"
              *ngIf="categories$ | async as categories"
              [(ngModel)]="selectedCategory"
            >
              <option *ngFor="let category of categories" [value]="category.title" [selected]="category.title===selectedCategory">
                {{ category.title }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-3">
            <label for="inputCompany">Company Name</label>
            <input
              type="text"
              class="form-control"
              id="inputCompany"
              formControlName="company"
            />
          </div>
          <div class="form-group col-md-3">
            <label for="inputCity">Salary</label>
            <input
              type="number"
              class="form-control"
              id="inputCity"
              formControlName="salary"
            />
          </div>
        </div>

        <fieldset>
          <div class="row">
            <div class="form-group col-md-3">
              <label for="inputState">State</label>
              <select
                id="inputState"
                class="form-control"
                formControlName="state"
              >
                <option selected>Choose...</option>

                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div class="form-group col-md-3">
              <label for="inputCity">City</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                formControlName="city"
              />
            </div>
            <div class="form-group col-md-3">
              <label for="inputAddress2">Street</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
                placeholder=""
                formControlName="street"
              />
            </div>

            <div class="form-group col-md-3">
              <label for="inputZip">Zip</label>
              <input
                type="text"
                class="form-control"
                id="inputZip"
                formControlName="zip"
              />
            </div>
          </div>
        </fieldset>

        <div class="row">

        <div class="form-group col-md-3">
              <label for="inputCity">No of Vacancy</label>
              <input
                type="text"
                class="form-control"
                id="inputCity"
                formControlName="no_of_vacancy"
              />
            </div>
          <div class="form-group col-md-3">
            <div class="form-check " style="margin-top:15px">
              <label class="form-check-label" for="gridCheck"> Featured </label>
              <input
                class="form-check-input"
                type="checkbox"
                id="gridCheck"
                formControlName="featured"
                [(ngModel)]="featured" [checked]="featured === true" >
              
            </div>
          </div>
          
        </div>

        <div class="form-group">
          <label class="form-check-label"> Description </label>
          <textarea class="form-control" formControlName="description" rows="15">
          </textarea>
        </div>

        <div>
          <button type="submit" class="btn btn-primary" *ngIf="!jobId">Add Job</button>
          <button type="submit" class="btn btn-primary" *ngIf="jobId">Update Job</button>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class AddComponent {
  jobService = inject(JobService);
  categoryService=inject(CategoryService)
  categories$!: Observable<ICategory[]>;
  router = inject(Router);
  userService = inject(UserService);
  userState!: IUserState;
  jobId:string=''
  title:string=''
  selectedCategory:string=''
  featured:boolean=false
  route = inject(ActivatedRoute);
  

  constructor() {
    this.categories$ = this.jobService.getAllCategories();
    this.userService.getUserState$.subscribe((response) => {
      this.userState = response;
    });
    this.jobId=this.route.snapshot.paramMap.get('id') as string
    if(this.jobId!=null){
      this.jobService.getJobById(this.jobId)
      .subscribe((response) => {
    
        if(response.success){

          this.addJobForm.get('job_title')?.patchValue(response.results.job_title)
          this.addJobForm.get('company')?.patchValue(response.results.company as string)
          this.addJobForm.get('state')?.patchValue(response.results.location.state as string)
          this.addJobForm.get('city')?.patchValue(response.results.location.city as string)
          this.addJobForm.get('street')?.patchValue(response.results.location.street as string)
          this.addJobForm.get('zip')?.patchValue(response.results.location.zip as string)
         this.addJobForm.get('featured')?.patchValue(response.results.featured as unknown as string)
          this.addJobForm.get('description')?.patchValue(response.results.description as string)
          this.selectedCategory=response.results.category
          this.featured=response.results.featured
          this.addJobForm.get('no_of_vacancy')?.patchValue(response.results.no_of_vacancy as string)
          this.addJobForm.get('salary')?.patchValue((response.results.salary as unknown)as string)

          
          
        }
      });


    }
   
  }
 
  addJobForm = inject(FormBuilder).nonNullable.group({
    job_title: ['', Validators.required],
    salary: ['', Validators.required],
    description: ['', Validators.required],
    category: [ Validators.required],
    company: ['', Validators.required],
    state: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    zip: ['', Validators.required],
    featured: ['', Validators.required],
    no_of_vacancy:['',Validators.required]
  });

  addJob() {
    if (this.addJobForm.valid) { 
      const job = {
        job_title: this.addJobForm.get('job_title')?.value,
        salary: this.addJobForm.get('salary')?.value,
        description: this.addJobForm.get('description')?.value,
        company: this.addJobForm.get('company')?.value,
        featured: this.addJobForm.get('featured')?.value,
        category:this.addJobForm.get('category')?.value,
        no_of_vacancy:this.addJobForm.get('no_of_vacancy')?.value,
        location: {
          state: this.addJobForm.get('state')?.value,
          city: this.addJobForm.get('city')?.value,
          street: this.addJobForm.get('street')?.value,
          zip: this.addJobForm.get('zip')?.value,
        }, 
   
      };
      console.log(job)
      if(this.jobId!=null)
      {console.log(this.jobId)
        this.jobService.updateJob(job,this.jobId).subscribe((response) => {
          this.router.navigate(['jobs']);
        });
      }
      else{
        this.jobService.addJob(job).subscribe((response) => {
          this.router.navigate(['jobs']);
        });
      }
      
    }
  }

}
