import psycopg


# Create the database tables
def create_tables():
    # Database connection parameters
    conn = psycopg.connect(
        dbname="your_db_name",
        user="root",
        password="",
        host="cockroachdb",
        port="26257"
    )

    # Create a cursor object to interact with the database
    cur = conn.cursor()

    # Create the Users table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
        )
    """)

    # Create the Tasks table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            task_id SERIAL PRIMARY KEY,
            task_name VARCHAR(255),
            creation_date DATE
        )
    """)

    # Create the Completed_Tasks table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS completed_tasks (
            completed_task_id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(user_id),
            task_id INTEGER REFERENCES tasks(task_id),
            completion_date DATE
        )
    """)

    # Commit the changes and close the cursor and connection
    conn.commit()
    cur.close()
    conn.close()
