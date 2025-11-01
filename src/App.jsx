import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseViewer from './pages/CourseViewer'
import Enrollment from './pages/Enrollment'
import About from './pages/About'
import Contact from './pages/Contact'

function AppContent() {
  const location = useLocation()
  const isCoursePage = location.pathname.startsWith('/course/')

  return (
    <div className="min-h-screen flex flex-col">
      {!isCoursePage && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<CourseViewer />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isCoursePage && <Footer />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
