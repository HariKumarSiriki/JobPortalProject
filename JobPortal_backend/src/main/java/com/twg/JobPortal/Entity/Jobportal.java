package com.twg.JobPortal.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Jobportal {
	
	
	public Jobportal()
	{
		
	}

	public Jobportal(String applicant_name, String location, String company) {
		super();
		this.applicant_name = applicant_name;
		this.location = location;
		this.company = company;
	}





	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int job_id;
	@Column
	private String applicant_name;
	@Column
	private String location;
	@Column
	private String company;
	
	
	public int getJob_id() {
		return job_id;
	}
	public void setJob_id(int job_id) {
		this.job_id = job_id;
	}
	public String getApplicant_name() {
		return applicant_name;
	}
	public void setApplicant_name(String applicant_name) {
		this.applicant_name = applicant_name;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	


	@Override
	public String toString() {
		return "Jobportal [job_id=" + job_id + ", applicant_name=" + applicant_name + ", location=" + location
				+ ", company=" + company + "]";
	}


	public String getCompany() {
		return company;
	}


	public void setCompany(String company) {
		this.company = company;
	}

}
