import { ActivatedRoute, Router } from '@angular/router';
import IJobState from 'src/app/IJobState.interface';
import IUserState from 'src/app/IUserState.interface';
import { DashboardService } from 'src/app/services/dashboard.service';
import { UserService } from 'src/app/services/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobService } from 'src/app/services/job.service';


@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Job Opportunity : {{ noOfJobs }}</h5>
              <br />
              <h5 class="card-title">Total Number of Users : {{ noOfUser }}</h5>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Number of Jobs By Category</h5>
              <div *ngFor="let category of noOfJobsByCategory">
                <b>{{ category._id }} :</b> {{ category.num_job }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br />

    <div class="container" *ngIf="jobs$ | async as jobs">
      <div class="card">
        <div class="card-header">Featured Jobs</div>
        <div class="card-body">
          <div *ngIf="jobs.length; else noJobs" class="row">
            <div
              class="card col-md-4"
              *ngFor="let job of jobs"
              style="margin-bottom: 10px;"
            >
              <div class="card-body row">
                <div class="col-md-8">
                  <b>Job Title:</b> {{ job.job_title }} <br />
                  <b>Job Category:</b> {{ job.category }} <br />
                </div>
                <div class="col-md-4">
                  <a
                    class="btn btn-success"
                    [routerLink]="['', 'jobs', 'details', job._id]"
                    style="font-size: 12px;"
                    >View Details
                  </a>
                  &nbsp;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <ng-template #noJobs>
        <p>There is currently no Jobs. Please add one</p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class DashboardComponent implements OnInit {
  DashboardService = inject(DashboardService);
  router = inject(Router);
  jobs$!: Observable<IJobState[]>;
  userService = inject(UserService);
  userState!: IUserState;
  empcheck: boolean = false;
  data: any;
  noOfJobsByCategory: any = [];
  noOfJobs: number = 0;
  noOfUser: Number = 0;

  constructor(route: ActivatedRoute, jobService: JobService) {
    jobService.getAllJobs().subscribe((res) => {
      this.noOfJobs = res.length;
    });
    this.DashboardService.totalUsers().subscribe((res) => {
      this.noOfUser = res.results;
    });
    this.DashboardService.noOfJobsByCategory().subscribe((res) => {
      this.noOfJobsByCategory = res.results;
    });
   
  }

  ngOnInit() {
    this.jobs$ = this.DashboardService.getFeaturedJobs();
  }

}
