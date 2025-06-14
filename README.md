# StakeCrypto - Crypto Deposit Platform

A modern, secure cryptocurrency deposit platform built with Next.js 14, Supabase, and Tailwind CSS. Features Bitcoin and Ethereum wallet management with a sleek, Stake.com-inspired dark theme.

## 🚀 Features

- **Authentication**: Google OAuth and SMS phone verification via Supabase
- **Wallet Management**: Dedicated BTC and ETH deposit addresses per user
- **Deposit Simulation**: Mock deposit functionality for testing
- **Withdrawal Requests**: Placeholder withdrawal system with address validation
- **Security**: 2FA toggle, secure user profiles, and fraud detection warnings
- **Modern UI**: Dark theme with neon accents, responsive design, and smooth animations
- **Real-time Updates**: Live balance tracking and transaction history

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Authentication**: Supabase Auth (Google OAuth, Phone/SMS)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS, Shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/noahwilliamshaffer/gamblingv2.git
cd gamblingv2
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Setup

Execute the following SQL in your Supabase SQL editor:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  btc_address TEXT,
  eth_address TEXT
);

-- Create deposits table
CREATE TABLE deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  currency TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create withdrawals table
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  currency TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own data" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own deposits" ON deposits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own deposits" ON deposits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own withdrawals" ON withdrawals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own withdrawals" ON withdrawals
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

### 5. Configure Authentication

In your Supabase dashboard:

1. **Enable Google OAuth**:
   - Go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials

2. **Enable Phone Authentication**:
   - Go to Authentication > Providers
   - Enable Phone provider
   - Configure SMS settings (Twilio recommended)

3. **Set Site URL**:
   - Go to Authentication > URL Configuration
   - Set Site URL to `http://localhost:3000` (development)
   - Add redirect URLs for production

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Pages & Features

### Authentication (`/login`)
- Google OAuth sign-in
- Phone number + SMS verification
- Automatic account creation with crypto addresses
- Security warnings and 2FA prompts

### Dashboard (`/dashboard`)
- Account overview and balance display
- Quick access to wallet addresses
- Recent transaction history
- Quick action buttons for deposits/withdrawals

### Deposit (`/wallet/deposit`)
- BTC and ETH wallet addresses with copy functionality
- QR code generation (placeholder)
- Deposit simulation for testing
- Step-by-step deposit instructions

### Withdraw (`/wallet/withdraw`)
- Address validation for BTC/ETH
- Withdrawal amount input
- Security checks and warnings
- Demo mode with simulated transactions

### Settings (`/settings`)
- Profile information display
- 2FA toggle functionality
- Security settings overview
- Account management options

## 🔐 Security Features

- **Row Level Security**: Database-level access controls
- **Address Validation**: Client-side crypto address validation
- **2FA Support**: User metadata-based two-factor authentication
- **Fraud Detection**: Multiple account warnings and monitoring
- **Secure Authentication**: Supabase managed auth with OAuth and SMS

## 🎨 UI/UX Features

- **Dark Theme**: Stake.com-inspired design with neon accents
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Loading States**: Proper loading indicators and error handling
- **Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables
4. Deploy automatically

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anonymous_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Additional configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/noahwilliamshaffer/gamblingv2/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Roadmap

- [ ] Real cryptocurrency integration
- [ ] Advanced portfolio analytics
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] Advanced trading features
- [ ] KYC/AML compliance integration

---

**⚠️ Disclaimer**: This is a demonstration platform. Do not use with real cryptocurrency or sensitive financial information without proper security audits and compliance measures. 