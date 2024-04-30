package broll.taskmaster.auth;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/taskmaster_db")
                .username("root")
                .password("pass@pass")
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}

