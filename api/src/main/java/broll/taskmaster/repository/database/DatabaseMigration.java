package broll.taskmaster.repository.database;

import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@Configuration
public class DatabaseMigration {
    private final DataSource dataSource;

    public DatabaseMigration(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    String auditTrailSql = "CREATE TABLE IF NOT EXISTS audit_trail ( " +
            " user_id VARCHAR(36) NOT NULL, " +
            " activity VARCHAR(255) NOT NULL," +
            " entry_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)";

    public void createPivotTable() {
        try (Connection connection = dataSource.getConnection()) {
            try (Statement statement = connection.createStatement()) {
                statement.executeUpdate(auditTrailSql);
                System.out.println("Audit trail setup successfully.");
            } catch (SQLException e) {
                System.err.println("Error executing SQL statement: " + e.getMessage());
            }
        } catch (SQLException e) {
            System.err.println("Error connecting to the database: " + e.getMessage());
        }
    }
}