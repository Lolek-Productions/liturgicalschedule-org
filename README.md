# Liturgical Schedule

A comprehensive liturgical planning and scheduling application designed specifically for Catholic parishes. Streamline your parish's liturgical celebrations, minister scheduling, and scripture readings management with modern web technologies.

## ✨ Features

- **📅 Liturgical Calendar Management** - Complete liturgical calendar with feast days, seasons, and proper readings
- **👥 Minister Scheduling** - Effortlessly schedule lectors, ushers, extraordinary ministers, and all liturgical roles
- **📖 Scripture Readings Manager** - Organize daily and Sunday readings with preparation notes
- **⛪ Mass Planning Tools** - Comprehensive planning for each celebration including music and environment
- **🔔 Automated Notifications** - Automatic reminders for ministers and staff
- **📊 Reporting & Analytics** - Generate detailed reports for parish leadership
- **🎨 Modern UI/UX** - Beautiful, accessible interface built with modern design principles
- **🔐 Secure & Reliable** - Built with parish privacy and data security in mind

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: Supabase Auth
- **Calendar**: [React Big Calendar](https://github.com/jquense/react-big-calendar)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Vercel

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lolek-Productions/liturgicalschedule-org.git
   cd liturgicalschedule-org
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
liturgicalschedule-org/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   │   ├── dashboard/     # Dashboard
│   │   ├── calendar/      # Calendar views
│   │   ├── daily/         # Daily schedule
│   │   ├── weekly/        # Weekly schedule
│   │   ├── monthly/       # Monthly schedule
│   │   ├── yearly/        # Yearly calendar
│   │   └── training/      # Training modules
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions and configurations
├── contexts/             # React contexts
├── public/               # Static assets
└── types/                # TypeScript type definitions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

## 🎨 Design System

This project uses a comprehensive design system built with:

- **shadcn/ui** for consistent, accessible components
- **Tailwind CSS** for utility-first styling
- **CSS Variables** for theme customization
- **Dark/Light mode** support
- **Responsive design** for all screen sizes

## 🔐 Authentication & Security

- Secure authentication powered by Supabase Auth
- Row Level Security (RLS) for data protection
- Role-based access control
- Secure API routes with middleware protection

## 📱 Features Overview

### Dashboard
- Quick overview of upcoming liturgical events
- Minister assignment status
- Recent activity feed

### Calendar Management
- Multiple calendar views (daily, weekly, monthly, yearly)
- Liturgical season color coding
- Event creation and editing
- Recurring event support

### Minister Scheduling
- Drag-and-drop scheduling interface
- Automated conflict detection
- Email/SMS notifications
- Availability management

### Training Module
- Video-based training for ministers
- Progress tracking
- Certification management

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the Catholic Church
- Special thanks to all parish volunteers and liturgical coordinators
- Inspired by the need for modern tools in traditional worship

## 📞 Support

For support, please:
- Open an issue on GitHub
- Contact us at fr.josh@lolekproductions.org
- Visit our documentation at [docs.liturgicalschedule.org](https://docs.liturgicalschedule.org)

---

**Made with ❤️ for Catholic Parishes**
