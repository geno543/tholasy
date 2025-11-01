import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

  const loadEnrollments = () => {
    const stored = localStorage.getItem('enrollments')
    if (stored) {
      setEnrollments(JSON.parse(stored))
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

  const approveEnrollment = (id) => {
    const updated = enrollments.map(enrollment => 
      enrollment.id === id ? { ...enrollment, status: 'approved' } : enrollment
    )
    setEnrollments(updated)
    localStorage.setItem('enrollments', JSON.stringify(updated))
  }

  const rejectEnrollment = (id) => {
    const updated = enrollments.map(enrollment => 
      enrollment.id === id ? { ...enrollment, status: 'rejected' } : enrollment
    )
    setEnrollments(updated)
    localStorage.setItem('enrollments', JSON.stringify(updated))
  }

  const deleteEnrollment = (id) => {
    if (confirm('Are you sure you want to delete this enrollment?')) {
      const updated = enrollments.filter(enrollment => enrollment.id !== id)
      setEnrollments(updated)
      localStorage.setItem('enrollments', JSON.stringify(updated))
    }
  }

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesSearch = 
      enrollment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.email.toLowerCase().includes(searchTerm.toLowerCase())
    
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
    <div className="pt-20 min-h-screen bg-dark-50">
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
                          {enrollment.firstName} {enrollment.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-dark-700">{enrollment.email}</div>
                        <div className="text-sm text-dark-500">{enrollment.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm">
                          {enrollment.courseName}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-dark-900">{enrollment.paymentMethod}</div>
                          {enrollment.price > 0 ? (
                            <div className="text-dark-600">{enrollment.price} EGP</div>
                          ) : (
                            <div className="text-green-600 font-medium">FREE</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-dark-600">
                        {new Date(enrollment.submittedAt).toLocaleString()}
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
