package com.hirehub.factory;

import com.hirehub.enums.Role;
import com.hirehub.main.User;
import org.springframework.stereotype.Component;

@Component
public class NormalUserFactory implements UserFactory {

    @Override
    public User createUser(
            String fullName,
            String email,
            String password,
            String phoneNumber
    ) {

        return User.builder()
                .fullName(fullName)
                .email(email)
                .password(password)
                .phoneNumber(phoneNumber)
                .role(Role.USER)
                .build();
    }
}