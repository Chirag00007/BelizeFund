import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Eye, Edit, Trash2, Calendar, User, Building, Plus, Filter, Search } from 'lucide-react'
import { applicationService } from '../services/applicationService'
import toast from 'react-hot-toast'

const ApplicationsList = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const data = await applicationService.getAllApplications()
      setApplications(data)
    } catch (error) {
      toast.error('Failed to fetch applications')
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await applicationService.deleteApplication(id)
        setApplications(applications.filter(app => app._id !== id))
        toast.success('Application deleted successfully')
      } catch (error) {
        toast.error('Failed to delete application')
        console.error('Error deleting application:', error)
      }
    }
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      draft: 'bg-gray-100 text-gray-800 border-gray-300',
      submitted: 'bg-blue-100 text-blue-800 border-blue-300',
      under_review: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyles[status] || statusStyles.draft}`}>
        {status?.replace('_', ' ').toUpperCase() || 'DRAFT'}
      </span>
    )
  }

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filter === 'all' || app.applicationStatus === filter
    const matchesSearch = searchTerm === '' || 
      app.organizationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const filterCounts = {
    all: applications.length,
    draft: applications.filter(app => app.applicationStatus === 'draft').length,
    submitted: applications.filter(app => app.applicationStatus === 'submitted').length,
    under_review: applications.filter(app => app.applicationStatus === 'under_review').length,
    approved: applications.filter(app => app.applicationStatus === 'approved').length,
    rejected: applications.filter(app => app.applicationStatus === 'rejected').length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading applications...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Applications</h1>
              <p className="text-blue-100 mt-1">Manage and track your grant applications</p>
            </div>
            <Link
              to="/professional-form"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>New Application</span>
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Applications' },
              { key: 'draft', label: 'Drafts' },
              { key: 'submitted', label: 'Submitted' },
              { key: 'under_review', label: 'Under Review' },
              { key: 'approved', label: 'Approved' },
              { key: 'rejected', label: 'Rejected' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                  filter === key
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span>{label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {filterCounts[key]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-16">
              <Building className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {searchTerm ? 'No applications found' : 'No applications yet'}
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters'
                  : 'Start by creating your first grant application to see it listed here.'
                }
              </p>
              {!searchTerm && (
                <Link 
                  to="/professional-form" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create First Application</span>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredApplications.map((application) => (
                <div key={application._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Building className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {application.organizationName || 'Unnamed Organization'}
                            </h3>
                            {getStatusBadge(application.applicationStatus)}
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            <strong>ID:</strong> {application.applicationId || 'Not assigned'}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {`${application.firstName || ''} ${application.lastName || ''}`.trim() || 'No Name'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {new Date(application.created).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-gray-600">
                              <strong>Progress:</strong> Step {application.currentStep || 1} of 11
                            </div>
                          </div>
                          {application.email && (
                            <div className="mt-2 text-sm text-gray-600">
                              <strong>Email:</strong> {application.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Link
                        to={`/professional-form?edit=${application._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Edit Application"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => deleteApplication(application._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Delete Application"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Application Progress</span>
                      <span>{Math.round(((application.currentStep || 1) / 11) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((application.currentStep || 1) / 11) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ApplicationsList 