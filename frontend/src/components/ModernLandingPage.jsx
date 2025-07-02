import { Link } from 'react-router-dom'
import { 
  FileText, 
  CheckCircle, 
  Users, 
  BarChart3, 
  Shield, 
  Clock, 
  ArrowRight,
  Award,
  Building2,
  Target,
  MapPin,
  DollarSign,
  Zap,
  Star,
  Globe,
  TrendingUp,
  Lock,
  HeartHandshake
} from 'lucide-react'

const ModernLandingPage = () => {
  const features = [
    {
      icon: Building2,
      title: "Organization Management",
      description: "Comprehensive organization profiling with auto-scoring based on age, type, and operational status.",
      color: "blue"
    },
    {
      icon: Target,
      title: "Project Planning",
      description: "Detailed project planning with logical framework, objectives, and outcome tracking.",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Compliance & Assessment",
      description: "Built-in ESRST, ESRMP, GAP, and SEP assessment tools for regulatory compliance.",
      color: "green"
    },
    {
      icon: DollarSign,
      title: "Financial Management",
      description: "Complete budget planning, fund allocation tracking, and co-financing management.",
      color: "emerald"
    },
    {
      icon: MapPin,
      title: "Location Intelligence",
      description: "Geographic project mapping and location-based impact assessment tools.",
      color: "orange"
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Advanced analytics with auto-scoring algorithms and performance metrics.",
      color: "indigo"
    }
  ]

  const stats = [
    { number: "9", label: "Comprehensive Steps", icon: FileText },
    { number: "100%", label: "Digital Process", icon: Zap },
    { number: "24/7", label: "System Availability", icon: Clock },
    { number: "∞", label: "Applications Supported", icon: TrendingUp }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Organization Details",
      description: "Complete organization profile with auto-scoring system",
      icon: Building2,
      color: "blue"
    },
    {
      step: "02", 
      title: "Applicant Information",
      description: "Personal details and contact information",
      icon: Users,
      color: "green"
    },
    {
      step: "03",
      title: "Project Planning",
      description: "Project goals, objectives, and location details",
      icon: Target,
      color: "purple"
    },
    {
      step: "04",
      title: "Financial & Legal",
      description: "Budget planning and compliance documentation",
      icon: DollarSign,
      color: "emerald"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo and Brand */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-2xl">
                  <Award className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to <span className="text-blue-600">Belize Fund</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The most advanced grant management platform designed for modern organizations. 
              Streamline applications, track progress, and maximize funding success with intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/form"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="text-lg">Start New Application</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/applications"
                className="group bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-10 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FileText className="mr-3 h-6 w-6 text-blue-600" />
                <span className="text-lg">View Applications</span>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>Professional Grade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-500" />
                <span>Global Standards</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <Building2 className="h-32 w-32 text-blue-600 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Target className="h-40 w-40 text-indigo-600 animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for Modern Grant Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides everything you need to manage grants efficiently, 
              from application to completion with intelligent automation and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <div className={`p-4 bg-${feature.color}-100 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Streamlined Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent 9-step process guides you through every aspect of your grant application 
              with smart validation and auto-scoring features.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className={`w-20 h-20 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.step}
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                    <item.icon className={`h-4 w-4 text-${item.color}-600`} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 text-gray-600 mb-6">
              <Clock className="h-5 w-5" />
              <span>Plus 5 more comprehensive steps for complete application processing</span>
            </div>
            <Link
              to="/form"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg group"
            >
              <span>Start Your Application Journey</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#cta-pattern)" />
          </svg>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <HeartHandshake className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Grant Management?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join leading organizations worldwide who trust our platform for their grant management needs. 
            Experience the future of grant applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/form"
              className="group bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-10 rounded-xl transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <Award className="mr-3 h-6 w-6" />
              <span className="text-lg">Start Your Application Today</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/applications"
              className="group bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-xl border-2 border-white/30 transition-all duration-300 inline-flex items-center backdrop-blur-sm"
            >
              <FileText className="mr-3 h-6 w-6" />
              <span className="text-lg">View Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Belize Fund</span>
                  <div className="text-sm text-gray-400">Grant Management System</div>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                The most advanced grant management platform designed for modern organizations. 
                Streamline your grant process with intelligent automation and professional tools.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Quick Access</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/form" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-4 w-4 mr-2" />New Application</Link></li>
                <li><Link to="/applications" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-4 w-4 mr-2" />My Applications</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-4 w-4 mr-2" />Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-4 w-4 mr-2" />Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ArrowRight className="h-4 w-4 mr-2" />Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Belize Fund Management System. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div className="text-sm text-gray-400">
                Version 2.0.0
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ModernLandingPage 