package com.hirehub.entity;
import com.hirehub.main.User;
import jakarta.persistence.*;
import lombok.*;
import com.hirehub.enums.JobType;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import com.hirehub.enums.Jobstatus;
@Entity
@Table(name="jobs")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    @NotBlank
    private String title;
    @Positive
    private Double salary;
    @NotBlank
    private String location;
    @Column(columnDefinition = "TEXT")
    private String description;
    @NotBlank
    private String companyName;
    @NotBlank
    private String experienceLevel;
    @Enumerated(EnumType.STRING)
    private JobType jobType;
    @Enumerated(EnumType.STRING)
    private Jobstatus status;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    @ManyToOne
    @JoinColumn(name="employer_id")
    private User employer;


}

