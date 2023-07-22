# Story Management Application

This is a story management application that allows users to create, view, and manage stories. Users can log in using their Google accounts, create both public and private stories, view public stories from other users, like stories, add comments, and perform CRUD operations on their own stories.

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for OAuth 2.0 and Google Strategies
- TypeScript

## Installation

1. Clone the repository:

```bash
git clone https://github.com/obinnafranklinduru/story_management_application
cd story_management_application
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the Google OAuth credentials:

   - Rename the `.env.example` file to `.env`.
   - Obtain Google OAuth 2.0 credentials by creating a project in the Google Developers Console. - Replace the placeholders in the `.env` file with your actual credentials.
   - Start the development server:
     ```bash
     npm run dev
     ```
     The server will be running at https://localhost:3000.

## API Endpoints

| Method | Endpoint                 | Description                                                          |
| ------ | ------------------------ | -------------------------------------------------------------------- |
| POST   | /v1/auth/google          | Initiates Google OAuth 2.0 authentication.                           |
| GET    | /v1/auth/google/callback | Callback URL for Google OAuth 2.0 authentication.                    |
| GET    | /v1/auth/logout          | Logs out the user.                                                   |
| POST   | /v1/stories              | Creates a new story (authentication required).                       |
| GET    | /v1/stories/public       | Retrieves all public stories.                                        |
| GET    | /v1/stories/my-stories   | Retrieves all stories created by the user (authentication required). |
| PUT    | /v1/stories/:id          | Updates a story (authentication required and must be the creator).   |
| DELETE | /v1/stories/:id          | Deletes a story (authentication required and must be the creator).   |
| POST   | /v1/stories/:id/like     | Likes a story (authentication required).                             |
| POST   | /v1/stories/:id/comment  | Adds a comment to a story (authentication required).                 |

## Data Models

### User

- `googleId`: String (required) - Google user ID
- `displayName`: String (required) - User's display name
- `email`: String (required) - User's email address

### Story

- `title`: String (required) - Story title
- `body`: String (required) - Story content
- `status`: String (required, enum: ['public', 'private']) - Story status (public or private)
- `user`: ObjectId (required) - ID of the user who created the story
- `likes`: Number (default: 0) - Number of likes for the story
- `comments`: String[] (default: []) - Array of comments for the story

## Authentication

The application uses Google OAuth 2.0 for authentication. Users can log in with their Google accounts. Once authenticated, a user can access their dashboard and perform CRUD operations on their own stories.

## Searching for Stories

You can search for stories based on their titles by sending a GET request to `/stories/search` with the title query parameter.

Example: `GET /stories/search?title=helloworld`

## Error Handling

Errors are handled using custom middleware. Any error during the request/response cycle will be caught, and the appropriate error response will be sent to the client.

## Contributions

Contributions to this project are welcome! If you find any bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
