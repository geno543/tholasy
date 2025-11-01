import { Link } from 'react-router-dom'
import { useState } from 'react'
import SmartImage from '../components/ui/SmartImage'

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null)

  const courses = [
    {
      id: 'blender',
      title: 'Blender Course',
      subtitle: '3D Modeling & Animation',
      duration: 'Self-paced',
      level: 'All Levels',
      gradient: 'from-orange-500 to-red-600',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      description: 'Learn 3D modeling, animation, and rendering with Blender.',
      curriculum: [
        {
          week: 'Session 1',
          title: 'Interface & Basics',
          topics: ['Learning the interface and getting the basics and tool functions']
        },
        {
          week: 'Session 2',
          title: 'First Modeling Practice',
          topics: ['Modeling a simple design to apply the tools']
        },
        {
          week: 'Session 3',
          title: 'Progressive Modeling',
          topics: ['Practice more designs and models, gradually with the difficulties']
        },
        {
          week: 'Session 4',
          title: 'Shading & Materials',
          topics: ['Shading and coloring the models', 'Difference between materials\' properties']
        },
        {
          week: 'Session 5',
          title: 'Lighting & Rendering',
          topics: ['Practice on the lightning and types of render']
        },
        {
          week: 'Session 6',
          title: 'Camera Operations',
          topics: ['Learning about the camera and how to move it']
        },
        {
          week: 'Session 7',
          title: 'Exam & Future Planning',
          topics: ['Exam session and know the future plan']
        },
        {
          week: 'Session 8',
          title: 'Animation Basics',
          topics: ['Learning the basics of animation']
        },
        {
          week: 'Session 9',
          title: 'Complete Design Project',
          topics: ['Build a complete design using all the previous knowledge']
        },
        {
          week: 'Session 10',
          title: 'Advanced Challenges',
          topics: ['More advanced designs and complex modeling challenges']
        }
      ],
      skills: [
        '3D Modeling',
        'Sculpting',
        'Texturing',
        'Lighting',
        'Animation',
        'Rendering',
        'Compositing',
        'VFX Basics'
      ],
      tools: ['Blender 4.0+'],
      outcomes: [
        'Create 3D models and scenes',
        'Build a portfolio with projects',
        'Understand professional workflows',
        'Learn animation basics'
      ]
    },
    {
      id: 'solidworks',
      title: 'SolidWorks Course',
      subtitle: 'CAD Design',
      duration: 'Self-paced',
      level: 'All Levels',
      gradient: 'from-blue-500 to-indigo-600',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Learn CAD design for engineering and product development.',
      curriculum: [
        {
          week: 'Session 1',
          title: 'Welcome to SolidWorks',
          topics: ['Installation & Interface Navigation']
        },
        {
          week: 'Session 2',
          title: 'Foundations of 2D Sketching',
          topics: ['Tools & Relations']
        },
        {
          week: 'Session 3',
          title: 'Advanced 2D Sketching & Workshop',
          topics: ['Patterns, Trim, & Offset']
        },
        {
          week: 'Session 4',
          title: 'Introduction to 3D Part Modeling',
          topics: ['Extrude & Revolve Features']
        },
        {
          week: 'Session 5',
          title: 'Advanced 3D Features & Workshop',
          topics: ['Sweep, Loft, & Hole Wizard']
        },
        {
          week: 'Session 6',
          title: 'Assembly Design',
          topics: ['Mating Parts & Creating Sub-Assemblies']
        },
        {
          week: 'Session 7',
          title: 'Introduction to Simulation',
          topics: ['Running a Basic Static & Force Analysis']
        },
        {
          week: 'Session 8',
          title: 'Capstone Project',
          topics: ['From Concept to Final Assembly & Drawing']
        }
      ],
      skills: [
        'CAD Modeling',
        'Assembly Design',
        'Technical Drawing',
        'GD&T',
        'Simulation',
        'Sheet Metal',
        'Weldments',
        'Product Design'
      ],
      tools: ['SolidWorks 2023+'],
      outcomes: [
        'Design mechanical assemblies',
        'Create engineering drawings',
        'Understand CAD fundamentals',
        'Build technical skills'
      ]
    }
  ]

  const faqs = [
    {
      question: 'Do I need prior experience?',
      answer: 'No prior experience needed. Courses start with the basics and build up from there.'
    },
    {
      question: 'What equipment do I need?',
      answer: 'A computer with 8GB+ RAM recommended. Software details provided upon enrollment.'
    },
    {
      question: 'How long does it take?',
      answer: 'Courses are self-paced. Most students complete them in 2-3 months.'
    },
    {
      question: 'Is there support available?',
      answer: 'Yes, you can reach out via email with questions about the course material.'
    },
  ]

  const CourseModal = ({ course, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className={`bg-gradient-to-br ${course.gradient} p-8 text-white`}>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
              <p className="text-white/90">{course.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-dark-50 p-4 rounded-xl">
              <div className="text-sm text-dark-600 mb-1">Duration</div>
              <div className="font-semibold">{course.duration}</div>
            </div>
            <div className="bg-dark-50 p-4 rounded-xl">
              <div className="text-sm text-dark-600 mb-1">Level</div>
              <div className="font-semibold">{course.level}</div>
            </div>
            <div className="bg-dark-50 p-4 rounded-xl">
              <div className="text-sm text-dark-600 mb-1">Investment</div>
              <div className="font-semibold">{course.price}</div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Curriculum</h3>
            <div className="space-y-4">
              {course.curriculum.map((module, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-6 py-2">
                  <div className="font-semibold text-lg mb-2">{module.week}: {module.title}</div>
                  <ul className="space-y-1">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="text-dark-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Skills You'll Master</h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <span key={skill} className="badge bg-primary-100 text-primary-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Learning Outcomes</h3>
            <ul className="space-y-3">
              {course.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-dark-700">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 pt-4">
            <Link to="/enrollment" className="btn btn-primary flex-1">
              Enroll in This Course
            </Link>
            <Link to="/contact" className="btn btn-outline flex-1">
              Ask Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-gradient-to-br from-dark-900 to-dark-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="heading-xl mb-6">Available Courses</h1>
            <p className="text-xl text-dark-200 leading-relaxed">
              Choose from our two main programs in 3D design and CAD.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} id={course.id} className="card group hover:-translate-y-2">
                {/* Course Image */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <SmartImage
                    src={course.id === 'blender'
                      ? 'https://images.pexels.com/photos/8952545/pexels-photo-8952545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                      : 'https://images.pexels.com/photos/209224/pexels-photo-209224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    fallback={course.id === 'blender'
                      ? 'https://placehold.co/1000x600?text=Blender+Course'
                      : 'https://placehold.co/1000x600?text=SolidWorks+Course'
                    }
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${course.gradient} opacity-70`}></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-3xl font-display font-bold text-white mb-2">{course.title}</h2>
                    <p className="text-white/90">{course.subtitle}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="badge bg-primary-100 text-primary-700">
                      {course.duration}
                    </span>
                    <span className="badge bg-dark-100 text-dark-700">
                      {course.level}
                    </span>
                  </div>

                  <p className="text-dark-600 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Key Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.slice(0, 6).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-dark-50 text-dark-700 rounded-lg text-sm">
                          {skill}
                        </span>
                      ))}
                      {course.skills.length > 6 && (
                        <span className="px-3 py-1 bg-dark-50 text-dark-700 rounded-lg text-sm">
                          +{course.skills.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-dark-100">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="btn btn-outline"
                      >
                        View Details
                      </button>
                      <Link to="/enrollment" className="btn btn-primary">
                        Enroll
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-dark-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">Common Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md group"
                >
                  <summary className="font-semibold cursor-pointer flex items-center justify-between">
                    {faq.question}
                    <svg className="w-5 h-5 text-primary-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-dark-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-dark-900 rounded-3xl p-8 md:p-16 text-white text-center">
            <h2 className="heading-lg mb-6">Ready to Start?</h2>
            <p className="text-xl text-dark-200 mb-8 max-w-2xl mx-auto">
              Choose a course and begin learning 3D design.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/enrollment" className="btn btn-primary bg-primary-600 hover:bg-primary-700">
                Enroll
              </Link>
              <Link to="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-dark-900">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
  )
}

export default Courses
