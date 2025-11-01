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
      <section className="relative overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container-custom relative section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="heading-xl">
                Learn 3D Design
              </h1>
              
              <p className="text-xl text-dark-200 leading-relaxed">
                Professional training in Blender and SolidWorks. Build real skills for 3D modeling, animation, and CAD design.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/enrollment" className="btn btn-primary bg-white text-dark-900 hover:bg-dark-50">
                  Get Started
                </Link>
                <Link to="/courses" className="btn btn-outline border-white text-white hover:bg-white hover:text-dark-900">
                  View Courses
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 pt-4">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-primary-300">{stat.number}</div>
                    <div className="text-dark-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <SmartImage
                  src="https://images.pexels.com/photos/2377965/pexels-photo-2377965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  fallback="https://placehold.co/1120x630?text=Blender+Workspace"
                  alt="Blender modeling workspace"
                  className="w-full h-full object-cover"
                />
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
