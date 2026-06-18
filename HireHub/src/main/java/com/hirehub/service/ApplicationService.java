
package com.hirehub.service;

import com.hirehub.entity.Application;
import com.hirehub.entity.Job;
import com.hirehub.main.User;
import com.hirehub.repository.ApplicationRepository;
import com.hirehub.repository.JobRepository;
import com.hirehub.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final UserRepository userRepository;

    private final JobRepository jobRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            JobRepository jobRepository
    ) {

        this.applicationRepository = applicationRepository;

        this.userRepository = userRepository;

        this.jobRepository = jobRepository;
    }

    public Application applyToJob(
            long userId,
            long jobId
    ) {

        User user = userRepository.findById(userId)
                .orElse(null);

        Job job = jobRepository.findById(jobId)
                .orElse(null);

        if(user == null || job == null) {

            return null;
        }

        Application application = new Application();

        application.setUser(user);

        application.setJob(job);

        return applicationRepository.save(application);
    }
}