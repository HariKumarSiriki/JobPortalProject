import { Component, OnInit } from '@angular/core';
import { Jobportal } from './job.model';
import { JobService } from './job.service';





@Component({
  selector: 'app-jobapp',
  templateUrl: './jobapp.component.html'
})
export class JobappComponent implements OnInit {
  applicants: Jobportal[] = [];
  newApplicant: Jobportal = {  job_id: 0, applicant_name: '', company: '', location: '' };
  editing = false;

  constructor(private jobService: JobService) {}

ngOnInit(): void {
  this.loadAllApplicants(); // fetch for dropdown
}

allApplicants: Jobportal[] = [];

loadAllApplicants() {
  this.jobService.getAll().subscribe(data => {
    this.allApplicants = data;
    // Extract unique companies and locations
    this.allCompanies = [...new Set(data.map(a => a.company))];
    this.allLocations = [...new Set(data.map(a => a.location))];
  });
}

allCompanies: string[] = [];
allLocations: string[] = [];

refreshPage() {
  window.location.reload();
}



getAll() {
  this.jobService.getAll().subscribe(data => {
    console.log('Received applicants:', data); // 🔍 log the response
    this.applicants = data;
     this.showAll = true;
     this.searchResult = null; // optional: clear search
  });
}

allIds: number[] = [];

loadAllIds() {
  this.jobService.getAll().subscribe(data => {
    this.allIds = data.map(a => a.job_id);
  });
}



  save() {
    if (this.editing) {
      this.jobService.update(this.newApplicant. job_id, this.newApplicant).subscribe(() => {
        this.getAll();
        this.resetForm();
      });
    } else {
      this.jobService.create(this.newApplicant).subscribe(() => {
        this.getAll();
        this.resetForm();
      });
    }
  }

  edit(applicant: Jobportal) {
    this.newApplicant = { ...applicant };
    this.editing = true;
  }

 delete(job_id: number) {
  this.jobService.delete(job_id).subscribe(() => this.getAll());
}

  resetForm() {
    this.newApplicant = {  job_id: 0, applicant_name: '', company: '', location: '' };
    this.editing = false;
  }
  searchId: number = 0;
searchCompany: string = '';
searchLocation: string = '';
searchResult: Jobportal | null = null;


  findById() {
  if (!this.searchId) return;
  this.jobService.getById(this.searchId).subscribe(result => {
    this.searchResult = result;
  });
}

findByCompany() {
  if (!this.searchCompany) return;
  this.jobService.searchByCompany(this.searchCompany).subscribe(result => {
    this.searchResult = result;
  });
}

findByLocation() {
  if (!this.searchLocation) return;
  this.jobService.searchByLocation(this.searchLocation).subscribe(result => {
    this.searchResult = result;
  });
}
showAll: boolean = false;






}
