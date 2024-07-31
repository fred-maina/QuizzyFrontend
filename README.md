# Quizzy Frontend Application

## Overview

The Quizzy frontend application is a React-based interface for users to interact with quizzes created and managed through the Quizzy backend. Users can take quizzes, view results, and manage their quiz activities seamlessly.

## Features

- **User Authentication**: Secure access to quiz management through JWT.
- **Take Quizzes**: Users can take quizzes with questions presented one at a time.
- **View Results**: After completing a quiz, users can view their results and scores in percentage.
- **Score Submission**: Automatically submits the quiz results to the backend for record-keeping.

## Requirements

- Node.js
- npm or yarn

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/fred-maina/quizzy-frontend.git
   cd quizzy-frontend
   ```

2. **Install dependencies**:
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```sh
   npm start
   # or
   yarn start
   ```

## Usage

- **Take Quizzes**: Navigate to `/quiz/:quizCode` to take a quiz.
- **View Results**: After completing a quiz, results are shown on the `/results` page.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.