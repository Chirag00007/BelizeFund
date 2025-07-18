import { Check } from 'lucide-react'

const StepIndicator = ({ steps, currentStep, completedSteps, onStepClick }) => {
  const getStepStatus = (stepId) => {
    if (completedSteps.includes(stepId)) return 'completed'
    if (stepId === currentStep) return 'current'
    return 'pending'
  }

  const isClickable = (stepId) => {
    return stepId <= Math.max(...completedSteps, currentStep)
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between min-w-max px-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id)
          const clickable = isClickable(step.id)
          
          return (
            <div key={step.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => clickable && onStepClick(step.id)}
                  disabled={!clickable}
                  className={`
                    step-indicator ${status}
                    ${clickable ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed opacity-50'}
                    transition-all duration-200
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>
                <div className="mt-2 text-center max-w-[80px]">
                  <p className={`text-xs font-medium truncate ${
                    status === 'current' ? 'text-blue-600' : 
                    status === 'completed' ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  hidden md:block flex-1 h-0.5 mx-2 mt-[-20px] min-w-[20px] max-w-[60px]
                  ${completedSteps.includes(step.id) ? 'bg-green-600' : 'bg-gray-300'}
                `} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator 