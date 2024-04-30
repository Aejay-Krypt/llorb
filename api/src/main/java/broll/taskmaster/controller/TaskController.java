package broll.taskmaster.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import broll.taskmaster.entity.SuccessStructure;
import broll.taskmaster.entity.Task;
import broll.taskmaster.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	// Create task
	@PostMapping("/tasks")
	public ResponseEntity<SuccessStructure> saveTask(@RequestBody Task task) {
		SuccessStructure response = new SuccessStructure(taskService.saveTask(task));
		return ResponseEntity.status(201).body(response);
	}

	// List tasks
	@GetMapping("/tasks")
	public ResponseEntity<SuccessStructure> getAllTasks(@RequestParam(name = "search", required = false, defaultValue = "") String search) {
		SuccessStructure response = new SuccessStructure(taskService.getAllTasks(search));
		return ResponseEntity.ok().body(response);
	}

	// Get task details
	@GetMapping("/tasks/{id}")
	public ResponseEntity<SuccessStructure> getTaskById(@PathVariable UUID id) {
		SuccessStructure response = new SuccessStructure(taskService.getTaskById(id));
		return ResponseEntity.ok().body(response);
	}

	// Update task
	@PutMapping("/tasks/{id}")
	public ResponseEntity<SuccessStructure> updateTask(@PathVariable UUID id, @RequestBody Task task) {
		SuccessStructure response = new SuccessStructure(taskService.updateTask(id, task), "Task updated successfully.");
		return ResponseEntity.ok().body(response);
	}

	// Delete task
	@DeleteMapping("/tasks/{id}")
	public ResponseEntity<SuccessStructure> deleteTask(@PathVariable UUID id) {
		taskService.deleteTask(id);
		SuccessStructure response = new SuccessStructure(null,"Task deleted successfully.");
		return ResponseEntity.status(202).body(response);
	}

	// Filter task
	@GetMapping("/tasks/filter")
	public ResponseEntity<SuccessStructure> filterTask(@RequestParam(name = "criteria", required = true) String criteria, @RequestParam(name = "parameter", required = true) String parameter) {
		SuccessStructure response = new SuccessStructure(taskService.filterTask(criteria, parameter));
		return ResponseEntity.ok().body(response);
	}
}
