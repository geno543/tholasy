import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const CourseViewer = () => {
  const { courseId } = useParams()
  const [currentSession, setCurrentSession] = useState(0)
  const [completedSessions, setCompletedSessions] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showEmailPrompt, setShowEmailPrompt] = useState(true)
  
  // Check if user is enrolled and approved
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(() => {
    // Check if email is already saved
    const savedEmail = localStorage.getItem('userEmail')
    const savedPassword = localStorage.getItem('userPassword')
    if (savedEmail && savedPassword) {
      setUserEmail(savedEmail)
      setUserPassword(savedPassword)
      setShowEmailPrompt(false)
      checkEnrollmentStatus(savedEmail, savedPassword)
    }
  }, [courseId])

  const checkEnrollmentStatus = async (email, password) => {
    try {
      // Check Supabase first
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .eq('status', 'approved')
        .in('course', [courseId, 'bundle'])
      
      if (error) {
        console.error('Error checking enrollment:', error)
        // Fallback to localStorage
        const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
        const userEnrollment = enrollments.find(
          e => e.email === email && 
          e.password === password &&
          (e.course === courseId || e.course === 'bundle') && 
          e.status === 'approved'
        )
        setIsEnrolled(!!userEnrollment)
        return
      }
      
      setIsEnrolled(data && data.length > 0)
    } catch (err) {
      console.error('Unexpected error checking enrollment:', err)
      // Fallback to localStorage
      const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
      const userEnrollment = enrollments.find(
        e => e.email === email && 
        e.password === password &&
        (e.course === courseId || e.course === 'bundle') && 
        e.status === 'approved'
      )
      setIsEnrolled(!!userEnrollment)
    }
  }

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (userEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      if (!userPassword || userPassword.length < 6) {
        alert('Please enter a valid password (minimum 6 characters)')
        return
      }
      localStorage.setItem('userEmail', userEmail)
      localStorage.setItem('userPassword', userPassword)
      setShowEmailPrompt(false)
      checkEnrollmentStatus(userEmail, userPassword)
    } else {
      alert('Please enter a valid email address')
    }
  }

  const courses = {
    blender: {
      title: 'Blender Course',
      subtitle: '3D Modeling & Animation',
      totalSessions: 10,
      sessions: [
        {
          id: 0,
          title: 'Free Preview Session',
          description: 'Get a preview of what you\'ll learn in the Blender course',
          duration: '15 min',
          videoUrl: 'https://drive.google.com/file/d/1OJRr1QUeuZsqZIvZb5BzLI-8tchvZoa3/view?usp=drive_link',
          isFree: true
        },
        {
          id: 1,
          title: 'Session 1: Interface & Basics',
          description: 'Learning the interface and getting the basics and tool functions',
          duration: '45 min',
          videoUrl: 'https://drive.google.com/file/d/1OdEzIntGiK8qhjLVs-O4Jzkaiw4PnUDM/view?usp=drive_link',
          isFree: false
        },
        {
          id: 2,
          title: 'Session 2: First Modeling Practice',
          description: 'Modeling a simple design to apply the tools',
          duration: '50 min',
          videoUrl: 'https://drive.google.com/file/d/1szwz8MS9hJktSjGi5b8kxJTk9QBOiBw2/view?usp=drive_link',
          isFree: false
        },
        {
          id: 3,
          title: 'Session 3: Progressive Modeling',
          description: 'Practice more designs and models, gradually with the difficulties',
          duration: '55 min',
          videoUrl: 'https://drive.google.com/file/d/15TBI4XGHs1EjZmqtBPj4br72yc3NR-AM/view?usp=drive_link',
          isFree: false
        },
        {
          id: 4,
          title: 'Session 4: Shading & Materials',
          description: 'Shading and coloring the models, difference between materials\' properties',
          duration: '60 min',
          videoUrl: 'https://drive.google.com/file/d/1Q-2yg9Cw_ZMkLem6oVznFAq7ACQHzu1d/view?usp=drive_link',
          isFree: false
        },
        {
          id: 5,
          title: 'Session 5: Lighting & Rendering',
          description: 'Practice on the lightning and types of render',
          duration: '50 min',
          videoUrl: 'https://drive.google.com/file/d/1YoJz5V-XBqFAL_hzxzP0XqJACjO8WJWI/view?usp=drive_link',
          isFree: false
        },
        {
          id: 6,
          title: 'Session 6: Camera Operations',
          description: 'Learning about the camera and how to move it',
          duration: '40 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 7,
          title: 'Session 7: Exam & Future Planning',
          description: 'Exam session and know the future plan',
          duration: '30 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 8,
          title: 'Session 8: Animation Basics',
          description: 'Learning the basics of animation',
          duration: '55 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 9,
          title: 'Session 9: Complete Design Project',
          description: 'Build a complete design using all the previous knowledge',
          duration: '70 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 10,
          title: 'Session 10: Advanced Challenges',
          description: 'More advanced designs and complex modeling challenges',
          duration: '65 min',
          videoUrl: null,
          isFree: false
        }
      ]
    },
    solidworks: {
      title: 'SolidWorks Course',
      subtitle: 'CAD Design',
      totalSessions: 8,
      sessions: [
        {
          id: 1,
          title: 'Session 1: Welcome to SolidWorks',
          description: 'Installation & Interface Navigation',
          duration: '40 min',
          videoUrl: 'https://drive.google.com/file/d/1LHZWNl1f8dKFdxp5RzJz-AvdxCr9pj52/view?usp=drive_link',
          isFree: false
        },
        {
          id: 2,
          title: 'Session 2: Foundations of 2D Sketching',
          description: 'Tools & Relations',
          duration: '50 min',
          videoUrl: 'https://drive.google.com/file/d/1DQBdFc5r9kEeDgsUp0bdhiZslr3W1gy7/view?usp=drive_link',
          isFree: false
        },
        {
          id: 3,
          title: 'Session 3: Advanced 2D Sketching & Workshop',
          description: 'Patterns, Trim, & Offset',
          duration: '55 min',
          videoUrl: 'https://drive.google.com/file/d/1D83K6DuZFq9Wc0Kp5V-aG9jpQei0m2cX/view?usp=drive_link',
          isFree: false
        },
        {
          id: 4,
          title: 'Session 4: Introduction to 3D Part Modeling',
          description: 'Extrude & Revolve Features',
          duration: '60 min',
          videoUrl: 'https://drive.google.com/file/d/1zoi7KEDtgxbdAo9akos3R3t5uGGrtXBK/view?usp=drive_link',
          isFree: false
        },
        {
          id: 5,
          title: 'Session 5: Advanced 3D Features & Workshop',
          description: 'Sweep, Loft, & Hole Wizard',
          duration: '65 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 6,
          title: 'Session 6: Assembly Design',
          description: 'Mating Parts & Creating Sub-Assemblies',
          duration: '70 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 7,
          title: 'Session 7: Introduction to Simulation',
          description: 'Running a Basic Static & Force Analysis',
          duration: '50 min',
          videoUrl: null,
          isFree: false
        },
        {
          id: 8,
          title: 'Session 8: Capstone Project',
          description: 'From Concept to Final Assembly & Drawing',
          duration: '90 min',
          videoUrl: null,
          isFree: false
        }
      ]
    }
  }

  const course = courses[courseId]

  if (!course) {
    return (
      <div className="pt-20 min-h-screen bg-dark-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
          <Link to="/courses" className="btn btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  const currentSessionData = course.sessions[currentSession]

  const canAccessSession = (session) => {
    // Free sessions are always accessible
    if (session.isFree) return true
    // Premium sessions require enrollment
    return isEnrolled
  }

  const handleSessionClick = (index) => {
    const session = course.sessions[index]
    if (canAccessSession(session)) {
      setCurrentSession(index)
    }
  }

  const goToPreviousSession = () => {
    for (let i = currentSession - 1; i >= 0; i--) {
      if (canAccessSession(course.sessions[i])) {
        setCurrentSession(i)
        break
      }
    }
  }

  const goToNextSession = () => {
    for (let i = currentSession + 1; i < course.sessions.length; i++) {
      if (canAccessSession(course.sessions[i])) {
        setCurrentSession(i)
        break
      }
    }
  }

  const hasPreviousAccessibleSession = () => {
    for (let i = currentSession - 1; i >= 0; i--) {
      if (canAccessSession(course.sessions[i])) return true
    }
    return false
  }

  const hasNextAccessibleSession = () => {
    for (let i = currentSession + 1; i < course.sessions.length; i++) {
      if (canAccessSession(course.sessions[i])) return true
    }
    return false
  }

  const toggleComplete = (sessionId) => {
    if (completedSessions.includes(sessionId)) {
      setCompletedSessions(completedSessions.filter(id => id !== sessionId))
    } else {
      setCompletedSessions([...completedSessions, sessionId])
    }
  }

  const getVideoEmbedUrl = (url) => {
    if (!url) return null
    const fileId = url.match(/\/d\/(.+?)\//)?.[1]
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : null
  }

  const completionPercentage = (completedSessions.length / course.sessions.length) * 100

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Email Prompt Modal */}
      {showEmailPrompt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-800 rounded-2xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Login to Access Course</h2>
            <p className="text-dark-300 mb-6">
              Please enter your registered email and password to access the course content.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="input-field bg-dark-700 text-white border-dark-600 w-full"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">Password</label>
                <input
                  type="password"
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  className="input-field bg-dark-700 text-white border-dark-600 w-full"
                  placeholder="Your password"
                  required
                  minLength={6}
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Course Header */}
      <div className="bg-dark-800 border-b border-dark-700">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/courses" className="text-primary-400 hover:text-primary-300 text-sm mb-2 inline-block">
                ← Back to Courses
              </Link>
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
              <p className="text-dark-300">{course.subtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-dark-400 mb-1">Your Progress</div>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-dark-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-600 transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <span className="text-white font-semibold">{Math.round(completionPercentage)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Session List */}
        <div className="w-80 bg-dark-800 border-r border-dark-700 h-[calc(100vh-180px)] overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-bold text-white mb-4">Course Content</h2>
            <div className="space-y-2">
              {course.sessions.map((session, index) => {
                const hasAccess = canAccessSession(session)
                return (
                  <button
                    key={session.id}
                    onClick={() => handleSessionClick(index)}
                    disabled={!hasAccess}
                    className={`w-full text-left p-4 rounded-lg transition-all relative ${
                      currentSession === index
                        ? 'bg-primary-600 text-white'
                        : hasAccess
                        ? 'bg-dark-700 text-dark-200 hover:bg-dark-600'
                        : 'bg-dark-700 text-dark-400 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {session.isFree ? (
                            <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                              FREE
                            </span>
                          ) : !hasAccess ? (
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          ) : null}
                          <span className="text-xs opacity-75">{session.duration}</span>
                        </div>
                        <div className="font-medium text-sm mb-1 line-clamp-2">
                          {session.title}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {hasAccess && completedSessions.includes(session.id) ? (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : hasAccess ? (
                          <div className="w-5 h-5 border-2 border-current rounded-full opacity-50" />
                        ) : null}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content - Video Player */}
        <div className="flex-1">
          <div className="bg-black">
            {!canAccessSession(currentSessionData) ? (
              <div className="flex items-center justify-center bg-dark-800" style={{ height: '600px' }}>
                <div className="text-center text-white max-w-md px-6">
                  <svg className="w-20 h-20 mx-auto mb-6 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-2xl font-bold mb-4">Enroll to Access This Session</h3>
                  <p className="text-dark-300 mb-6">
                    This session is only available to enrolled students. Enroll now to unlock all course content!
                  </p>
                  <Link to="/enrollment" className="btn btn-primary inline-block">
                    Enroll in This Course
                  </Link>
                </div>
              </div>
            ) : currentSessionData.videoUrl ? (
              <div className="relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={getVideoEmbedUrl(currentSessionData.videoUrl)}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                  title={currentSessionData.title}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center bg-dark-800" style={{ height: '600px' }}>
                <div className="text-center text-dark-400">
                  <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-lg">Video Coming Soon</p>
                  <p className="text-sm mt-2">This session content will be available shortly</p>
                </div>
              </div>
            )}
          </div>

          {/* Session Info */}
          <div className="bg-dark-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentSessionData.title}
                </h2>
                <p className="text-dark-300 text-lg mb-4">
                  {currentSessionData.description}
                </p>
              </div>
              {canAccessSession(currentSessionData) && (
                <button
                  onClick={() => toggleComplete(currentSessionData.id)}
                  className={`btn ${
                    completedSessions.includes(currentSessionData.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'btn-primary'
                  } ml-4`}
                >
                  {completedSessions.includes(currentSessionData.id) ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Completed
                    </>
                  ) : (
                    'Mark as Complete'
                  )}
                </button>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-dark-700">
              <button
                onClick={goToPreviousSession}
                disabled={!hasPreviousAccessibleSession()}
                className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Session
              </button>
              
              <div className="text-dark-400 text-sm">
                Session {currentSession + 1} of {course.sessions.length}
              </div>

              <button
                onClick={goToNextSession}
                disabled={!hasNextAccessibleSession()}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Session
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="bg-dark-800 border-t border-dark-700 p-6 mt-4">
            <h3 className="text-lg font-bold text-white mb-4">About This Session</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-dark-700 p-4 rounded-lg">
                <div className="text-primary-400 text-sm mb-1">Duration</div>
                <div className="text-white font-semibold">{currentSessionData.duration}</div>
              </div>
              <div className="bg-dark-700 p-4 rounded-lg">
                <div className="text-primary-400 text-sm mb-1">Session Type</div>
                <div className="text-white font-semibold">
                  {currentSessionData.isFree ? 'Free Preview' : 'Premium Content'}
                </div>
              </div>
              <div className="bg-dark-700 p-4 rounded-lg">
                <div className="text-primary-400 text-sm mb-1">Status</div>
                <div className="text-white font-semibold">
                  {currentSessionData.videoUrl ? 'Available Now' : 'Coming Soon'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseViewer
