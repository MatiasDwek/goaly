import logging

import psycopg


# Create the database tables
def create_tables():
    logging.info("Creating database tables...")

    # Connect to an existing database
    with psycopg.connect(
        dbname="tasks", user="root", password="", host="cockroachdb", port="26257"
    ) as conn:
        # Open a cursor to perform database operations
        with conn.cursor() as cur:
            # Create the database
            cur.execute("CREATE DATABASE IF NOT EXISTS tasks;")

            # Create the `users` table
            # -------------------------------------------------
            # | user_id            | username | email             | ... |
            # -------------------------------------------------
            # | abc-def-ghi       | user1    | user1@example.com | ... |
            users_table = """
                CREATE TABLE users (
                  user_id VARCHAR(11) NOT NULL PRIMARY KEY,
                  username VARCHAR(255) NOT NULL UNIQUE,
                  email VARCHAR(255) NOT NULL UNIQUE,
                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """
            cur.execute(users_table)

            # Create the `tasks` table
            # --------------------------------------
            # | task_id            | task_name | creation_date |
            # --------------------------------------
            # | abc-def-ghi       | Task 1    | 2023-04-23    |
            cur.execute(
                """
                CREATE TABLE tasks (
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
                CREATE TABLE completed_tasks (
                  task_id VARCHAR(11) NOT NULL,
                  completed_at DATE NOT NULL,
                  PRIMARY KEY (task_id, completed_at),
                  FOREIGN KEY (task_id) REFERENCES tasks(task_id)
                );
            """
            )

            # Make the changes to the database persistent
            conn.commit()
