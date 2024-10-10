![Project Image](frontend/src/styles/bucher-connect-hero-unit-background-image-optimized.png)

# Coding Challenge

[![Bucher Municipal Logo](https://bucher.assetbank-server.com/assetbank-bucher/images/standard/logo.png)](https://www.buchermunicipal.com/)

---

## Overview

The goal of this challenge is to build a simple full-stack application that tracks and displays vehicle GPS sessions. The application consists of two main parts:

- **Backend**: Built with **NestJS**, it imports vehicle GPS tracks from CSV files into a SQLite database through a cron job. The GPS data is then exposed via an API endpoint.

- **Frontend**: Built with **React**, it fetches the GPS data from the backend and renders each session's track on an interactive map using **Mapbox**. The maps are arranged in a grid layout.

## Requirements

- **Backend**:
  - Use **NestJS** to implement the backend.
  - GPS session data should be imported from CSV files located in the `/gps-data/` folder using a **cron job**.
  - The imported data should be stored in an **SQLite** database.
  - Provide a REST API endpoint `/api/gps-position` that returns all GPS positions and their associated data in the format below.

```json
[
  {
    "id": 1,
    "latitude": 52.51058096504199,
    "longitude": 13.40665022976207,
    "timestamp": 1728577102000,
    "sessionId": "1"
  }
]
```

- **Frontend**:
  - Use **React** with **TypeScript**.
  - Fetch the GPS positions from the `/api/gps-position` endpoint and group the data per session.
  - Display each session on a separate **Mapbox** map using **react-map-gl**. You can use already prepared `Map` component showdcased in Storybook
  - Arrange the maps in a grid layout on the page.
  - **Optional:** Make a detail page by clicking on one element in the grid layout and fetching the `/api/gps-position/{sessionId}` endpoint

## Mapbox Token

We have provided a public Mapbox access token for this challenge to render the maps. You can find it in the `frontend/src/constants.ts` file:

```ts
// constants.ts
export const MAPBOX_TOKEN = "pk.your-public-access-token-here";
```

Feel free to use this token when configuring **Mapbox** in your frontend.

## How to Run the Application

### 1. Backend Setup

1. **Install dependencies**:
   Navigate to the `backend/` folder and run:
   ```bash
   npm install
   ```

(If you have not generated and run migration you need to perform `migration:generate` and `migration:run`)

2. **Run the Backend**:
   Start the backend application using the following command:

   ```bash
   npm run start:dev
   ```

3. **Cron Job**:
   The backend cron job will run periodically to import any new CSV files placed in the `/gps-data/` folder.

4. **API Endpoint**:
   Once the backend is running, the GPS positions will be available at:
   ```
   GET http://localhost:3000/api/gps-position
   ```

### 2. Frontend Setup

1. **Install dependencies**:
   Navigate to the `frontend/` folder and run:

   ```bash
   npm install
   ```

2. **Run the Frontend**:
   Start the frontend application using the following command:

   ```bash
   npm run dev
   ```

3. **Open the app**:
   Visit `http://localhost:5173/` to view the React app with the GPS sessions displayed on maps.

## Project Structure

### Backend

- **cron/gps-cron.service.ts**: The cron job responsible for importing the GPS session data from CSV files.
- **gps/gps.service.ts**: Handles the logic for processing the GPS data and retrieving it from the database.
- **gps/gps.controller.ts**: Exposes an API endpoint to return the GPS session data in GeoJSON format.
- **database/gps-position.entity.ts**: Defines the SQLite entity for GPS sessions, storing vehicle positions and other metadata.

### Frontend

- **components/MapGrid.tsx**: A React component that displays all the GPS session maps in a grid layout.
- **services/gpsApi.ts**: Fetches the GPS session data from the backend API.
- **App.tsx**: Main application component that fetches and displays the GPS session maps.
- **constants.ts**: Stores the public Mapbox access token to be used in the map components.

## Submission Guidelines

1. **Branch/Repo**:

   - Create your own branch in the provided repository and commit your changes regularly.

2. **Do not open a pull request**:

   - Submit the completed project as a GitHub branch or zip file.

3. **Run Instructions**:
   - Ensure that your submission includes clear instructions on how to run the project.

---

### GPS Session Data

In the `/gps-data/` folder, you will find pre-provided CSV files with GPS data. Each file corresponds to a vehicle session and contains latitude and longitude coordinates. These files should be imported into the database by the cron job.

Sample CSV format:

```csv
latitude,longitude,timestamp
52.5200,13.4050,2023-10-10T10:00:00Z
52.5201,13.4051,2023-10-10T10:05:00Z
...
```

---

### Folder Structure

```
coding-challenge/
│
├── backend/
│   ├── src/
│   │   ├── cron/
│   │   │   └── gps-cron.service.ts       # Cron job for importing GPS data
│   │   ├── database/
│   │   │   ├── gps-position.entity.ts    # Entity representing a GPS positions
│   │   │   └── migrations/               # Place your migration files here
│   │   ├── gps/
│   │   │   ├── gps.controller.ts         # Handles API requests
│   │   │   ├── gps.module.ts             # GPS module
│   │   │   └── gps.service.ts            # Business logic for processing and retrieving GPS data
│   │   ├── app.module.ts                 # Main module configuration
│   │   └── main.ts                       # App entry point
│   ├── gps-data/                         # Folder to store uploaded GPS CSV files
│   ├── database.sqlite                   # SQLite database
│   └── package.json                      # Backend dependencies and scripts
│
└── frontend/
    ├── index.html                        # HTML root for the React app
    ├── src/
    │   ├── components/
    │   │   ├── MapGrid.scss              # SCSS for the grid layout
    │   │   └── MapGrid.tsx               # Renders the grid of maps for each session
    │   ├── services/
    │   │   └── gpsApi.ts                 # API service to fetch GPS data
    │   ├── App.tsx                       # Main React component
    │   ├── main.tsx                      # React app entry point
    │   ├── constants.ts                  # Stores the Mapbox access token
    │   └── styles/                       # Global SCSS
    └── package.json                      # Frontend dependencies and scripts
```

---

### Goals

This challenge is designed to test your full-stack development skills, focusing on:

- **Backend**: Ability to create a cron job, handle file imports, interact with a database, and expose an API.
- **Frontend**: Ability to build a responsive UI, fetch and render API data, and work with map-based visualizations using Mapbox.

---

## About Bucher Connect

[![Watch the video](https://img.youtube.com/vi/XxeNA9mi6SE/maxresdefault.jpg)](https://www.youtube.com/watch?v=XxeNA9mi6SE)

Click the image above to watch the Bucher Connect video on YouTube.
