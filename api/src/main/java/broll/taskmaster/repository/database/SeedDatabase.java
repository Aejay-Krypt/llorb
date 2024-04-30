package broll.taskmaster.repository.database;

import broll.taskmaster.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import broll.taskmaster.entity.User;
import broll.taskmaster.entity.EntityType.RoleType;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;

@Configuration
class SeedDatabase {
  private static final Logger log = LoggerFactory.getLogger(SeedDatabase.class);

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  public DatabaseMigration databaseMigration;

  @Bean
  CommandLineRunner initDatabase(UserRepository repository) {

    return args -> {
        log.info("Database Seeding: started");

        Optional<User> admin = repository.findByUsername("admin");
        if(admin.isPresent()){
            log.info("Admin user already exist.");
        }else{
            String adminPassword = "Aa123789";
            String encodedPassword = passwordEncoder.encode(adminPassword);
            log.info("Admin password encoded successfully.");

            repository.save(new User("Administrator", "admin", "admin@taskmaster.com", encodedPassword, RoleType.admin));
            log.info("Admin account created successfully.");
        }

        databaseMigration.createPivotTable();


        log.info("Database Seeding: completed");
    };
  }

}