import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IJobState from '../IJobState.interface';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getFeaturedJobs() {
    return this.http
      .get<{ success: boolean; results: IJobState[] }>(
        environment.SERVER + '/api/jobs/featured'
      )

      .pipe(map((response) => response.results));
  }

  totalUsers() {
    return this.http.get<{ success: boolean; results: Number }>(
      environment.SERVER + '/api/users/totalUsers'
    );
  }

  noOfJobsByCategory() {
    return this.http.get<{ success: boolean; results: any }>(
      environment.SERVER + '/api/jobs/noOfJobs'
    );
  }
}
