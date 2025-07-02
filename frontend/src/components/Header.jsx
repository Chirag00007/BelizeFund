import { Link, useLocation } from 'react-router-dom'
import { Award, FileText, List, Home, ChevronDown, User, Settings, Bell } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  
  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200/60 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-all duration-200 group">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Belize Fund
              </h1>
              <p className="text-sm text-gray-500 font-medium -mt-1">Grant Management System</p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-transparent'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/professional-form" 
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive('/professional-form') || isActive('/form')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-transparent'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>New Application</span>
            </Link>
            
            <Link 
              to="/applications" 
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive('/applications') 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 border border-transparent'
              }`}
            >
              <List className="h-4 w-4" />
              <span>Applications</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 group">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-gray-900">Admin User</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </button>
            </div>

            {/* Settings */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <nav className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/professional-form" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive('/professional-form') || isActive('/form')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <FileText className="h-5 w-5" />
              <span>New Application</span>
            </Link>
            
            <Link 
              to="/applications" 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive('/applications') 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200/50' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <List className="h-5 w-5" />
              <span>Applications</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-gray-100">
        <div className="container mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-emerald-700">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="font-medium">System Online</span>
              </div>
              <div className="text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-gray-500">
              <span>Version 3.0.0</span>
              <span>•</span>
              <span>Enterprise Edition</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 