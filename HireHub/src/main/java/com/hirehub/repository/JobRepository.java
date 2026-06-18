package com.hirehub.repository;
import com.hirehub.entity.Job;
import com.hirehub.enums.Jobstatus;
import com.hirehub.main.User;
import com.hirehub.enums.JobType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;


public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByTitle(String title);
    List<Job> findByLocation(String location);
    List<Job> findByCompanyName(String companyName);
    List<Job> findByTitleContaining(String keyword);
    List<Job> findByJobType(JobType jobType);
    List<Job> findBySalaryGreaterThan(Double salary);
    List<Job> findByEmployer(User employer);
    List<Job> findByCompanyNameContaining(String companyName);
    List<Job> findByExperienceLevel(String experienceLevel);
    List<Job> findByStatus(Jobstatus status);
    List<Job> findByCreatedAt(LocalDateTime createdAt);
}
