# KPI Dashboard Portal

A comprehensive Environmental, Health, and Safety (EHS) Dashboard Portal built with Next.js, TypeScript, and Tailwind CSS. This portal provides real-time monitoring, data visualization, and management of EHS metrics.

## Features

- **EHS Metrics Dashboard**: Comprehensive view of all EHS data including:
  - Training Hours (Target vs Actual)
  - Hazard Reporting
  - Near Misses
  - Accidents and Incidents
  - EHS Walks and Risk Assessments
  - Resource Consumption (Electricity, Gas, Water, Paper)
  - Carbon Footprint

- **Data Visualization**:
  - Interactive charts and graphs
  - KPI cards with key metrics
  - Monthly data tables
  - Trend indicators

- **Data Management**:
  - Edit data directly from the dashboard
  - Monthly data input forms
  - Real-time updates

- **Modern UI/UX**:
  - Light and dark theme support
  - Responsive design
  - Clean, modern interface
  - Accessible components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and theme variables
│   ├── layout.tsx            # Root layout component
│   └── page.tsx              # Main page component
├── components/
│   ├── Dashboard.tsx         # Main dashboard component
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── ThemeProvider.tsx     # Theme context provider
│   ├── KPICard.tsx           # KPI metric cards
│   ├── ChartCard.tsx         # Chart visualization component
│   ├── DataTable.tsx         # Data table component
│   └── DataInputForm.tsx     # Data editing form
├── lib/
│   └── data.ts               # Data models and initial data
└── public/                   # Static assets
```

## Data Structure

The dashboard manages the following EHS metrics:

### Core EHS Metrics
- Total Number of Accidents
- Number of First Aid Cases
- Number of Medical Cases
- Number of Ill Health Cases
- Number of Lost Time Accident Cases
- Number of EHS Walks
- Number of EHS Risk Assessments

### Training & Reporting
- Target Training Hours
- Actual Training Hours
- Target Hazard Reporting
- Actual Number of Hazards Reported
- Actual Near Misses Reported
- Target Leading Indicator Index (LII)

### Resource Consumption
- Total Electricity Consumed (KWH)
- Total Gas Consumed (meter cube)
- Water Consumption (US Gallons)
- Number of Paper Sheets Consumed
- Carbon Footprint

## Usage

1. **Viewing Data**: Navigate through the dashboard to view all EHS metrics in tables and charts.

2. **Editing Data**: Click the "Edit Data" button on any data table to open the editing form. Update values for any month and save changes.

3. **Theme Toggle**: Use the theme toggle button in the sidebar to switch between light and dark modes.

## Technologies Used

- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Charting library for React
- **Lucide React**: Icon library

## Building for Production

```bash
npm run build
npm start
```

## License

This project is private and proprietary.

