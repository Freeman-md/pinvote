# PinVote

PinVote is a real-time polling app that allows users to create and participate in polls.

## Features

- Create and manage polls with ease.
- Real-time updates on poll results.
- User-friendly interface for seamless interaction.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **EJS (Embedded JavaScript)** for templating
- **Tailwind CSS** for styling

## Getting Started

### Prerequisites

- **Node.js and npm** installed on your machine.
- **MongoDB** database set up.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Freeman-md/PinVote.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd PinVote
   ```

3. **Copy the `.env.example` file:**

   ```bash
   cp .env.example .env
   ```

4. **Open the `.env` file and enter your environmental variables:**

   ```env
   MONGODB_URI=your-mongodb-connection-string
   SESSION_SECRET=your-session-secret
   ```

5. **Install dependencies:**

   ```bash
   npm install
   ```

6. **Start the application:**

   ```bash
   npm run watch:dev
   ```

7. **Open your browser and go to** `http://localhost:3000` **to view the app.**

## Contributing

Contributions are welcome! Please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This version guides users to copy the `.env.example` file, rename it to `.env`, and enter the required environmental variables.