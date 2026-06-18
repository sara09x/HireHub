package com.hirehub.main;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.hirehub.enums.Role;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String fullName;

    private String email;

    private String password;

    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String projects;

    @Column(columnDefinition = "TEXT")
    private String experience;

    private String university;

    private String gpa;

    @Enumerated(EnumType.STRING)
    private Role role;



}

