# THOLASY - 3D Design Training Platform

A modern, professional website for THOLASY - a boutique 3D design training program specializing in Blender and SolidWorks education with limited enrollment (15 students per cohort).

## 🎨 Features

- **Modern Design**: Clean, professional UI built with React and Tailwind CSS
- **Responsive**: Fully responsive across all devices
- **Interactive**: Smooth animations and transitions
- **Course Showcase**: Detailed information about Blender and SolidWorks programs
- **Enrollment System**: Complete enrollment form with validation and seat tracking
- **Multiple Pages**: Home, Courses, About, Contact, and Enrollment pages
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Fonts** - Inter and Space Grotesk from Google Fonts

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
THOLASY/
├── src/
│   ├── components/
│   │   └── layout/
│   │       ├── Header.jsx      # Navigation header with mobile menu
│   │       └── Footer.jsx      # Footer with links and social media
│   ├── pages/
│   │   ├── Home.jsx           # Landing page with hero and features
│   │   ├── Courses.jsx        # Course catalog and details
│   │   ├── Enrollment.jsx     # Application form with validation
│   │   ├── About.jsx          # Company info and team
│   │   └── Contact.jsx        # Contact form and information
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx               # App entry point
│   └── index.css              # Global styles and Tailwind imports
├── public/                    # Static assets
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js             # Vite configuration
└── README.md                  # This file
```

## 🎯 Key Features

### Home Page
- Hero section with compelling call-to-action
- Feature highlights (limited enrollment, expert instructors, etc.)
- Course previews
- Statistics showcase
- Student testimonials carousel
- Call-to-action sections

### Courses Page
- Detailed Blender and SolidWorks program information
- Expandable curriculum details
- Pricing and duration information
- Bundle offer promotion
- FAQ section

### Enrollment Page
- Multi-step application form
- Form validation
- Seats remaining alert (currently showing 8/15)
- Payment plan selection
- Success confirmation screen

### About Page
- Company mission and values
- Team member profiles
- Timeline of company history
- Statistics and achievements

### Contact Page
- Contact form with validation
- Multiple contact methods
- Office hours and location
- Quick FAQ section
- Social media links

## 🎨 Design Philosophy

- **Not AI-Generated Looking**: Uses custom layouts, real design principles, and authentic content structure
- **Modern & Professional**: Clean aesthetics with purposeful use of gradients and shadows
- **User-Focused**: Clear navigation, obvious CTAs, and intuitive user flows
- **Boutique Feel**: Emphasizes the limited enrollment and personalized experience

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Then drag and drop the dist folder to Netlify
```

## 📝 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary colors (blue tones)
- Dark colors (slate tones)

### Content
- Update course details in `src/pages/Courses.jsx`
- Modify team members in `src/pages/About.jsx`
- Change contact information in `src/pages/Contact.jsx`
- Adjust enrollment seat limits in `src/pages/Enrollment.jsx`

### Fonts
Current fonts (Inter and Space Grotesk) can be changed in `index.html` and `tailwind.config.js`

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📄 License

This project is created for THOLASY. All rights reserved.

## 🤝 Contributing

For any questions or contributions, please contact the development team.

---

Built with ❤️ for THOLASY - Empowering the next generation of 3D designers
