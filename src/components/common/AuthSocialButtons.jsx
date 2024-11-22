'use client';

import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AuthSocialButtons() {
  return (
    <div className="social-buttons">
      <button className="btn btn-outline-secondary w-100 mb-2">
        <FontAwesomeIcon icon={faGoogle} className="text-danger me-2" />
        Sign up with Google
      </button>
      <button className="btn btn-outline-secondary w-100">
        <FontAwesomeIcon icon={faFacebook} className="text-primary me-2" />
        Sign up with Facebook
      </button>
    </div>
  );
}