package com.hirehub.repository;

import com.hirehub.entity.Application;
import com.hirehub.entity.Job;
import com.hirehub.main.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user);

    List<Application> findByJob(Job job);

    boolean existsByUserAndJob(User user, Job job);


}
