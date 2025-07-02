import { Link } from 'react-router-dom'
import { 
  Award, 
  Building2, 
  Target, 
  Shield, 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  FileText,
  DollarSign,
  Globe,
  Zap,
  Star,
  TrendingUp,
  Lock,
  HeartHandshake,
  Sparkles,
  Rocket,
  MapPin,
  Calendar,
  ChevronRight,
  Play,
  Eye,
  Download,
  Phone,
  Mail
} from 'lucide-react'

const ProfessionalLandingPage = () => {
  const features = [
    {
      icon: Building2,
      title: "Smart Organization Profiling",
      description: "AI-powered organization assessment with real-time scoring based on operational maturity, legal status, and track record.",
      color: "blue",
      stats: "95% accuracy"
    },
    {
      icon: Target,
      title: "Intelligent Project Planning",
      description: "Advanced project framework with logical structure, milestone tracking, and outcome prediction algorithms.",
      color: "purple",
      stats: "3x faster setup"
    },
    {
      icon: Shield,
      title: "Automated Compliance Suite",
      description: "Built-in ESRST, ESRMP, GAP, and SEP assessment tools with regulatory compliance automation.",
      color: "green",
      stats: "100% compliant"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Engine",
      description: "Machine learning-powered analytics with predictive insights, success probability, and performance metrics.",
      color: "indigo",
      stats: "Real-time insights"
    },
    {
      icon: DollarSign,
      title: "Financial Intelligence",
      description: "Comprehensive budget optimization, fund allocation tracking, and co-financing management with smart recommendations.",
      color: "emerald",
      stats: "Save 40% time"
    },
    {
      icon: MapPin,
      title: "Geographic Intelligence",
      description: "Interactive mapping, location-based impact assessment, and geographic data visualization tools.",
      color: "orange",
      stats: "GPS precision"
    }
  ]

  const stats = [
    { number: "10K+", label: "Applications Processed", icon: FileText, color: "blue" },
    { number: "99.9%", label: "System Uptime", icon: Zap, color: "green" },
    { number: "24/7", label: "Global Support", icon: Clock, color: "purple" },
    { number: "$2.5B", label: "Grants Managed", icon: DollarSign, color: "emerald" }
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Martinez",
      position: "Executive Director, Community Development Foundation",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      quote: "This platform revolutionized our grant application process. The auto-scoring feature alone saved us weeks of work.",
      rating: 5,
      organization: "CDF International"
    },
    {
      name: "Michael Chen",
      position: "Program Manager, Environmental Action Network",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      quote: "The professional interface and intelligent workflow make complex applications feel simple. Outstanding system!",
      rating: 5,
      organization: "EAN Global"
    },
    {
      name: "Elena Rodriguez",
      position: "Grant Coordinator, Education First Initiative",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      quote: "Best grant management platform we've used. The sidebar navigation and step-by-step process are incredibly intuitive.",
      rating: 5,
      organization: "EFI Foundation"
    }
  ]

  const processSteps = [
    {
      step: "01",
      title: "Smart Registration",
      description: "Quick organization setup with AI-powered data validation and auto-completion features",
      icon: Building2,
      color: "blue"
    },
    {
      step: "02", 
      title: "Intelligent Assessment",
      description: "Automated scoring system evaluates your organization's eligibility and success probability",
      icon: BarChart3,
      color: "purple"
    },
    {
      step: "03",
      title: "Guided Application",
      description: "Step-by-step form completion with real-time validation and smart suggestions",
      icon: FileText,
      color: "emerald"
    },
    {
      step: "04",
      title: "Instant Submission",
      description: "One-click submission with automated compliance checks and confirmation",
      icon: Rocket,
      color: "orange"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(156, 146, 172, 0.05) 2px, transparent 2px)',
            backgroundSize: '60px 60px'
          }}></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo Badge */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Next-Generation
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Grant Management
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              The world's most advanced grant management platform powered by AI. 
              Streamline applications, automate compliance, and maximize funding success with intelligent automation.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/professional-form"
                className="group bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
              >
                <Rocket className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                <span className="text-lg">Start Application</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-4 px-10 rounded-xl border border-white/20 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-3 h-6 w-6" />
                <span className="text-lg">Watch Demo</span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-blue-200">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Globe className="h-4 w-4 text-blue-400" />
                <span>Global Standards</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Lock className="h-4 w-4 text-purple-400" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                  </div>
                </div>
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-${stat.color}-600 to-${stat.color}-700 bg-clip-text text-transparent mb-2`}>
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Intelligent Features for Modern Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge AI and machine learning, our platform provides 
              everything you need to manage grants efficiently from application to completion.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 bg-${feature.color}-100 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                    </div>
                    <div className={`px-3 py-1 bg-${feature.color}-100 text-${feature.color}-700 text-sm font-semibold rounded-full`}>
                      {feature.stats}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  <div className={`flex items-center text-sm font-semibold text-${feature.color}-600 group-hover:text-${feature.color}-700`}>
                    <span>Explore feature</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Streamlined 4-Step Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent workflow guides you through every step with AI-powered assistance, 
              real-time validation, and smart automation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <div key={index} className="text-center group relative">
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0"></div>
                )}
                
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {item.step}
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${item.color}-100 rounded-full flex items-center justify-center shadow-lg`}>
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
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link
              to="/professional-form"
              className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Start Your Journey</span>
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of organizations worldwide who trust our platform for their grant management needs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-xs text-blue-600 font-medium">{testimonial.organization}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 20px, transparent 20px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm shadow-2xl">
              <HeartHandshake className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Grant Management?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join leading organizations worldwide who trust our platform. 
            Experience the future of grant applications with AI-powered intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/professional-form"
              className="group bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-10 rounded-xl transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-white/25 transform hover:-translate-y-1"
            >
              <Award className="mr-3 h-6 w-6" />
              <span className="text-lg">Start Your Application</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/applications"
              className="group bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-10 rounded-xl border border-white/30 transition-all duration-300 inline-flex items-center backdrop-blur-sm"
            >
              <Eye className="mr-3 h-6 w-6" />
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
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg mr-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">Belize Fund</span>
                  <div className="text-sm text-gray-400">Next-Generation Management</div>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed mb-6">
                The world's most advanced grant management platform powered by AI. 
                Streamline your grant process with intelligent automation and professional tools.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Lock className="h-4 w-4" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4" />
                  <span>ISO Certified</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Quick Access</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/professional-form" className="hover:text-white transition-colors flex items-center"><ChevronRight className="h-4 w-4 mr-2" />New Application</Link></li>
                <li><Link to="/applications" className="hover:text-white transition-colors flex items-center"><ChevronRight className="h-4 w-4 mr-2" />My Applications</Link></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="h-4 w-4 mr-2" />Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><ChevronRight className="h-4 w-4 mr-2" />API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Phone className="h-4 w-4 mr-2" />+1 (555) 123-4567</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Mail className="h-4 w-4 mr-2" />support@goodsgrants.com</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Download className="h-4 w-4 mr-2" />Download Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Calendar className="h-4 w-4 mr-2" />Schedule Demo</a></li>
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
                <span>All Systems Operational</span>
              </div>
              <div className="text-sm text-gray-400">
                Version 3.0.0
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default ProfessionalLandingPage 