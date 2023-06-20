## Contributing Guidelines

Thank you for considering contributing to README Project! We appreciate your interest in making our project better. To ensure a smooth collaboration, please take a moment to review and follow these guidelines.

## Table of Contents

- [Contributing Guidelines](#contributing-guidelines)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
  - [Mirco App](#mirco-app)
  - [Pub Server](#pub-server)
- [Contribution Process](#contribution-process)
  - [Reporting Issues](#reporting-issues)
  - [Submitting Pull Requests](#submitting-pull-requests)

## Getting Started

To contribute to Readme Project, follow these steps to set up the development environment.

### Prerequisites

- Node.js (version 18.X.X)
- Yarn (version 2.X.X)

### Installation

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Install the required dependencies by running the following command in the project root directory:

   ```
   yarn
   ```

4. Edit `.env` inside `packages/pub-server`. Start the Activity Sub server by running the following command:

   ```
   cd packages/pub-server
   yarn dev
   ```

5. Edit `.env` inside `packages/micro-app`. Start the Frontned App by running the following command:

   ```
   cd packages/micro-app
   yarn dev
   ```

## Project Structure

This project is organized as a monorepo with the following packages:

### Mirco App

The API package contains the server-side code responsible for handling file, image, and blogs. It provides the core functionality of the Readme Project.

### Pub Server

The frontend package contains the client-side code responsible for handling the frontend of the Readme Project.

## Contribution Process

We welcome contributions from the community. If you encounter issues, have ideas for improvements, or want to contribute code, please follow the guidelines below.

### Reporting Issues

If you encounter any problems while using the README Project, please open an issue on the GitHub repository. Make sure to include detailed information about the issue, including steps to reproduce, expected behavior, and any relevant error messages.

### Submitting Pull Requests

If you want to contribute code to the project, follow these steps:

1. Create a fork of the repository on GitHub.

2. Clone the forked repository to your local machine:
    ```bash
   git clone https://github.com/<your-username>/readme.git
   cd readme
    ```

3. Create a new branch for your changes:
   ```bash
   git checkout -b feat/new-feature
   ```
4. Make your changes to the codebase.

5. Test your changes to ensure they work as intended.

6. Commit your changes with a clear and descriptive commit message:
   ```bash
   git commit -m "Add new feature"
   ```

7. Push to  your branch:
   ```bash
   git push origin feat/new-feature
   ```

8. Open a pull request on the GitHub repository. Make sure to include a detailed description of your changes.

9. Wait for a maintainer to review your pull request. If there are any issues, you may be asked to make changes to your code. Otherwise, your pull request will be merged into the main branch.

10. Celebrate! 🎉