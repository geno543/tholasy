import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SmartImage from '../components/ui/SmartImage'

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const features = [
    {
      title: 'Blender & SolidWorks',
      description: 'Learn both popular 3D software programs used in creative and engineering fields.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Practical Training',
      description: 'Focus on real-world skills you can use in actual projects.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Build Your Portfolio',
      description: 'Create projects that demonstrate your skills to potential employers.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      title: 'Flexible Learning',
      description: 'Learn at your own pace with structured course materials and support.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ]

  const courses = [
    {
      title: 'Blender Course',
      duration: 'Self-paced',
      level: 'All Levels',
      description: 'Learn 3D modeling, animation, and rendering with Blender.',
      highlights: ['Modeling', 'Sculpting', 'Animation', 'Rendering'],
      gradient: 'from-orange-500 to-red-600',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png',
    },
    {
      title: 'SolidWorks Course',
      duration: 'Self-paced',
      level: 'All Levels',
      description: 'Learn CAD design for engineering and product development.',
      highlights: ['CAD Design', 'Assembly', 'Simulation', 'Technical Drawing'],
      gradient: 'from-blue-500 to-indigo-600',
      image: 'https://tse1.mm.bing.net/th/id/OIP.jOUZz6LPbwDieoKvVN7JfwHaEO?rs=1&pid=ImgDetMain',
    },
  ]

  const testimonials = [
    {
      name: 'Ahmed Mohamed',
      role: 'Graduate',
      content: 'The Blender course helped me understand the fundamentals and start creating my own projects.',
      avatar: 'AM',
    },
    {
      name: 'Kareem Hassan',
      role: 'Graduate',
      content: 'Good introduction to SolidWorks. The course materials were clear and well-organized.',
      avatar: 'KH',
    },
    {
      name: 'Sara Ali',
      role: 'Graduate',
      content: 'Learned a lot about 3D modeling. The practical examples were really helpful.',
      avatar: 'SA',
    },
  ]

  const stats = [
    { number: '25', label: 'Graduates' },
    { number: 'Quality', label: 'Over Quantity' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 text-white min-h-[90vh] flex items-center">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Gradient Overlays for Depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 lg:pr-8">
              <div className="inline-block">
                <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border border-red-500/30">
                  🚀 Professional 3D Design Training
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Master
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-orange-500">
                  3D Design
                </span>
                With Experts
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Transform your creativity into reality with professional training in 
                <span className="text-orange-400 font-semibold"> Blender</span> and 
                <span className="text-red-400 font-semibold"> SolidWorks</span>. 
                Learn from industry experts and build a stunning portfolio.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link 
                  to="/enrollment" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Learning Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
                <Link 
                  to="/courses" 
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Explore Courses
                </Link>
              </div>

              {/* Stats with Modern Design */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image - Modern Design */}
            <div className="relative lg:h-[600px]">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-3xl blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl" />
              
              {/* Main Image Container */}
              <div className="relative z-10 h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-gray-800 to-gray-900 transform hover:scale-[1.02] transition-transform duration-500">
                <SmartImage
                  src="/images/hero-3d-design.jpg"
                  fallback="https://images.pexels.com/photos/2377965/pexels-photo-2377965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="3D Design - Blender and SolidWorks"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Professional Tools</div>
                      <div className="text-gray-300 text-sm">Blender & SolidWorks</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Small floating cards */}
              <div className="absolute top-8 -left-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl hidden lg:block animate-pulse">
                <div className="text-2xl">🎨</div>
              </div>
              <div className="absolute top-24 -right-4 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-xl hidden lg:block animate-pulse" style={{animationDelay: '1s'}}>
                <div className="text-2xl">⚙️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What We Offer</h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Structured courses to help you learn 3D design and CAD software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-dark-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Available Courses</h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Two comprehensive programs to get you started with 3D design.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <div
                key={index}
                className="card group hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden rounded-t-2xl">
                  <SmartImage
                    src={course.image}
                    fallback={index === 0
                      ? 'https://placehold.co/800x450?text=Blender+Course'
                      : 'https://placehold.co/800x450?text=SolidWorks+Course'
                    }
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-70`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-3xl font-display font-bold text-white">{course.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex gap-4 mb-4">
                    <span className="badge bg-primary-100 text-primary-700">{course.duration}</span>
                    <span className="badge bg-dark-100 text-dark-700">{course.level}</span>
                  </div>
                  <p className="text-dark-600 mb-6">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {course.highlights.map((highlight) => (
                      <span key={highlight} className="px-3 py-1 bg-dark-50 text-dark-700 rounded-lg text-sm">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/courses"
                    className="text-primary-600 font-medium flex items-center gap-2 group-hover:gap-4 transition-all"
                  >
                    Learn More
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="btn btn-primary">
              View All Courses
            </Link>
          </div>
        </div>
      </section>



      {/* Student Work Gallery */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Student Work</h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              See what our students have created after completing their courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <SmartImage
                  src={`/images/IMG-20251101-WA007${num - 1}.jpg`}
                  fallback={`https://placehold.co/400x400?text=Student+Work+${num}`}
                  alt={`Student work ${num}`}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">Student Project</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What Students Say</h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              Feedback from people who completed our courses.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="flex-1">
                  <p className="text-xl text-dark-700 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div>
                    <div className="font-semibold text-dark-900">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-dark-600">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-primary-600 w-8'
                        : 'bg-dark-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-dark-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-dark-200 mb-8">
              Check out our courses and see if THOLASY is right for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/enrollment" className="btn btn-primary bg-primary-600 hover:bg-primary-700">
                Sign Up
              </Link>
              <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-dark-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
