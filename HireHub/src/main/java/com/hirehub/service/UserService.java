package com.hirehub.service;

import com.hirehub.dto.RegisterRequest;
import com.hirehub.enums.Role;
import com.hirehub.factory.NormalUserFactory;
import com.hirehub.main.User;
import com.hirehub.repository.UserRepository;
import com.hirehub.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final NormalUserFactory normalUserFactory;
    
    @Autowired
    private JwtUtil jwtUtil;

    public UserService(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder,
            NormalUserFactory normalUserFactory
    ) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.normalUserFactory = normalUserFactory;
    }
    //CRUD METHODS
    // Create User
    public User saveUser(User user) {

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    // Get All Users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // Get User By ID
    public User getUserById(Long id) {

        return userRepository.findById(id).orElse(null);
    }

    // Delete User
    public void deleteUser(Long id) {

        userRepository.deleteById(id);
    }

    // Update User
    public User updateUser(long id, User updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

         existingUser.setFullName(updatedUser.getFullName());
         existingUser.setEmail(updatedUser.getEmail());
         existingUser.setPhoneNumber(updatedUser.getPhoneNumber());

         existingUser.setUniversity(updatedUser.getUniversity());
         existingUser.setGpa(updatedUser.getGpa());
         existingUser.setSkills(updatedUser.getSkills());
         existingUser.setProjects(updatedUser.getProjects());
         existingUser.setExperience(updatedUser.getExperience());

         existingUser.setRole(updatedUser.getRole());

        // password optional update
         if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
             existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    // Find User By Email
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    // Login
    public Map<String, Object> loginUser(
        String email,
        String password
    ) {

        User user = userRepository.findByEmail(email);

        if (
                user == null ||
                !passwordEncoder.matches(
                        password,
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        // Generate JWT token after successful login
        String token = jwtUtil.generateToken(user.getEmail());

        // Create response object
        Map<String, Object> response = new HashMap<>();

        response.put("token", token);
        response.put("user", user);

        return response;
    }

    // Register
    public User registerUser(RegisterRequest request) {

        // check email exists
        if (
                userRepository.existsByEmail(
                        request.getEmail()
                )
        ) {

            throw new RuntimeException(
                    "Email already exists"
            );
        }

        // Factory Method Pattern
        User user = normalUserFactory.createUser(

                request.getFullname(),

                request.getEmail(),

                passwordEncoder.encode(
                        request.getPassword()
                ),

                request.getPhoneNumber()
        );
        try {

            user.setRole(request.getRole());

        } catch (Exception e) {

            user.setRole(Role.USER);
        }
        return userRepository.save(user);
    }

}