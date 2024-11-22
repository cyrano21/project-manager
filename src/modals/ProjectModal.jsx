import { X, Camera } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useProjects } from '../components/useProjects'
import PropTypes from 'prop-types'

export default function ProjectModal({ project = {}, onClose }) {
  const { loading, error } = useProjects()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!project) return <div>No project data available</div>

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        <div className="min-h-screen bg-background">
          {/* Hero Image */}
          <div className="w-full h-[400px] relative">
            <div
              className="absolute inset-0 bg-cover bg-center rounded-t-lg"
              style={{
                backgroundImage: `url(${project.heroImage || "/hero-image.webp"})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-black/10" />

            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-4 left-4 bg-white/70 text-gray-800 hover:bg-white/90"
            >
              <Camera className="w-4 h-4" />
              Change
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/70 hover:bg-white/90 text-gray-800"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Rest of the modal content */}
          {/* ... (rest of the component remains unchanged) ... */}
        </div>
      </div>
    </div>
  )
}

ProjectModal.propTypes = {
  project: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}
