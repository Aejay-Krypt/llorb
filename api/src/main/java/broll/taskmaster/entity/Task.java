package broll.taskmaster.entity;

import java.util.Date;
import java.time.LocalDate;
import java.util.UUID;
import jakarta.persistence.*;
import broll.taskmaster.entity.EntityType.StatusType;
import broll.taskmaster.entity.EntityType.PriorityType;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tasks")
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	@Column(nullable = false)
	private String title;
	@Column(columnDefinition = "text")
	private String description;
	@Enumerated(EnumType.STRING)
	@Column(length = 50, nullable = false)
	private PriorityType priority;
	private LocalDate dueDate;
	private String label;
	@Enumerated(EnumType.STRING)
	@Column(length = 50, nullable = false)
	private StatusType status;
	@Column(nullable = false)
	private UUID userId;
	@CreationTimestamp
	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateUpdated;
}