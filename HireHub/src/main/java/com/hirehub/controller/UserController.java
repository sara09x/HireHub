
package com.hirehub.controller;

import com.hirehub.dto.LoginRequest;
import com.hirehub.dto.RegisterRequest;
import com.hirehub.main.User;
import com.hirehub.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user){

        return userService.saveUser(user);
    }

    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {

        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser
    ) {
        return userService.updateUser(id, updatedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        Map<String, Object> response =
                userService.loginUser(
                        request.getEmail(),
                        request.getPassword()
                );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody RegisterRequest request
    ) {

        try {

            System.out.println("========== REGISTER HIT ==========");

            System.out.println("Fullname: " + request.getFullname());

            System.out.println("Email: " + request.getEmail());

            System.out.println("Phone: " + request.getPhoneNumber());

            System.out.println("Role: " + request.getRole());

            User savedUser =
                    userService.registerUser(request);

            System.out.println("USER SAVED SUCCESSFULLY");

            return ResponseEntity.ok(savedUser);

        } catch (Exception e) {

            System.out.println("========== REGISTER ERROR ==========");

            e.printStackTrace();

            return ResponseEntity
                    .status(500)
                    .body(e.getMessage());
        }
    }
}