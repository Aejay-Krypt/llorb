package broll.taskmaster.service;

import broll.taskmaster.entity.*;
import broll.taskmaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

/**
* Service class for managing Task entities.
*/
@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);

		return user.map(AuthUserService::new)
				.orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
	}

	// Create user
	public User saveUser(User user) {
		String encodedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encodedPassword);
		return userRepository.save(user);
	}

	// Get User Details
	public UserInfo getUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Optional<User> user = userRepository.findByUsername(authentication.getName());
		UserInfo userInfo = new UserInfo();

		if(user.isPresent()){
			userInfo.setId(user.get().getId());
			userInfo.setName(user.get().getName());
			userInfo.setUsername(user.get().getUsername());
			userInfo.setEmail(user.get().getEmail());
			userInfo.setRole(user.get().getRole());
		}
		return userInfo;
	}

	// Update User
	public User updateUser(User updatedUser) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Optional<User> auth = userRepository.findByUsername(authentication.getName());

		if (auth.isPresent()) {
			User user = auth.get();
			user.setName(updatedUser.getName());
			user.setEmail(updatedUser.getEmail());
			user.setUsername(updatedUser.getUsername());
			user.setRole(EntityType.RoleType.valueOf(updatedUser.getRole()));
			return userRepository.save(user);
		} else {
			throw new RuntimeException("User not found");
		}
	}

	// List users
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
}
