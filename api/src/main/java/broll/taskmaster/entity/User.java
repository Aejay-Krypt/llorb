package broll.taskmaster.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	@Column(nullable = false)
	private String name;
	@Column(unique = true, nullable = false)
	private String username;
	@Column(unique = true, nullable = false)
    private String email;
	@Column(nullable = false)
	private String password;
	@Enumerated(EnumType.STRING)
	@Column(length = 50, nullable = false)
	private EntityType.RoleType role;
	@CreationTimestamp
	@Column(nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateUpdated;

	public User(String name, String username, String email, String password, EntityType.RoleType role) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
	}

	public String getRole() { return role.toString(); }
}