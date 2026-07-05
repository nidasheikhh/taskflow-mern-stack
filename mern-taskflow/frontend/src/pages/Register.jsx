import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-mist">
      <Navbar />
      <div className="max-w-md mx-auto px-6 pt-16 md:pt-24">
        <h1 className="font-display text-3xl font-semibold text-ink mb-2">
          Create your account
        </h1>
        <p className="text-flow-700 mb-8">Takes less than a minute. No credit card.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              className="w-full px-4 py-3 rounded-xl border border-flow-100 bg-white focus:border-flow-600 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-flow-100 bg-white focus:border-flow-600 outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-xl border border-flow-100 bg-white focus:border-flow-600 outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-flow-700 text-white font-semibold hover:bg-ink transition-colors disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-flow-700 mt-6 text-center">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-flow-600 hover:text-ink">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
