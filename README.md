# PulsePortal - Fitness Management Platform

### Project Overview

**PulsePortal** is a comprehensive fitness management system designed to serve both individual fitness enthusiasts and administrative users. It provides a suite of tools for personal fitness tracking, goal-setting, and social engagement, as well as a robust backend for content management and analytics.

### Key Features

#### For Customers:
- **Account Management**: Register and update personal details, change passwords.
- **Core Functionalities**: Dashboard access, workout and nutrition tracking, personal goals monitoring.
- **Exercise Database**: Create custom exercises, access a variety of educational resources.
- **Feedback System**: Post and view feedback.

#### For Admins:
- **User Management**: View, manage, and delete user accounts.
- **Content Management System**: Update exercise database, manage educational content and workout templates.
- **Feedback Management**: Oversee and manage customer feedback.


### Tech Stack

- **Frontend**: React.js, Bootstrap, CSS.
- **Backend**: Node.js with Express.js.
- **Database**: MySQL (Native SQL).
- **Authentication**: JWT.
- **API Testing**: Postman.
- **Storage**: Firebase.
- **Version Control**: Git/GitHub.


### Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js:** Download and install Node.js from [nodejs.org](https://nodejs.org/).
- **MySQL:** Install MySQL on your system. You can download it from [mysql.com](https://www.mysql.com/).
- **Git:** Ensure Git is installed. Download it from [git-scm.com](https://git-scm.com/).

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/pulse-portal.git
   ```
2. **Navigate to project directory:**
    ```bash
    cd pulse_portal
    ```

3. **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

4. **Install frontedn dependencies:**
    ```bash
    npm i 
    ```

5. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

6. **Install backend dependencies:**
    ```bash
    npm i 
    ```


### Setting Up Databse

1. **MySQL Setup:**
    - Create a new MySQL database for PulsePortal.

2. **Database Configuration:**
   - Update the database configuration in the database/config.js file with your database details.

3. **Database Initialization:**
   - Navigate to the MySQL Workbench and connect to your MySQL server.
   - Select Server > Data Import/Restore from the top menu.
   - In the Import Options, choose 'Import from Self-Contained File'.
   - Locate and select the `pulse_portal.sql` file you downloaded from the GitHub repository.
   - If necessary, choose the schema you want to import into or create a new one by selecting 'New...' and providing a name for the schema.
   - Click 'Start Import' to begin the import process. Monitor the progress in the Import Progress tab.
   - After the import is complete, verify that all tables and objects are correctly imported into the database.

### Running The Application

- **Start the backend server:** 
     ```bash
     npm run dev
     ```
- **Start the frontend server:** 
     ```bash
     npm run dev
     ```
- **Access PulsePortal:** Open your web browser and go to http://127.0.0.1:5173/ to access PulsePortal.


Now you're all set to explore PulsePortal! Happy fitness tracking! 🏋️‍♂️🏃‍♀️

