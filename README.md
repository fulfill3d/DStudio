# DStudio

- **App**: Visit https://dstudio.fulfill3d.com to see the application demo.

DStudio is a dynamic design platform focused on providing users with a flexible, real-time 3D modeling environment. The application integrates Babylon.js for rendering 3D scenes and Fabric.js for 2D canvas-based design. It allows users to interact with various 3D and 2D elements in a seamless, user-friendly interface, suitable for a wide range of design use cases.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Microservices](#microservices)
- [Frontend Tech Stack](#frontend-tech-stack)
- [Backend Tech Stack](#backend-tech-stack)

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (version 22 or higher recommended)
- **npm** or **yarn** (package manager)

## Project Structure

Here is an overview of the key directories in the project:

- **`frontend/src/app`**: Contains Next.js pages and components for the application, including routing and main UI layout.
- **`frontend/src/components`**: Reusable React components used throughout the app, such as form elements, buttons, modals, etc.
- **`frontend/src/hooks`**: Custom hooks for managing application state, fetching data, and interacting with external APIs.
- **`frontend/src/interfaces`**: Class interfaces representing structured data for various operations within the app, including design elements and user interactions.
- **`frontend/src/models`**: TypeScript interfaces and types representing the data models used across the application.
- **`frontend/src/service`**: Service files for connecting to APIs, handling data requests, and managing interactions with external services.
- **`frontend/src/store`**: Redux store configuration and slices for state management.
- **`frontend/src/utils`**: Utility functions and helper methods used across different parts of the project to perform common tasks like formatting, validation, etc.

## Microservices

### API
- **DStudio.API:** GET product settings from Azure Cosmos DB

## Frontend Tech Stack

- **Next.js (14.2.5)**: A React framework with server-side rendering and static site generation.
- **React (18)**: A JavaScript library for building user interfaces.
- **Babylon.js (6.33.1)**: A powerful 3D engine for rendering WebGL graphics.
- **Fabric.js (5.3.0)**: A JavaScript canvas library for 2D drawing.
- **Tailwind CSS (3.4.1)**: A utility-first CSS framework for responsive design.
- **Redux Toolkit (2.1.0)**: A toolkit for managing global state with Redux.
- **UUID (9.0.1)**: A library for generating unique identifiers.


## Backend Tech Stack

- **Backend:** .NET 8 (Isolated Worker), Azure Functions v4
- **Database:** Azure Cosmos DB
- **Configuration & Secrets Management:** Azure App Configuration, Azure Key Vault
- **Hosting:** Microsoft Azure
