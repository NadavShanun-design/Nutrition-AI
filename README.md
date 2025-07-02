# NutriGen - AI-Powered Personalized Diet Plan Generator

An intelligent web application that generates personalized diet plans using OpenAI's GPT-4o, with support for PDF document analysis and custom nutrition goals.

![NutriGen Demo](./generated-icon.png)

## Features

- **AI-Powered Diet Plans**: Leverages OpenAI GPT-4o for intelligent meal planning
- **Multi-Step Form**: Intuitive step-by-step data collection
- **PDF Upload Support**: Analyze nutrition documents and medical reports
- **Personalized Metrics**: Age, gender, weight, height, activity level tracking
- **Nutrition Goals**: Weight loss, muscle gain, maintenance, health improvement
- **Responsive Design**: Beautiful UI with Tailwind CSS and shadcn/ui components
- **Real-time Generation**: Instant diet plan creation with loading states

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Wouter** for routing
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with Drizzle ORM
- **OpenAI API** integration
- **PDF parsing** capabilities
- **Multer** for file uploads

### Database
- **PostgreSQL** with Neon serverless
- **Drizzle ORM** for type-safe database operations
- **Zod** for schema validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NadavShanun-design/Nutrition-AI.git
cd Nutrition-AI
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage

1. **Personal Metrics**: Enter your age, gender, weight, height, activity level, and dietary restrictions
2. **Nutrition Goals**: Select your primary goal (weight loss, muscle gain, etc.) and set targets
3. **PDF Upload** (Optional): Upload nutrition documents or medical reports for additional context
4. **Generate Plan**: AI creates a personalized diet plan with breakfast, lunch, dinner, and snacks

## API Endpoints

- `POST /api/diet-plan` - Generate personalized diet plan
  - Accepts form data with personal metrics, nutrition goals, and optional PDF file
  - Returns structured meal plan with nutritional information

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── routes.ts          # API routes
│   ├── openai.ts          # OpenAI integration
│   ├── pdf.ts             # PDF processing
│   ├── db.ts              # Database connection
│   └── storage.ts         # Data storage layer
├── shared/                # Shared types and schemas
│   ├── types.ts           # TypeScript interfaces
│   └── schema.ts          # Database schemas
└── package.json           # Dependencies and scripts
```

## Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `password_hash` - Hashed password
- `created_at` - Account creation timestamp

### Diet Plans Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `personal_metrics` - JSON object with user metrics
- `nutrition_goals` - JSON object with goals
- `generated_plan` - JSON object with meal plan
- `created_at` - Plan generation timestamp

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4o | Yes |
| `PGHOST` | PostgreSQL host | Auto-set |
| `PGPORT` | PostgreSQL port | Auto-set |
| `PGUSER` | PostgreSQL username | Auto-set |
| `PGPASSWORD` | PostgreSQL password | Auto-set |
| `PGDATABASE` | PostgreSQL database name | Auto-set |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio
