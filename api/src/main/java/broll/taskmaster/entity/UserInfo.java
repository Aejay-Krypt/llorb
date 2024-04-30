package broll.taskmaster.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private UUID id;
    private String name;
    private String username;
    private String email;
    private String role;
}