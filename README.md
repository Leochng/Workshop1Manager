# Workshop1Manager

A comprehensive workshop management system built with Next.js and Firebase, designed to help users manage their vehicles, service history, and appointments.

## Features

- 🔐 **User Authentication**
  - Secure signup and login
  - Email verification system
  - Password reset functionality

- 🚗 **Vehicle Management**
  - Add, edit, and remove vehicles
  - Track vehicle details
  - Maintain service records

- 📅 **Appointment System**
  - Book service appointments
  - Multiple time slots available
  - Various service types
  - Appointment cancellation

- 📋 **Service History**
  - Track all service records
  - Detailed service information
  - Workshop details tracking

- 🌐 **Multi-language Support**
  - English
  - Bahasa Malaysia

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.0 or higher installed
- Git for version control
- Firebase project credentials

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/workshop1manager.git
cd workshop1manager
```

1. Install dependencies:

```bash
npm install
```

1. Set up environment variables:

Create a `.env.local` file with the following:

```ini
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Workshop1Manager

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_MULTILANG=true
```

## Development

Start the development server:

```bash
npm run dev
```

Access the application at [http://localhost:3000](http://localhost:3000)

## Project Structure

```plaintext
src/
├── app/                    # Next.js pages and routes
│   ├── (auth)/            # Authentication related pages
│   ├── dashboard/         # Protected dashboard routes
│   ├── profile/           # User profile pages
│   ├── vehicles/          # Vehicle management pages
│   ├── appointments/      # Appointment management pages
│   ├── service-history/   # Service history pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── auth/             # Authentication components
├── lib/                  # Utilities and configurations
│   ├── firebase.ts      # Firebase setup and utilities
│   ├── AuthContext.tsx  # Authentication context
│   ├── ProtectedRoute.tsx # Route protection
│   └── utils.ts         # Helper functions
└── middleware.ts        # Next.js middleware
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests with DOM environment

## Coding Standards

1. **TypeScript**
   - Use TypeScript for all new files
   - Maintain proper type definitions
   - Avoid using `any` type

2. **Components**
   - Use functional components
   - Implement proper prop typing
   - Keep components focused and reusable

3. **State Management**
   - Use React hooks for state
   - Implement context where needed
   - Keep state close to where it's used

4. **Styling**
   - Use Tailwind CSS classes
   - Follow design system tokens
   - Maintain dark mode compatibility

5. **Security**
   - Always use Protected Routes
   - Validate user permissions
   - Sanitize user inputs

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue in the GitHub repository or contact [workshop1manager@support.com](mailto:workshop1manager@support.com)
