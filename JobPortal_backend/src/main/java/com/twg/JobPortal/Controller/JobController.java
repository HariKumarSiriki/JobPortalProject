package com.twg.JobPortal.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.twg.JobPortal.Entity.Jobportal;
import com.twg.JobPortal.Repository.JobRepository;

//@CrossOrigin(origins = "http://localhost:4200")// for specific local host
@CrossOrigin(origins = "*") //this is global local hosts
@RestController
public class JobController {

	@Autowired
	 private JobRepository jobRepository;
	
	@GetMapping("/applicants")
	public List<Jobportal> getAllApplicants()
	{
		return jobRepository.findAll();
		
	}
	
	@GetMapping("/applicant/{id}")
	public Jobportal getById(@PathVariable int id)
	{
		return jobRepository.findById(id).get();
		
	}
	@PostMapping("/applicant/save")
	public Jobportal create(@RequestBody Jobportal jobportal)
	{
		return jobRepository.save(jobportal);
	}
	
	
	@PutMapping("/applicant/update/{id}")
	public Jobportal update(@PathVariable int id, @RequestBody Jobportal updatedApplicant) {
	    Jobportal applicant = jobRepository.findById(id).get();
	    applicant.setApplicant_name(updatedApplicant.getApplicant_name());
	    applicant.setCompany(updatedApplicant.getCompany());
	    applicant.setLocation(updatedApplicant.getLocation());

	    return jobRepository.save(applicant);
	}
	
	@DeleteMapping("/applicant/delete/{id}")
	public void delete(@PathVariable int id)
	{
		jobRepository.deleteById(id);
	}

//	@GetMapping("/search/{company}")
//	public Jobportal searchByCompany(@PathVariable String company)
//	{
//		return jobRepository.searchByCompany(company);
//	}
//	
//	@GetMapping("/get/{location}")
//	public Jobportal searchByLocation(@PathVariable String location)
//	{
//		return jobRepository.searchByLocation(location);
//	}
	
	@GetMapping("/search/{company}")
	public List<Jobportal> searchByCompany(@PathVariable String company) {
	    return jobRepository.findByCompany(company);
	}

	@GetMapping("/get/{location}")
	public List<Jobportal> searchByLocation(@PathVariable String location) {
	    return jobRepository.findByLocation(location);
	}

	
	
	
	
	
	public JobRepository getJobRepository() {
		return jobRepository;
	}

	public void setJobRepository(JobRepository jobRepository) {
		this.jobRepository = jobRepository;
	}
	
	
}
