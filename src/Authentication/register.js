import React from 'react';
import './Auth.css';

export const Register = () => {
  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5">
                <h3 className="text-center mb-4">Create an Account</h3>
                <form>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control rounded-pill p-3" id="name" placeholder="John Doe" />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-pill p-3" id="email" placeholder="name@example.com" />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control rounded-pill p-3" id="password" placeholder="********"
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary rounded-pill p-3">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
