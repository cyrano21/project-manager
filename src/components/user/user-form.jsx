import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { generateUniqueId } from './utils'

export function UserForm({ user, onSubmit, onDelete, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      id: user?.id || generateUniqueId(),
      username: e.target.username.value,
      password: e.target.password.value,
    }
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          defaultValue={user?.username || ""}
          placeholder="Enter username"
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={user?.password || ""}
          placeholder="Enter password"
          required
        />
      </div>
      <div className="flex justify-end space-x-4 mt-8">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {user ? "Update User" : "Add User"}
        </Button>
        {user && (
          <Button
            type="button"
            variant="destructive"
            onClick={onDelete}
          >
            Delete User
          </Button>
        )}
      </div>
    </form>
  )
}

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
}
