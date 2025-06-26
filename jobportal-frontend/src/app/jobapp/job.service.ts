import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jobportal } from './job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Jobportal[]> {
    return this.http.get<Jobportal[]>(`${this.baseUrl}/applicants`);
  }
  

  create(applicant: Jobportal): Observable<Jobportal> {
    return this.http.post<Jobportal>(`${this.baseUrl}/applicant/save`, applicant);
  }

  update(id: number, applicant: Jobportal): Observable<Jobportal> {
    return this.http.put<Jobportal>(`${this.baseUrl}/applicant/update/${id}`, applicant);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/applicant/delete/${id}`);
  }

  // Get by ID
getById(id: number): Observable<Jobportal> {
  return this.http.get<Jobportal>(`${this.baseUrl}/applicant/${id}`);
}

// Search by company
searchByCompany(company: string): Observable<Jobportal> {
  return this.http.get<Jobportal>(`${this.baseUrl}/search/${company}`);
}

// Search by location
searchByLocation(location: string): Observable<Jobportal> {
  return this.http.get<Jobportal>(`${this.baseUrl}/get/${location}`);
}




}
