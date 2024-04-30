package broll.taskmaster.entity;

import org.springframework.security.core.GrantedAuthority;

import java.util.List;

public class EntityType {
    public enum RoleType {
        user, admin
    }

    public enum StatusType {
        pending,completed,overdue
    }

    public enum PriorityType {
        low,normal,high,critical,emergency
    }
}