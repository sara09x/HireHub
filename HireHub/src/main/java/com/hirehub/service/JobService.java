package com.hirehub.service;
import org.springframework.stereotype.Service;
import com.hirehub.repository.JobRepository;
import com.hirehub.entity.Job;
import com.hirehub.enums.Jobstatus;
import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }
    public Job createJob(Job job) {

        job.setStatus(Jobstatus.PENDING);

        return jobRepository.save(job);
    }
    //method for job approval
    public Job approveJob(Long id) {

        Job job = jobRepository.findById(id)
                .orElse(null);

        if(job != null) {

            job.setStatus(Jobstatus.APPROVED);

            return jobRepository.save(job);
        }

        return null;
    }
    public List<Job> getAllApprovedJobs() {

        return jobRepository.findByStatus(
                Jobstatus.APPROVED
        );
    }
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }
    public void deleteJob(long id) {
        jobRepository.deleteById(id);
    }
    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = jobRepository.findById(id).orElse(null);
        if (existingJob != null) {
            existingJob.setTitle(updatedJob.getTitle());
            existingJob.setDescription(updatedJob.getDescription());
            existingJob.setExperienceLevel(updatedJob.getExperienceLevel());
            existingJob.setSalary(updatedJob.getSalary());
            existingJob.setLocation(updatedJob.getLocation());
            existingJob.setCompanyName(updatedJob.getCompanyName());
            existingJob.setJobType(updatedJob.getJobType());

            return jobRepository.save(existingJob);

        }
        return null;
    }
}
