import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Lightbulb, Users } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Belize Fund Management
            </h1>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Concept Paper
            </Link>
            
            <Link
              to="/proposal-form"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/proposal-form'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              GAP Application
            </Link>

            <Link
              to="/community-proposal-form"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/community-proposal-form'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Users className="h-4 w-4 mr-2" />
              Community Proposal
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation 