# llorb Taskmaster Application

This is the documentation for the llorb Taskmaster application.
llorb Taskmaster is a task management tool designed to help you organize your tasks effectively.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)
- Docker Compose: [Installation Guide](https://docs.docker.com/compose/install/)

## Getting Started

Follow the steps below to set up and run the llorb Taskmaster application.

### Step 1: Clone the Repository

Clone the llorb Taskmaster repository to your local machine

### Step 2: Build and Run the Application

To build and run the llorb Taskmaster application, execute the following command:

    make ignition

### Step 3: Access the Application

Once the application is running, you can access it using your web browser:

    llorb Taskmaster Web App: [view] (http://localhost)

## Additional Make Commands

The following additional make commands are available:

- make help: Get list of available commands.
- make api: Build the backend of the application.
- make portal: Build the frontend of the application.
- make view: View the running application containers.
- make down: Shut down all running containers
- make clean: Remove the stopped application containers and clean up temporary files.
- make logs: View all available logs
