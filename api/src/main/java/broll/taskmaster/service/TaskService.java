package broll.taskmaster.service;

import broll.taskmaster.entity.Task;
import broll.taskmaster.entity.User;
import broll.taskmaster.repository.TaskRepository;
import broll.taskmaster.repository.UserRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.*;

/**
* Service class for managing Task entities.
*/
@Service
public class TaskService {
	private final TaskRepository taskRepository;
	private final UserRepository userRepository;

	public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
		this.taskRepository = taskRepository;
		this.userRepository = userRepository;
	}

	// Create task
	public Task saveTask(Task task) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Optional<User> auth = userRepository.findByUsername(authentication.getName());

		if(auth.isPresent() && task.getUserId()==null){
			task.setUserId(auth.get().getId());
		}

		return taskRepository.save(task);
	}

	// List tasks
	public List<Task> getAllTasks(String query) {
		taskRepository.updateDueStatus();
		return Objects.equals(query, "") ? taskRepository.findAll() : taskRepository.findByTitleContainingOrDescriptionContaining(query, query);
	}

	// Get tasks details
	public Optional<Task> getTaskById(UUID id) {
		return taskRepository.findById(id);
	}

	// Update task
	public Task updateTask(UUID id, Task updatedTask) {
		Optional<Task> existingTask = taskRepository.findById(id);
		if (existingTask.isPresent()) {
			Task task = existingTask.get();
			task.setTitle(updatedTask.getTitle());
			task.setDescription(updatedTask.getDescription());
			task.setPriority(updatedTask.getPriority());
			task.setDueDate(updatedTask.getDueDate());
			task.setLabel(updatedTask.getLabel());
			task.setStatus(updatedTask.getStatus());
			task.setUserId(updatedTask.getUserId());
			return taskRepository.save(task);
		} else {
			throw new RuntimeException("Task not found");
		}
	}

	// Delete task
	public void deleteTask(UUID id) {
		taskRepository.deleteById(id);
	}

	// Search task
	public List<Task> searchTask(String query) {
		taskRepository.updateDueStatus();
        return taskRepository.findByTitleContainingOrDescriptionContaining(query, query);
	}

	// Filter task
	public List<Task> filterTask(@NotNull String criteria, String parameter) {
		taskRepository.updateDueStatus();
		List<Task> tasks = List.of();
		switch (criteria){
			case "priority":
				tasks = taskRepository.findByPriority(parameter);
				break;
			case "label":
				tasks = taskRepository.findByLabel(parameter);
				break;
			case "deadline":
				tasks = taskRepository.findByDueDate(LocalDate.parse(parameter));
				break;
		}
		return tasks;
	}
}
