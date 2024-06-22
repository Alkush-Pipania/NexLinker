# Resume Builder

## Overview
This project is a **Resume Builder** application designed to help users create professional resumes. The application allows users to customize their resumes and even create their own resume templates. Built using modern web technologies, this project provides a seamless and interactive experience.

## Features
- Dynamic and user-friendly interface
- Secure authentication and real-time database
- Modern, responsive UI
- Fast and easy deployment
- Efficient data fetching and caching
- Smooth animations
- Simple notifications
- Export resume as an image

## Technologies and Tools Used
- ⚛️ **ReactJS**: For creating a dynamic and user-friendly interface.
- 🔥 **Firebase**: Used for secure authentication and real-time database.
- 🎨 **Tailwind CSS**: Helped in designing a modern, responsive UI.
- 🚀 **Vercel**: Simplified the deployment process, making it fast and easy.
- 📦 **React Query**: Managed data fetching and caching efficiently.
- 🎥 **Framer Motion**: Added smooth animations for a better user experience.
- 🔔 **React Toastify**: For clean and simple notifications.
- 🖼️ **html-to-image**: Allowed users to export their resume as an image.

## Challenges and Solutions
- 📱 **Mobile Redirection Issue**: Ensured users can't access the "Customize this template" page on mobile devices, redirecting them appropriately.
- 🌐 **Deployment vs. Localhost Discrepancy**: Solved issues where the app worked locally but not on deployment, focusing on environment variables and build configurations.
- 🔐 **Firebase Integration**: Overcame initial challenges with Firebase authentication and data fetching by refining the implementation and using React Query for better state management.

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/resume-builder.git
    cd resume-builder
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
    ```env
    REACT_APP_FIREBASE_API_KEY=your_api_key
    REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
    REACT_APP_FIREBASE_PROJECT_ID=your_project_id
    REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_FIREBASE_APP_ID=your_app_id
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage
To use the Resume Builder, navigate to `http://localhost:3000` in your web browser. From there, you can create and customize your resume.

## Contributing
If you would like to contribute to this project, please fork the repository and create a pull request with your changes. Contributions are welcome!
