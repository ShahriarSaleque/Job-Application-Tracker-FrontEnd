export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-500" />
    </div>
  )
}
