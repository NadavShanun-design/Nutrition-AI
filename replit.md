# NutriGen - AI-Powered Diet Plan Generator

## Project Overview
NutriGen is a comprehensive web application that generates personalized diet plans using OpenAI's GPT-4o. The application features a multi-step form interface for collecting user data, PDF upload capabilities for analyzing nutrition documents, and intelligent meal planning with detailed nutritional information.

**Current Status**: Fully functional with complete frontend and backend implementation
**Last Updated**: January 2, 2025

## User Preferences
- Communication: Simple, everyday language preferred (non-technical user)
- Documentation: Comprehensive GitHub-ready documentation created

## Project Architecture

### Frontend (React + TypeScript)
- **Pages**: Single-page application with home page and 404 handling
- **Components**: 
  - Multi-step form (PersonalMetrics → NutritionGoals → FileUpload)
  - Diet plan display with meal cards
  - Complete shadcn/ui component library
- **State Management**: TanStack Query for server state, React Hook Form for form state
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with shadcn/ui components

### Backend (Node.js + Express)
- **API Routes**: Single POST endpoint `/api/diet-plan` for generating plans
- **OpenAI Integration**: GPT-4o for intelligent meal planning
- **PDF Processing**: Text extraction from uploaded nutrition documents
- **Database**: PostgreSQL with Drizzle ORM
- **File Handling**: Multer for multipart form uploads

### Database Schema
- **Users Table**: Authentication and user management
- **Diet Plans Table**: Storing generated plans with user metrics and goals
- **Storage Interface**: Abstracted storage layer with database implementation

### Key Features Implemented
- ✓ Multi-step form with validation
- ✓ PDF upload and text extraction
- ✓ OpenAI GPT-4o integration for diet plan generation
- ✓ Responsive design with professional UI
- ✓ PostgreSQL database with proper schemas
- ✓ Type-safe API with Zod validation
- ✓ Error handling and loading states
- ✓ Toast notifications for user feedback

## Recent Changes

### January 2, 2025
- ✓ Created comprehensive README.md for GitHub repository
- ✓ Updated .gitignore with proper exclusions for environment files
- ✓ Added .env.example template for easy setup
- ✓ Created MIT license file
- ✓ Documented complete project architecture
- → Prepared project for GitHub upload to NadavShanun-design/Nutrition-AI

### Previous Implementation
- ✓ Complete React frontend with TypeScript
- ✓ Express backend with OpenAI integration
- ✓ PostgreSQL database with Drizzle ORM
- ✓ PDF processing capabilities
- ✓ Multi-step form with personal metrics and nutrition goals
- ✓ AI-powered diet plan generation
- ✓ Responsive UI with shadcn/ui components

## Technical Stack
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **AI**: OpenAI GPT-4o API
- **File Processing**: PDF.js for text extraction
- **Validation**: Zod schemas
- **Forms**: React Hook Form with zodResolver
- **State**: TanStack Query v5

## Environment Requirements
- Node.js 18+
- PostgreSQL database
- OpenAI API key
- Environment variables: DATABASE_URL, OPENAI_API_KEY

## Next Steps
User requested to upload project to GitHub repository: https://github.com/NadavShanun-design/Nutrition-AI

The project is now fully documented and ready for GitHub upload with:
- Comprehensive README.md
- Proper .gitignore
- Environment template (.env.example)
- MIT License
- Complete codebase with all features functional