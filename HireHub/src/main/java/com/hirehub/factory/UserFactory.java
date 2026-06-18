package com.hirehub.factory;

import com.hirehub.main.User;
public interface UserFactory {
    User createUser(
            String fullName,
            String email,
            String password,
            String phoneNumber
    );

}
