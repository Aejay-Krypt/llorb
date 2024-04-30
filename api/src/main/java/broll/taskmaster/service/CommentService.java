package broll.taskmaster.service;

import broll.taskmaster.entity.Comment;
import broll.taskmaster.entity.User;
import broll.taskmaster.repository.CommentRepository;
import broll.taskmaster.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
* Service class for managing Comment entities.
*/
@Service
public class CommentService {
	private final CommentRepository commentRepository;
	private final UserRepository userRepository;

	public CommentService(UserRepository userRepository, CommentRepository commentRepository) {
		this.userRepository = userRepository;
		this.commentRepository = commentRepository;
	}

	// Save comment
	public Comment saveComment(Comment comment) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Optional<User> auth = userRepository.findByUsername(authentication.getName());

		auth.ifPresent(user -> comment.setUserId(user.getId()));
		return commentRepository.save(comment);
	}

	// List comments
	public List<Comment> getAllComments(UUID taskId) {
		return commentRepository.findByTaskId(taskId);
	}

	// Delete comment
	public void deleteComment(UUID id) {
		commentRepository.deleteById(id);
	}
}
