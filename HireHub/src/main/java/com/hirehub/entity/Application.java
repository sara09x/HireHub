package com.hirehub.entity;
import  com.hirehub.main.User;
import com.hirehub.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
@Entity
@Table(name = "applications")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Relation many to one between user and job
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
   //applied jobs
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @Enumerated(EnumType.STRING)
    private ApplicationStatus status;

    private String cvUrl;
    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    private LocalDateTime appliedAt;
    @PrePersist
    protected void onApply(){
        appliedAt = LocalDateTime.now();
    }


}
