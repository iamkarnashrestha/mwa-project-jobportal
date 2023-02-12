import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import IJobState from 'src/app/IJobState.interface';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-job-details',
  template: `
    <div class="container">
      <div class="card">
        <div class="card-header">Job Details</div>
        <div class="card-body" *ngIf="job$ | async as job">
          <h5 class="card-title">{{ job.job_title }}</h5>
          <p class="card-text">
            <b>Location:</b> {{ job.location.state }},{{ job.location.city }},{{
              job.location.street
            }},{{ job.location.zip }}
          </p>
          <p class="card-text"><b>Company Name: </b>{{ job.company }}</p>
          <p class="card-text"><b>Job Category:</b> {{ job.category }}</p>
          <p class="card-text"><b>Salary:</b> {{ job.salary }}</p>
          <p class="card-text"><b>No Of Vacancy:</b> {{ job.no_of_vacancy }}</p>
          <p class="card-text">
            <b>Posted By:</b> {{ job.user_details.fullname }}
          </p>
          <p class="card-text"><b>Description</b> {{ job.description }}</p>
          <div *ngIf="empcheck">
            <a
              *ngIf="!appliedCheck"
              (click)="applyJob(job._id)"
              class="btn btn-primary"
              >Apply Job
            </a>
          </div>
          <p *ngIf="appliedCheck" class="text-success">
            You have already applied this job, you can find similar other jobs
          </p>
        </div>
      </div>
      <br />

      <div *ngIf="!empcheck">
        <h4>List of Applicants:</h4>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sn.</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email Address</th>
              <th scope="col">Remarks</th>
            </tr>
          </thead>
          <tbody *ngIf="job$ | async as job">
            <tr
              *ngFor="
                let applicant of job.applicants;
                let indexOfelement = index
              "
            >
              <th scope="row">{{ indexOfelement + 1 }}</th>
              <td>{{ applicant.fullname }}</td>
              <td>{{ applicant.email }}</td>
              <td>
                <a
                  class="btn btn-success"
                  href="#"
                  >Reply</a
                >
              </td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [],
})
export class JobDetailsComponent {
  jobService = inject(JobService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  job$!: Observable<IJobState>;
  userService = inject(UserService);
  appliedCheck: boolean;
  empcheck: boolean = false;
  userId = this.userService._userState.value._id;
  job_id = this.route.snapshot.paramMap.get('id') as string;
  constructor() {
    this.appliedCheck = false;
    this.job$ = this.jobService
      .getJobById(this.job_id)
      .pipe(map((response) => response.results));

    this.jobService.appliedCheck(this.job_id).subscribe((response) => {
      console.log(response);
      if (response) {
        this.appliedCheck = true;
      }
    });
  }
  applyJob(job_id: string) {
    this.jobService.applyJob(job_id).subscribe((res) => {
      this.router.navigate(['jobs', 'applied', this.userId]);
    });
  }
  ngOnInit() {
    if (this.userService._userState.value.role === 'Employee') {
      this.empcheck = true;
    }
  }
}
