# Loan Portal

![Loan Portal](src/assets/inbank-logo.png)

### Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
5. [Usage](#usage)
  - [Starting the Development Server](#starting-the-development-server)
  - [Building for Production](#building-for-production)
6. [Project Structure](#project-structure)
  - [Environment Configuration](#environment-configuration)
  - [Key Components](#key-components)

## Introduction

Welcome to the **Loan Portal** repository. This project is developed to provide an efficient solution for loan management. The application is built using Angular and includes functionalities for loan applications, user authentication, and administrative actions.

_Please note that the initial task was to build only loan decision engine with single endpoint. But to add some
additional features, the app has been developed with security through ID code, saving loan offer, application and contracts to
the DB. Also, Admin user can modify the credit_modifier, loan limits etc. through the front-end application._

The back-end application can be found **here** - [GitHub](https://github.com/vinodjohn/inloan-server)

**View this app hosted in AWS here:**  http://54.93.218.156:81/

## Features

The app is based on RBAC (Role-Based Access Control). Two types of users: ADMIN and USER.

USER can make loan application and get Loan Decision. Selecting the loan offer creates the loan contract. USER can view their loan contracts and loan applications.
Additionally, USER can change password, view profile.

ADMIN has all the functionalities of the USER. 
Additionally, ADMIN can see all the contracts and applications made my other users.
ADMIN can manage credit_modifiers under Credit Modifier menu.
ADMIN can manage all the loan parameters under Key-Value Store menu.
ADMIN can manage all the users under Clients menu.


To make new Loan application (Loan request), USER need to Sign-in. New USERs can be created using Sign up link.
For any new user, the credit modifier and role can changed by ADMIN under Clients menu.

**Test users in the following table can be used to Signin:**

| First Name  | Last Name  | Personal ID Code | Password | Credit Modifier        | Role   |
|-------------|------------|------------------|----------|------------------------|--------|
| Falcon      | Ameri      | 39403160272      | 123456   | SEGMENT3 | ADMIN  |
| Thor        | Thunder    | 49002010965      | 123456   | DEBT   | USER   |
| Tony        | Stark      | 49002010976      | 123456   | SEGMENT1 | USER   |
| Natasha     | Romanof    | 49002010987      | 123456   | SEGMENT2 | USER   |
| Bruce       | Banner     | 49002010998      | 123456   | SEGMENT3 | USER   |

As an enhanced requirement, the LOAN OFFER can be of three types: **BASIC, PLUS and MAX.** The USER can choose any loan offer.
All the loan offer is based on the USER's credit score.

- **Loan Application**: Allows users to apply for new loans through an easy-to-use interface.
- **Admin Panel**: Administrators can manage loan applications and view detailed information.
- **User Authentication**: Secure sign-in functionality for accessing the portal.
- **Event Handling**: Utilizes an event bus service for efficient component interaction.

## Technologies Used
- **Angular**
- **TypeScript**
- **RxJS**
- **SCSS**
- **Node.js** and **NPM/Yarn**:
## Getting Started

### Prerequisites

- Node.js >= 14.x
- npm >= 6.x or yarn >= 1.22.x

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vinodjohn/loan-portal.git
   ```
2. Navigate to the project directory:
   ```sh
   cd loan-portal
   ```
3. Install dependencies:
   ```sh
   npm install
   # OR
   yarn install
   ```
## Usage

### Starting the Development Server

To start the development server, run:
```sh
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building for Production

To create a production build, run:
```sh
ng build
```
The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Project Structure

### Environment Configuration

The environment configuration files are located in the `src/environments/` directory:
- `environment.ts`: Configuration for production.
- `environment.development.ts`: Configuration for development.

### Key Components

- **Interceptors**: Located in `src/app/shared/interceptor/`
  - `app.interceptor.ts`: HTTP interceptor for modifying requests and handling responses.

- **Components**: Located in `src/app/`
  - **Admin Loan Application**: `loan-application/admin-loan-application/admin-loan-application.component.ts`
  - **New Loan**: `new-loan/new-loan.component.ts`
  - **Sign-In**: `sign-in/sign-in.component.ts`
  - **App Component**: Main application component (`app.component.ts` and `app.component.html`)

- **Services**: Located in `src/app/shared/service/`
  - `event-bus.service.ts`: Service for event handling across different components.
## License

Distributed under the MIT License.
