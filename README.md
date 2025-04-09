# QuickForget Clone

A secure secret sharing platform that allows users to create self-destructing messages with customizable expiration times and view counts.

## Features

- End-to-end encryption for secure secret sharing
- Password protection for sensitive secrets
- Customizable expiration times
- View count control
- Team collaboration features
- Subscription-based pricing plans
- Slack integration
- Modern and responsive UI

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: Firebase Auth
- Payments: Stripe
- Notifications: React Hot Toast
- Icons: React Icons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quickforget-clone.git
cd quickforget-clone/frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
frontend/
├── components/         # Reusable UI components
├── pages/             # Next.js pages
│   ├── api/           # API routes
│   ├── _app.js        # App wrapper
│   ├── index.js       # Home page
│   ├── create.js      # Create secret page
│   ├── view/[id].js   # View secret page
│   ├── pricing.js     # Pricing page
│   └── about.js       # About page
├── public/            # Static assets
├── styles/            # Global styles
├── .env              # Environment variables
├── next.config.js     # Next.js configuration
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- QuickForget.com for inspiration
- Next.js team for the amazing framework
- Tailwind CSS team for the utility-first CSS framework
- All contributors and maintainers 