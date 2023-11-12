[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Video of Application in Use](https:)

# Project Title: Book Club Management System

## Description

This project is a comprehensive Book Club Management System designed to facilitate the organization and participation in book clubs. It features functionalities for managing books, clubs, discussions, and memberships.

## Key Features

- **Book Management**: Add, view, and manage books.
- **Club Management**: Create and manage book clubs.
- **Discussion Forums**: Facilitate discussions around books and clubs.
- **Membership Management**: Handle user memberships in clubs.
- **Admin Dashboard**: For administrative tasks and oversight.
- **User Authentication**: Secure login and logout functionalities.

## Technology Stack

- **Backend**: Node.js
- **Database**: MySQL
- **Frontend**: Handlebars.js, CSS

## File Structure

- `connection.js`: Manages database connections.
- `server.js`: Sets up the Node.js server.
- `homeRoutes.js`, `bookRoutes.js`, `clubRoutes.js`, `discussionRoutes.js`, `membershipRoutes.js`, `userRoutes.js`: Define routes for different functionalities.
- `Books.js`, `Clubs.js`, `Discussions.js`, `JoinRequests.js`, `Memberships.js`, `Users.js`: Models for database schemas.
- `addBook.js`, `adminDashboard.js`, `createClub.js`, `join.js`, `login.js`, `logout.js`, `memberView.js`: JavaScript files for various features.
- `bookData.json`, `clubData.json`, `discussionData.json`, `membershipData.json`, `userData.json`: Sample data for seeding the database.
- `seed.js`: Utility for seeding the database.
- `style.css`: CSS file for styling.
- Handlebars files: Template files for the frontend.

## Setup and Installation

### Prerequisites

- Node.js
- MySQL or a compatible database system
- npm (Node Package Manager)

### Steps

1. **Clone the Repository**

   - Clone this repository to your local machine using `git clone [repository-url]`.

2. **Install Node Modules**

   - Navigate to the cloned repository's directory.
   - Run `npm install` to install all the necessary dependencies listed in the `package.json` file.

3. **Database Setup**

   - Ensure MySQL is installed and running on your machine.
   - Create a new database for the application.
   - Run the `schema.sql` file to set up the required tables. This can be done by executing the script within your MySQL client or through a MySQL GUI tool.

4. **Seed the Database (Optional)**

   - If sample data is required, run the seed script with `node seed.js`. This will populate the database with initial data from the provided JSON files.

5. **Environment Configuration**

   - Set up any necessary environment variables, such as database credentials, in a `.env` file or as per your environment configuration practices.

6. **Starting the Application**
   - Once all the setup is complete, start the application by running `npm start`.
   - The server should now be running, and the application can be accessed at the specified port on your local machine (usually `http://localhost:3000`).

### Notes

- Ensure all paths and environment variables are correctly set as per your local setup.
- The database credentials and other sensitive information should not be hardcoded and must be securely stored and accessed.

## Usage

### General Workflow

1. **Accessing the Application**

   - Open a web browser and navigate to the application URL (usually `http://localhost:3000` after starting the server locally).

2. **Logging In**

   - Use the login page to enter your credentials and access the system. If you're a new user, follow the registration process.

3. **Navigating the Dashboard**
   - Once logged in, the main dashboard provides access to different functionalities like viewing books, joining clubs, and participating in discussions.

### Managing Books

- **Viewing Books**

  - Access the book list to see all available books.
  - Click on a book to view detailed information, including reviews and discussions.

- **Adding a Book (Admins)**
  - Navigate to the 'Add Book' section to input details of a new book.
  - Submit the form to add the book to the system.

### Participating in Book Clubs

- **Joining a Club**

  - Browse the list of clubs and select one to join.
  - Submit a join request. An email will be sent to the provided email address.

- **Creating a Club (Admins)**
  - Use the 'Create Club' option to set up a new book club.
  - Define the club's rules, description, and other details.

### Engaging in Discussions

- **Starting a Discussion**

  - In the discussion section of a book or club, start a new thread to discuss a topic.
  - Other members can join the conversation and share their thoughts.

- **Participating in Existing Discussions**
  - Browse active discussions and click on a thread to read and contribute.
  - Engage with other members by replying to their posts.

### Admin Functions

- **Managing Users and Clubs**
  - Admins have access to additional functionalities like user management, club approvals, and system settings.
  - Access these options through the admin dashboard.

### Logging Out

- **Securely Exiting the System**
  - Use the logout option to securely exit the application.
  - Your session will be terminated to maintain security.

## License

This project is licensed under the MIT License. For more information about the license, please refer to the following link: [MIT License](https://opensource.org/licenses/MIT).
