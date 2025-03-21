# Bhavishyavani Application

A React-based facility booking application that allows users to select a facility and future date for prediction.

## Features

- Facility selection dropdown
- Date picker with future date validation
- Simulated API integration
- Material-UI based modern interface
- Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
```

2. Navigate to the project directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm start
```

This will:
- Start the development server
- Open [http://localhost:3000](http://localhost:3000) in your default browser
- Enable hot reloading for development

## Building for Production

To create a production build:

```bash
npm run build
```

This will:
- Create an optimized production build in the `build` folder
- Minify the code and optimize assets for the best performance

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   └── index.js
├── package.json
├── README.md
└── .gitignore
```

## Dependencies

- React
- Material-UI
- React DatePicker
- Axios (for future API integration)
