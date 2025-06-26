package com.twg.JobPortal.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.twg.JobPortal.Entity.Jobportal;

public interface JobRepository extends JpaRepository<Jobportal, Integer> {
	
	public  Jobportal searchByCompany(String company);
	public Jobportal  searchByLocation(String location);
	
	List<Jobportal> findByCompany(String company);
	List<Jobportal> findByLocation(String location);

}
