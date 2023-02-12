import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import IJobState from '../IJobState.interface';
import { map } from 'rxjs';
import ICategory from '../ICategory.interface';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getAllCategories() {
    return this.http
      .get<{ success: boolean; results: any }>(
        environment.SERVER + '/api/category/'
      )
      .pipe(map((response) => response.results));
  }

  getAllJobs() {
    return this.http
      .get<{ success: boolean; results: IJobState[] }>(
        environment.SERVER + '/api/jobs/'
      )
      .pipe(map((response) => response.results));
  }

  getJobById(id: string) {
    return this.http.get<{ success: boolean; results: any }>(
      environment.SERVER + '/api/jobs/' + id
    );
  }

  addJob(job: any) {
    return this.http.post(environment.SERVER + '/api/jobs/', job);
  }
  updateJob(job: any, id: string) {
    return this.http.put(environment.SERVER + '/api/jobs/' + id, job);
  }

  deleteJob(job_id: string) {
    return this.http.delete(environment.SERVER + '/api/jobs/' + job_id);
  }

  getFeaturedJobs() {
    return this.http
      .get<{ success: boolean; results: IJobState[] }>(
        environment.SERVER + '/api/jobs/featuredJobs'
      )
      .pipe(map((response) => response.results));
  }

  getAppliedJobs(user_id: string) {
    return this.http
      .get<{ success: boolean; results: any }>(
        environment.SERVER + '/api/jobs/appliedJobs/' + user_id
      )
      .pipe(map((response) => response.results));
  }
  getPostedJobs(user_id: string) {
    return this.http
      .get<{ success: boolean; results: IJobState[] }>(
        environment.SERVER + '/api/jobs/postedJobs/' + user_id
      )
      .pipe(map((response) => response.results));
  }

  applyJob(job_id: string) {
    return this.http.put(
      environment.SERVER + '/api/jobs/apply/' + job_id,
      job_id
    );
  }
  appliedCheck(job_id: string) {
    return this.http
      .get<{ success: boolean; results: any }>(
        environment.SERVER + '/api/jobs/appliedCheck/' + job_id
      )
      .pipe(map((response) => response.results));
  }
  filterjobsByCategory(category: string) {
    return this.http
      .get<{ success: boolean; results: IJobState[] }>(
        environment.SERVER + '/api/jobs/filterByCategory/' + category
      )
      .pipe(map((response) => response.results));
  }
  
}
