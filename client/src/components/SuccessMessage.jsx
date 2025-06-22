function SuccessMessage({ message }) {
  return (
    <div className="mb-8 bg-gradient-to-r from-secondary-50 to-primary-50 border border-secondary-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-full flex items-center justify-center">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="ml-4">
          <p className="text-lg font-semibold text-gray-800">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuccessMessage