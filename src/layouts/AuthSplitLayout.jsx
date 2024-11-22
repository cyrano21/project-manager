'use client';

import React from 'react';

export default function AuthSplitLayout({ bg, children }) {
  return (
    <div className="auth-layout">
      <div className="auth-bg d-none d-lg-block" style={{ backgroundImage: `url(${bg})` }} />
      <div className="auth-content">
        <div className="container">
          <div className="row justify-content-center min-vh-100 align-items-center">
            <div className="col-lg-6 col-md-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}