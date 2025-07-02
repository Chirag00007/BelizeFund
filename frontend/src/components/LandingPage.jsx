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
  Building,
  Target
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      title: "Multi-Step Application Process",
      description: "Streamlined 11-step application process with progress tracking and auto-save functionality."
    },
    {
      icon: CheckCircle,
      title: "Smart Validation",
      description: "Real-time form validation ensures accuracy and completeness before submission."
    },
    {
      icon: BarChart3,
      title: "Auto-Scoring System",
      description: "Intelligent scoring based on organization age, type, and operational status."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Built with security best practices and compliance requirements in mind."
    },
    {
      icon: Clock,
      title: "Save & Resume",
      description: "Save your progress at any time and resume your application when convenient."
    },
    {
      icon: Users,
      title: "Application Management",
      description: "Comprehensive dashboard to view, edit, and manage all grant applications."
    }
  ]

  const stats = [
    { number: "11", label: "Application Steps" },
    { number: "100%", label: "Digital Process" },
    { number: "24/7", label: "Availability" },
    { number: "∞", label: "Applications" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 rounded-full">
                <Award className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Grant Management
              <span className="text-blue-600 block">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Streamline your grant application process with our comprehensive digital platform. 
              From application to approval, manage everything in one secure, user-friendly system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/form"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center group shadow-lg hover:shadow-xl"
              >
                Start New Application
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/applications"
                className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-lg border-2 border-gray-200 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                View Applications
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <Building className="h-24 w-24 text-blue-600" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <Target className="h-32 w-32 text-indigo-600" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Grant Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform provides everything you need to manage grant applications efficiently and effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Application Process
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined 11-step process guides you through every aspect of your grant application.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Basic Info", desc: "Organization details and application type" },
              { step: "02", title: "Applicant", desc: "Personal information and contact details" },
              { step: "03", title: "Categories", desc: "Application categories and classifications" },
              { step: "04", title: "Proposal", desc: "Project details and funding requirements" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">And 7 more comprehensive steps...</p>
            <Link
              to="/form"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              See all steps
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations who trust our platform for their grant management needs.
          </p>
          <Link
            to="/form"
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl"
          >
            Start Your Application Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold">Grant Management System</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Streamlining grant applications with modern technology and user-friendly design.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/form" className="hover:text-white transition-colors">New Application</Link></li>
                <li><Link to="/applications" className="hover:text-white transition-colors">My Applications</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Grant Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage 