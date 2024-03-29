import logging

from .db import pool


# Create the database tables
def create_tables():
    logging.info("Creating database tables...")

    with pool.connection() as conn:
        cur = conn.cursor()
        # Create the database
        cur.execute("CREATE DATABASE IF NOT EXISTS tasks;")

        # Create the `users` table
        # -------------------------------------------------
        # | user_id            | username | email             | ... |
        # -------------------------------------------------
        # | abc-def-ghi       | user1    | user1@example.com | ... |
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
              user_id VARCHAR(11) NOT NULL PRIMARY KEY,
              username VARCHAR(255) NOT NULL UNIQUE,
              email VARCHAR(255) NOT NULL UNIQUE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            """
                    )

        # Create the `tasks` table
        # --------------------------------------
        # | task_id            | task_name | creation_date |
        # --------------------------------------
        # | abc-def-ghi       | Task 1    | 2023-04-23    |
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS tasks (
              task_id VARCHAR(11) NOT NULL PRIMARY KEY,
              user_id VARCHAR(11) NOT NULL,
              name VARCHAR(255) NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(user_id)
            );
            """
        )

        # Create the `completed_tasks` table
        # ------------------------------------------------------------
        # | completed_task_id | user_id           | task_id         | completion_date |
        # ------------------------------------------------------------
        # | abc-def-ghi      | abc-def-ghi       | abc-def-ghi     | 2023-04-23      |
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS completed_tasks (
              task_id VARCHAR(11) NOT NULL,
              completed_at DATE NOT NULL,
              PRIMARY KEY (task_id, completed_at),
              FOREIGN KEY (task_id) REFERENCES tasks(task_id)
            );
            """
        )

        # Create root user for testing and development
        cur.execute(
            """
            INSERT INTO users (user_id, username, email)
            VALUES ('aaa-aaa-aaa', 'root-user', 'root-user@goaly.com')
            ON CONFLICT (user_id)
            DO NOTHING;
            """
        )
