package com.hirehub;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hirehub.enums.Role;
import com.hirehub.main.User;
import com.hirehub.repository.UserRepository;

@SpringBootApplication
public class HireHubApplication {

	public static void main(String[] args) {

		SpringApplication.run(HireHubApplication.class, args);
	}

	@Bean
	CommandLineRunner createAdmin(
			UserRepository userRepository,
			PasswordEncoder passwordEncoder
	) {

		return args -> {

			if (
				userRepository.findByEmail(
					"admin@hirehub.com"
				) == null
			) {

				User admin = new User();

				admin.setFullName("Admin");

				admin.setEmail("admin@hirehub.com");

				admin.setPhoneNumber("0000000000");

				admin.setPassword(
						passwordEncoder.encode("admin123")
				);

				admin.setRole(Role.ADMIN);

				userRepository.save(admin);

				System.out.println(
						"ADMIN CREATED"
				);
			}
		};
	}

}
