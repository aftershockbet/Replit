# Elite Streaks - Football Team Performance Tracker

## Overview

Elite Streaks is a web application designed to track and analyze football team performance streaks across elite domestic leagues. The app focuses on identifying teams with winning and drawing streak patterns, providing users with insights into team form across major European leagues including Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Liga Portugal, Eredivisie, and MLS.

The application uses a modern sports app design aesthetic with dark theme by default, optimized for data visualization and mobile-first experiences. It displays team streak information through interactive cards showing recent match results and streak patterns.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 2025)

### ML-Based Forecasting (Latest)
- **Prediction Engine**: Implemented machine learning model using scikit-learn Logistic Regression to predict streak continuation
- **Feature Engineering**: Extracts 6+ features including streak length, win/loss margins, days since last event, historical longest streak, home/away influence, and league position
- **API Endpoints**: Added `/api/predict/team` and `/api/predict/player` for real-time ML predictions
- **UI Integration**: All team and player components (cards and list views) now display confidence scores with Sparkles icon
- **Confidence Display**: Shows percentage likelihood of streak continuation (e.g., "75% Continue" or "30% Break")
- **Python Service**: Backend ML service at `server/ml/streak_predictor.py` handles model training and predictions

### League Filter Enhancements
- **Top Leagues Ordering**: Implemented explicit ordering for top 12 elite leagues (England, France, Germany, Italy, Netherlands, Portugal, Spain) with 1st and 2nd divisions prioritized
- **Smart Sorting**: Added division-level detection for alphabetically sorted leagues - 1st divisions now appear before 2nd divisions within each country
- **League Corrections**: Fixed league IDs (liga-portugal, segunda-division) and names (Colombia now shows "Primera A"/"Primera B" without "Categoría" prefix)
- **Belgium Leagues**: Added Jupiter Pro League (1st division) and Challenger Pro League (2nd division)

### Head-to-Head Features
- **H2H Page**: Created dedicated head-to-head page showing last 10 encounters between teams in the same competition
- **Navigation**: H2H button positioned next to Next Fixture section for intuitive access
- **Match History**: Displays complete match history including dates, scores, and results

### Visual Enhancements
- **Custom Goalscorer Icon**: Replaced default tab icon with custom image (goalscorer-icon.png)
- **Country Flags**: All leagues display with country flags only (no league logos) for consistency

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing with dedicated H2H match history page
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system optimized for sports apps
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture  
- **Framework**: Express.js with TypeScript for the REST API server
- **Data Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Design**: RESTful endpoints with `/api` prefix for clear separation
- **ML Service**: Python-based machine learning service using scikit-learn for streak prediction
  - **Model**: Logistic Regression classifier with synthetic training data
  - **Features**: Streak length, margins, time decay, home/away, league position
  - **Endpoints**: `/api/predict/team` and `/api/predict/player` for real-time predictions

### Design System
- **Theme**: Dark-first design with system-based approach inspired by ESPN and The Athletic
- **Typography**: Inter font family with consistent weight hierarchy
- **Color Palette**: Dark navy background with vibrant accent colors for wins (green), draws (yellow), and losses (red)
- **Components**: Modular component architecture with reusable UI elements for streaks, teams, and filtering

### Data Structure
- **Teams**: Core entity with league association and recent match history
- **Leagues**: Predefined set of elite domestic competitions with country flags
- **Streak Patterns**: Sophisticated pattern matching system for identifying winning and drawing streaks
- **Match Results**: Historical data stored as W/D/L with opponent and date information

### Component Architecture
- **Dashboard**: Main application view with tabbed interface for streak types
- **Team Cards**: Individual team display components with streak visualization
- **Filters**: League filtering and search functionality
- **Status Indicators**: Real-time connection and update status display
- **Theme System**: Light/dark mode toggle with persistent preferences

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL serverless database driver
- **drizzle-orm**: Type-safe ORM for database operations with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching
- **date-fns**: Date manipulation and formatting utilities

### UI/UX Dependencies  
- **@radix-ui/react-***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for rapid styling
- **class-variance-authority**: Type-safe variant API for component styling
- **cmdk**: Command palette and search interface components
- **embla-carousel-react**: Touch-friendly carousel components

### Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking for enhanced development experience
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **drizzle-kit**: Database migration and schema management toolkit

### Styling and Theme
- **Google Fonts**: Inter font family loaded via CDN
- **CSS Custom Properties**: Design token system for consistent theming
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints