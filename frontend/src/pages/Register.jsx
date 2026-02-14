import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await register(name, email, password);
      setShowToast(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
      {showToast && (
        <Toast
          type="success"
          message="Registration successful!"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Start planning your dream trips today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Full Name" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} icon={<User className="w-5 h-5" />} />
            <Input type="email" label="Email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail className="w-5 h-5" />} />
            <Input type="password" label="Password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} icon={<Lock className="w-5 h-5" />} />
            <Input type="password" label="Confirm Password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} icon={<Lock className="w-5 h-5" />} />

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};