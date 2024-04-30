package broll.taskmaster.controller;

import broll.taskmaster.entity.*;
import broll.taskmaster.service.JwtService;
import broll.taskmaster.service.UserService;
import org.apache.coyote.BadRequestException;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import java.util.Optional;

@RestController
@Validated
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	// Register user
	@PostMapping("/auth/register")
	public ResponseEntity<SuccessStructure> saveUser(@RequestBody User user) {
		UserInfo userInfo = new UserInfo();
		User newuser = userService.saveUser(user);

		userInfo.setId(newuser.getId());
		userInfo.setName(newuser.getName());
		userInfo.setUsername(newuser.getUsername());
		userInfo.setEmail(newuser.getEmail());
		userInfo.setRole(newuser.getRole());

		SuccessStructure response = new SuccessStructure(userInfo);
		return ResponseEntity.status(201).body(response);
	}

	// Get users
	@GetMapping("/users")
	public ResponseEntity<SuccessStructure> getAllUsers() {
		SuccessStructure response = new SuccessStructure(userService.getAllUsers());
		return ResponseEntity.ok().body(response);
	}

	// View user details
	@GetMapping("/user")
	public ResponseEntity<SuccessStructure> getUserDetails() {
		SuccessStructure response = new SuccessStructure(userService.getUser());
		return ResponseEntity.ok().body(response);
	}

	// Update a user
	@PutMapping("/user")
	public ResponseEntity<SuccessStructure> updateUser(@RequestBody User user) {
		UserInfo userInfo = new UserInfo();
		User updatedUser = userService.updateUser(user);

		userInfo.setId(updatedUser.getId());
		userInfo.setName(updatedUser.getName());
		userInfo.setUsername(updatedUser.getUsername());
		userInfo.setEmail(updatedUser.getEmail());
		userInfo.setRole(updatedUser.getRole());

		SuccessStructure response = new SuccessStructure(userInfo,"User updated.");
		return ResponseEntity.ok().body(response);
	}

	// Login user
	@PostMapping("/auth/login")
	public ResponseEntity<SuccessStructure> authenticate(@RequestBody @NotNull AuthRequest authRequest) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		if (authentication.isAuthenticated()) {
			AuthResponse auth = new AuthResponse();
			UserInfo userInfo = new UserInfo();

			String token = jwtService.generateToken(authRequest.getUsername());
			Optional<User> tempUser = jwtService.extractUser(token);
			if(tempUser.isPresent()){
				userInfo.setId(tempUser.get().getId());
				userInfo.setName(tempUser.get().getName());
				userInfo.setUsername(tempUser.get().getUsername());
				userInfo.setEmail(tempUser.get().getEmail());
				userInfo.setRole(tempUser.get().getRole());
			}
			auth.setAccessToken(token);
			auth.setUser(userInfo);

			SuccessStructure response = new SuccessStructure(auth);
			return ResponseEntity.ok().body(response);
		} else {
			throw new UsernameNotFoundException("Invalid credentials");
		}
	}
}
