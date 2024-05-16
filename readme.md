# URL Shortener Backend

This is the backend for a URL shortener application built using Node.js, Express.js, and MongoDB. It provides RESTful APIs for managing users, URLs, and analytics.

## Getting Started

To get started with this backend application, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Set up your MongoDB database and update the connection string in `app.js`.
4. Start the server using `npm start`.

## Endpoints

### Authentication

- `/auth/signup`: Sign up a new user.
- `/auth/login`: Log in an existing user.

### URL Management

- `/url/create`: Create a shortened URL.
- `/url/:id`: Get details of a specific URL.
- `/url/:id/analytics`: Get analytics data for a specific URL.
- `/urls`: Get a list of all URLs.

### User Management

- `/users`: Get a list of all users.

## Environment Variables

- `PORT`: The port number on which the server will run. Default is 3000.
- `MONGODB_URI`: The connection URI for MongoDB.

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


### http://localhost:3000/users    ----> display in local host web browser
### http://localhost:3000/urls     ----> display in web browser
