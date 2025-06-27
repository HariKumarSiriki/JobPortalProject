import { Component, OnInit } from '@angular/core';
import { Jobportal } from './job.model';
import { JobService } from './job.service';

@Component({
  selector: 'app-jobapp',
  templateUrl: './jobapp.component.html',
  styleUrls: ['./jobapp.component.css']
})
export class JobappComponent implements OnInit {
  applicants: Jobportal[] = [];
  allApplicants: Jobportal[] = [];
  allCompanies: string[] = [];
  allLocations: string[] = [];
  allIds: number[] = [];

  newApplicant: Jobportal = { job_id: 0, applicant_name: '', company: '', location: '' };
  editing = false;
  showAll = false;

  // Search fields & result
  searchId: number = 0;
  searchCompany: string = '';
  searchLocation: string = '';
  searchResults: Jobportal[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadAllApplicants();
  }

  loadAllApplicants() {
    this.jobService.getAll().subscribe(data => {
      this.allApplicants = data;
      this.allCompanies = [...new Set(data.map(a => a.company))];
      this.allLocations = [...new Set(data.map(a => a.location))];
      this.allIds = data.map(a => a.job_id);
    });
  }

  refreshPage() {
    window.location.reload();
  }

  getAll() {
    this.jobService.getAll().subscribe(data => {
      this.applicants = data;
      this.showAll = true;
      this.searchResults = []; // clear previous search results
    });
  }

  save() {
    if (this.editing) {
      this.jobService.update(this.newApplicant.job_id, this.newApplicant).subscribe(() => {
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
    this.newApplicant = { job_id: 0, applicant_name: '', company: '', location: '' };
    this.editing = false;
  }

  findById() {
    if (!this.searchId) return;
    this.jobService.getById(this.searchId).subscribe(result => {
      this.searchResults = result ? [result] : [];
    });
  }

  findByCompany() {
    if (!this.searchCompany) return;
    this.jobService.findByCompany(this.searchCompany).subscribe(data => {
      this.searchResults = Array.isArray(data) ? data : data ? [data] : [];
    });
  }

  findByLocation() {
    if (!this.searchLocation) return;
    this.jobService.searchByLocation(this.searchLocation).subscribe(data => {
      this.searchResults = Array.isArray(data) ? data : data ? [data] : [];
    });
  }
}
