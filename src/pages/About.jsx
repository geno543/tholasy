import { Link } from 'react-router-dom'
import SmartImage from '../components/ui/SmartImage'

const About = () => {
  const values = [
    {
      title: 'Practical Skills',
      description: 'Focus on teaching real-world skills that students can actually use.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: 'Project-Based',
      description: 'Learn by doing - work on actual projects throughout the course.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Self-Paced',
      description: 'Learn at your own speed with access to all course materials.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Portfolio Building',
      description: 'Create work samples you can show to potential employers.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ]

  const timeline = [
    { year: '2019', event: 'THOLASY Founded', description: 'Started with a vision to make professional 3D training accessible' },
    { year: '2020', event: 'First Cohort', description: 'Launched with 12 students in Blender program' },
    { year: '2021', event: 'SolidWorks Added', description: 'Expanded to engineering and CAD design' },
    { year: '2022', event: '200+ Graduates', description: 'Alumni working at top studios and companies' },
    { year: '2023', event: '95% Job Placement', description: 'Achieved industry-leading placement rate' },
    { year: '2024', event: 'International Recognition', description: 'Featured in Design Education Awards' }
  ]

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              About THOLASY
            </h1>
            <p className="text-xl text-dark-200 leading-relaxed">
              We provide training in 3D design software - Blender and SolidWorks. Our goal is to help Egyptian students and professionals learn practical skills for creative and technical 3D work.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg mb-6">What We Do</h2>
              <p className="text-lg text-dark-700 mb-4 leading-relaxed">
                THOLASY offers online courses for learning 3D design in Egypt. We cover Blender for creative 3D modeling and animation, and SolidWorks for CAD and engineering design.
              </p>
              <p className="text-lg text-dark-700 mb-6 leading-relaxed">
                Our courses are designed to be practical and focused on real skills that are in demand in the Egyptian and regional job market. Students work on projects and build portfolios as they learn.
              </p>
              <div className="flex gap-4">
                <Link to="/courses" className="btn btn-primary">
                  View Courses
                </Link>
                <Link to="/enrollment" className="btn btn-outline">
                  Enroll
                </Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <SmartImage
                src="https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fallback="https://placehold.co/900x600?text=3D+Design+Training"
                alt="Students collaborating on computers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Images */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <SmartImage
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fallback="https://placehold.co/900x600?text=CAD+Workspace"
                alt="CAD and manufacturing workspace"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-primary-600 mb-2">Egypt</div>
                <div className="text-dark-700">Based in</div>
              </div>
              <div className="bg-primary-50 p-6 rounded-2xl">
                <div className="text-4xl font-bold text-primary-600 mb-2">2</div>
                <div className="text-dark-700">Programs</div>
              </div>
              <div className="bg-primary-50 p-6 rounded-2xl">
                <div className="text-4xl font-bold text-primary-600 mb-2">Online</div>
                <div className="text-dark-700">Learning</div>
              </div>
              <div className="bg-primary-50 p-6 rounded-2xl">
                <div className="text-4xl font-bold text-primary-600 mb-2">Arabic</div>
                <div className="text-dark-700">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Approach</h2>
            <p className="text-xl text-dark-600 max-w-2xl mx-auto">
              How we structure our courses to help you learn effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-dark-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 md:p-16 text-white text-center">
            <h2 className="heading-lg mb-6">Interested in Learning?</h2>
            <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
              Check out our available courses and see if they're a good fit for you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/enrollment" className="btn btn-primary bg-white text-primary-700 hover:bg-primary-50">
                View Courses
              </Link>
              <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
