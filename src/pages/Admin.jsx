import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const Admin = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [enrollments, setEnrollments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCourse, setFilterCourse] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    // Check if admin is already authenticated
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth === 'elkamarin') {
      setIsAuthenticated(true)
      loadEnrollments()
    }
  }, [])

  const loadEnrollments = async () => {
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error loading enrollments:', error)
        // Fallback to localStorage
        const stored = localStorage.getItem('enrollments')
        if (stored) {
          setEnrollments(JSON.parse(stored))
        }
        return
      }
      
      console.log('Loaded enrollments from Supabase:', data)
      setEnrollments(data || [])
    } catch (err) {
      console.error('Unexpected error loading enrollments:', err)
      // Fallback to localStorage
      const stored = localStorage.getItem('enrollments')
      if (stored) {
        setEnrollments(JSON.parse(stored))
      }
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'elkamarin') {
      localStorage.setItem('adminAuth', 'elkamarin')
      setIsAuthenticated(true)
      loadEnrollments()
    } else {
      alert('Incorrect password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    navigate('/')
  }

  const approveEnrollment = async (id) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: 'approved' })
        .eq('id', id)
      
      if (error) {
        console.error('Error approving enrollment:', error)
        alert('Failed to approve enrollment. Please try again.')
        return
      }
      
      // Update local state
      const updated = enrollments.map(enrollment => 
        enrollment.id === id ? { ...enrollment, status: 'approved' } : enrollment
      )
      setEnrollments(updated)
      
      // Also update localStorage as backup
      localStorage.setItem('enrollments', JSON.stringify(updated))
    } catch (err) {
      console.error('Unexpected error approving enrollment:', err)
      alert('An unexpected error occurred.')
    }
  }

  const rejectEnrollment = async (id) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ status: 'rejected' })
        .eq('id', id)
      
      if (error) {
        console.error('Error rejecting enrollment:', error)
        alert('Failed to reject enrollment. Please try again.')
        return
      }
      
      // Update local state
      const updated = enrollments.map(enrollment => 
        enrollment.id === id ? { ...enrollment, status: 'rejected' } : enrollment
      )
      setEnrollments(updated)
      
      // Also update localStorage as backup
      localStorage.setItem('enrollments', JSON.stringify(updated))
    } catch (err) {
      console.error('Unexpected error rejecting enrollment:', err)
      alert('An unexpected error occurred.')
    }
  }

  const deleteEnrollment = async (id) => {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      try {
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Error deleting enrollment:', error)
          alert('Failed to delete enrollment. Please try again.')
          return
        }
        
        // Update local state
        const updated = enrollments.filter(enrollment => enrollment.id !== id)
        setEnrollments(updated)
        
        // Also update localStorage as backup
        localStorage.setItem('enrollments', JSON.stringify(updated))
      } catch (err) {
        console.error('Unexpected error deleting enrollment:', err)
        alert('An unexpected error occurred.')
      }
    }
  }

  const filteredEnrollments = enrollments.filter(enrollment => {
    const firstName = enrollment.first_name || enrollment.firstName || ''
    const lastName = enrollment.last_name || enrollment.lastName || ''
    const email = enrollment.email || ''
    
    const matchesSearch = 
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCourse = filterCourse === 'all' || enrollment.course === filterCourse
    const matchesStatus = filterStatus === 'all' || enrollment.status === filterStatus

    return matchesSearch && matchesCourse && matchesStatus
  })

  const stats = {
    total: enrollments.length,
    pending: enrollments.filter(e => e.status === 'pending').length,
    approved: enrollments.filter(e => e.status === 'approved').length,
    rejected: enrollments.filter(e => e.status === 'rejected').length,
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-dark-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-dark-300">Enter password to access</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field bg-dark-700 text-white border-dark-600"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-50">
      {/* Header */}
      <div className="bg-dark-900 text-white py-6 shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-dark-300">Manage course enrollments</p>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="btn btn-outline border-white text-white hover:bg-white hover:text-dark-900">
                Back to Site
              </Link>
              <button onClick={handleLogout} className="btn bg-red-600 hover:bg-red-700 text-white">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container-custom py-8">
        {enrollments.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6 rounded-lg">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-yellow-800 font-semibold mb-2">No Enrollments Yet</h3>
                <p className="text-yellow-700 text-sm">
                  When students enroll through the enrollment form, their submissions will appear here.
                  Make sure you're using the same domain (not switching between localhost and production).
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-dark-600 text-sm mb-1">Total Enrollments</div>
            <div className="text-3xl font-bold text-dark-900">{stats.total}</div>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
            <div className="text-yellow-800 text-sm mb-1">Pending</div>
            <div className="text-3xl font-bold text-yellow-900">{stats.pending}</div>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-md">
            <div className="text-green-800 text-sm mb-1">Approved</div>
            <div className="text-3xl font-bold text-green-900">{stats.approved}</div>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow-md">
            <div className="text-red-800 text-sm mb-1">Rejected</div>
            <div className="text-3xl font-bold text-red-900">{stats.rejected}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                placeholder="Search by name or email..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Course
              </label>
              <select
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
                className="input-field"
              >
                <option value="all">All Courses</option>
                <option value="blender">Blender Course</option>
                <option value="solidworks">SolidWorks Course</option>
                <option value="bundle">Both Courses (Bundle)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input-field"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enrollments Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Payment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Submitted</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-100">
                {filteredEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-dark-500">
                      No enrollments found
                    </td>
                  </tr>
                ) : (
                  filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="hover:bg-dark-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-dark-900">
                          {enrollment.first_name || enrollment.firstName} {enrollment.last_name || enrollment.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-dark-700">{enrollment.email}</div>
                        <div className="text-sm text-dark-500">{enrollment.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm">
                          {enrollment.course_name || enrollment.courseName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-dark-900">{enrollment.payment_method || enrollment.paymentMethod}</div>
                          {enrollment.price > 0 ? (
                            <div className="text-dark-600">{enrollment.price} EGP</div>
                          ) : (
                            <div className="text-green-600 font-medium">FREE</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-dark-600">
                        {new Date(enrollment.submitted_at || enrollment.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          enrollment.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : enrollment.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {enrollment.status !== 'approved' && (
                            <button
                              onClick={() => approveEnrollment(enrollment.id)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg"
                            >
                              Approve
                            </button>
                          )}
                          {enrollment.status !== 'rejected' && (
                            <button
                              onClick={() => rejectEnrollment(enrollment.id)}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                            >
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => deleteEnrollment(enrollment.id)}
                            className="px-3 py-1 bg-dark-600 hover:bg-dark-700 text-white text-sm rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
