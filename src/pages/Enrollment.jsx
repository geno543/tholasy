import { useState } from 'react'
import { Link } from 'react-router-dom'
import SmartImage from '../components/ui/SmartImage'

const Enrollment = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    paymentMethod: 'vodafone',
    walletNumber: '',
    promoCode: '',
    agree: false
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [coursePrice, setCoursePrice] = useState(0)
  const [discountApplied, setDiscountApplied] = useState(false)

  const courses = [
    { value: 'blender', label: 'Blender Course', price: 500 },
    { value: 'solidworks', label: 'SolidWorks Course', price: 500 },
    { value: 'bundle', label: 'Both Courses (Bundle)', price: 800 }
  ]

  const paymentMethods = [
    { value: 'vodafone', label: 'Vodafone Cash', icon: '📱' },
    { value: 'instapay', label: 'InstaPay', icon: '💳' },
    { value: 'etisalat', label: 'Etisalat Cash', icon: '📲' },
    { value: 'orange', label: 'Orange Money', icon: '🟠' },
    { value: 'fawry', label: 'Fawry', icon: '🏪' }
  ]

  // Promo codes: THOLASY2024 and FREEFULL2025
  const applyPromoCode = () => {
    const code = formData.promoCode.toUpperCase()
    if (code === 'THOLASY2024' || code === 'FREEFULL2025') {
      setDiscountApplied(true)
      setCoursePrice(0)
      setErrors(prev => ({ ...prev, promoCode: '' }))
    } else if (formData.promoCode) {
      setErrors(prev => ({ ...prev, promoCode: 'Invalid promo code' }))
      setDiscountApplied(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Update price when course changes
    if (name === 'course') {
      const selectedCourse = courses.find(c => c.value === value)
      if (selectedCourse && !discountApplied) {
        setCoursePrice(selectedCourse.price)
      }
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.course) newErrors.course = 'Please select a course'
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method'
    if (!discountApplied && !formData.walletNumber.trim()) newErrors.walletNumber = 'Wallet/phone number is required'
    if (!formData.agree) newErrors.agree = 'You must agree to the terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Get course name
      const selectedCourse = courses.find(c => c.value === formData.course)
      
      // Create enrollment object
      const enrollment = {
        id: Date.now().toString(),
        ...formData,
        courseName: selectedCourse?.label || formData.course,
        price: coursePrice,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      }
      
      // Save to localStorage
      const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]')
      existingEnrollments.push(enrollment)
      localStorage.setItem('enrollments', JSON.stringify(existingEnrollments))
      
      // Also save user's enrollment status for course access
      const userEnrollments = JSON.parse(localStorage.getItem('userEnrollments') || '{}')
      userEnrollments[formData.email] = {
        courses: [formData.course],
        status: 'pending',
        enrolledAt: new Date().toISOString()
      }
      localStorage.setItem('userEnrollments', JSON.stringify(userEnrollments))
      
      console.log('Form submitted:', enrollment)
      setSubmitted(true)
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0]
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-dark-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Application Submitted!</h1>
          
          <p className="text-xl text-dark-600 mb-6">
            Thanks for your interest, {formData.firstName}!
          </p>

          {discountApplied && (
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🎉</span>
                <h3 className="text-xl font-bold text-green-800">FREE Course Access!</h3>
              </div>
              <p className="text-green-700">
                Your promo code has been applied successfully. You have FREE access to the course!
              </p>
            </div>
          )}
          
          <div className="bg-primary-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold mb-3">Next steps:</h3>
            <ul className="space-y-2 text-dark-700">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>We'll review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Check your email at <strong>{formData.email}</strong> for updates</span>
              </li>
              {!discountApplied && (
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Payment instructions will be sent to your {paymentMethods.find(p => p.value === formData.paymentMethod)?.label} number: {formData.walletNumber}</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Course access will be provided after confirmation</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
            <Link to="/courses" className="btn btn-outline">
              View Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 bg-dark-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 to-dark-800 text-white py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="heading-xl mb-4">Course Enrollment</h1>
              <p className="text-xl text-dark-200">
                Fill out the form below to apply for a course.
              </p>
            </div>
            <div className="hidden lg:block rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <SmartImage
                src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                fallback="https://placehold.co/900x600?text=Enroll+in+3D+Courses"
                alt="Student learning mechanical CAD"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Personal Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Personal Information
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Selection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Course Selection
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Choose Your Program *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className={`input-field ${errors.course ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select a course...</option>
                      {courses.map(course => (
                        <option key={course.value} value={course.value}>
                          {course.label}
                        </option>
                      ))}
                    </select>
                    {errors.course && (
                      <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      Promo Code (Optional)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="promoCode"
                        value={formData.promoCode}
                        onChange={handleChange}
                        className={`input-field flex-1 ${errors.promoCode ? 'border-red-500' : discountApplied ? 'border-green-500' : ''}`}
                        placeholder="Enter promo code"
                      />
                      <button
                        type="button"
                        onClick={applyPromoCode}
                        className="btn btn-outline px-6"
                      >
                        Apply
                      </button>
                    </div>
                    {errors.promoCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.promoCode}</p>
                    )}
                    {discountApplied && (
                      <p className="mt-1 text-sm text-green-600 font-semibold">✓ Promo code applied! Course is now FREE</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  Payment Information
                </h2>

                {!discountApplied && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💰</span>
                      <div>
                        <h3 className="font-semibold text-amber-900 mb-1">Course Fee: {coursePrice} EGP</h3>
                        <p className="text-sm text-amber-800">
                          Have a promo code? Enter it above for a discount!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {discountApplied ? (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🎉</span>
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-1">FREE Course Access!</h3>
                        <p className="text-green-700">
                          You've unlocked free access to this course. No payment required!
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-3">
                        Select Payment Method *
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {paymentMethods.map(method => (
                          <label
                            key={method.value}
                            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              formData.paymentMethod === method.value
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-dark-200 hover:border-primary-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.value}
                              checked={formData.paymentMethod === method.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-primary-600"
                            />
                            <span className="ml-3 flex items-center gap-2">
                              <span className="text-2xl">{method.icon}</span>
                              <span className="font-medium">{method.label}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                      {errors.paymentMethod && (
                        <p className="mt-1 text-sm text-red-600">{errors.paymentMethod}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-2">
                        {formData.paymentMethod === 'instapay' ? 'InstaPay Username or Phone' : 'Wallet Phone Number'} *
                      </label>
                      <input
                        type="text"
                        name="walletNumber"
                        value={formData.walletNumber}
                        onChange={handleChange}
                        className={`input-field ${errors.walletNumber ? 'border-red-500' : ''}`}
                        placeholder={formData.paymentMethod === 'instapay' ? 'Enter your InstaPay ID' : '01xxxxxxxxx'}
                        dir="ltr"
                      />
                      {errors.walletNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.walletNumber}</p>
                      )}
                      <p className="mt-1 text-sm text-dark-500">
                        Payment instructions will be sent to this number
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className={`mt-1 w-5 h-5 text-primary-600 rounded ${errors.agree ? 'border-red-500' : ''}`}
                  />
                  <span className="text-sm text-dark-700">
                    I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>. *
                  </span>
                </label>
                {errors.agree && (
                  <p className="mt-2 text-sm text-red-600 ml-8">{errors.agree}</p>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 text-lg py-4"
                >
                  Submit Application
                </button>
                <Link
                  to="/courses"
                  className="btn btn-outline flex-1 text-lg py-4"
                >
                  Back to Courses
                </Link>
              </div>

              <p className="text-center text-sm text-dark-500 mt-6">
                Questions? <Link to="/contact" className="text-primary-600 hover:underline">Contact us</Link> for help.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Enrollment
