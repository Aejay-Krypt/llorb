package broll.taskmaster.controller;

import broll.taskmaster.entity.Comment;
import broll.taskmaster.entity.SuccessStructure;
import broll.taskmaster.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

	private final CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}

	// Create comment
	@PostMapping("/comments")
	public ResponseEntity<SuccessStructure> saveComment(@RequestBody Comment comment) {
		SuccessStructure response = new SuccessStructure(commentService.saveComment(comment));
		return ResponseEntity.status(201).body(response);
	}

	// Get comments
	@GetMapping("/comments/{taskId}")
	public ResponseEntity<SuccessStructure> getAllComments(@PathVariable UUID taskId) {
		SuccessStructure response = new SuccessStructure(commentService.getAllComments(taskId));
		return ResponseEntity.ok().body(response);
	}

	// Delete comment
	@DeleteMapping("/comments/{id}")
	public ResponseEntity<SuccessStructure> deleteComment(@PathVariable UUID id) {
		commentService.deleteComment(id);
		SuccessStructure response = new SuccessStructure(null,"Comment deleted successfully.");
		return ResponseEntity.status(202).body(response);
	}
}
