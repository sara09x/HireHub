package com.hirehub.controller;
import com.hirehub.entity.Job;
import com.hirehub.service.JobService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/jobs")
public class JobController {
    private final JobService jobService;
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }
    //crud methods
    //1-Create
    @PostMapping
    public ResponseEntity<?> createJob(
            @RequestBody Job job
    ) {

        try {

            System.out.println("========== JOB CREATE ==========");

            System.out.println("Title: " + job.getTitle());

            System.out.println("Company: " + job.getCompanyName());

            System.out.println("Location: " + job.getLocation());

            System.out.println("Experience: " + job.getExperienceLevel());

            System.out.println("Job Type: " + job.getJobType());

            System.out.println("Status: " + job.getStatus());

            System.out.println("Salary: " + job.getSalary());

            Job savedJob =
                    jobService.createJob(job);

            System.out.println("JOB SAVED SUCCESSFULLY");

            return ResponseEntity.ok(savedJob);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    @PutMapping("/{id}/approve")
    public Job approveJob(@PathVariable Long id) {
        return jobService.approveJob(id);
    }

    // Get All Approved Jobs
    @GetMapping
    public List<Job> getAllApprovedJobs() {

        return jobService.getAllApprovedJobs();
    }

    // Get Job By Id
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {

        return jobService.getJobById(id);
    }

    // Update Job
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody Job updatedJob) {

        return jobService.updateJob(id, updatedJob);
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);
    }
}



