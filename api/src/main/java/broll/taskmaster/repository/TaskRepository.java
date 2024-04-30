package broll.taskmaster.repository;

import broll.taskmaster.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {
    List<Task> findByTitleContainingOrDescriptionContaining(String title, String description);

    List<Task> findByPriority(String priority);

    List<Task> findByDueDate(LocalDate dueDate);

    List<Task> findByLabel(String label);

    @Modifying
    @Transactional
    @Query("UPDATE Task t SET t.status = 'overdue' WHERE t.dueDate IS NOT NULL AND t.dueDate < CURRENT_DATE")
    void updateDueStatus();
}







