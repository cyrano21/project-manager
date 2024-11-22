import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function ProjectTags({ tags }) {
  const tagsArray = Array.isArray(tags)
    ? tags
    : typeof tags === 'string'
    ? tags.split(',').map(tag => tag.trim())
    : [];

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Tags</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tagsArray.length > 0 ? (
            tagsArray.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-100 text-gray-800 font-normal"
              >
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">Aucun tag disponible</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

ProjectTags.propTypes = {
  tags: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired
};
