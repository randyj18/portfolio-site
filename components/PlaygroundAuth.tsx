'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaygroundAuthProps {
  onAuthenticate?: (username: string, password: string) => Promise<boolean>;
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * PlaygroundAuth - Authentication wrapper for playground demos
 *
 * This component provides a reusable authentication layer for playground demos.
 * When requireAuth is true, it displays a login form before showing the demo content.
 *
 * Usage:
 * <PlaygroundAuth
 *   requireAuth={true}
 *   onAuthenticate={async (username, password) => {
 *     // Your authentication logic here
 *     return true; // or false based on validation
 *   }}
 * >
 *   <YourDemoComponent />
 * </PlaygroundAuth>
 */
export default function PlaygroundAuth({
  onAuthenticate,
  children,
  requireAuth = false
}: PlaygroundAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(!requireAuth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (onAuthenticate) {
        const success = await onAuthenticate(username, password);
        if (success) {
          setIsAuthenticated(true);
        } else {
          setError('Invalid credentials. Please try again.');
        }
      } else {
        // Default behavior if no auth handler provided
        setError('Authentication is not configured for this demo.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-sm border border-slate/20 p-8 shadow-lg">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-navy mb-2">Demo Access</h3>
            <p className="text-slate text-sm">
              This demo requires authentication. Enter your credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-navy mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-light focus:border-transparent transition-all"
                placeholder="Enter username"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-navy mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate/30 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-light focus:border-transparent transition-all"
                placeholder="Enter password"
                required
                disabled={isLoading}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-medium/10 border border-red-medium/30 rounded-sm p-4"
                >
                  <p className="text-sm text-red-dark">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-gradient-to-r from-gold-light to-orange-burnt text-navy font-semibold rounded-sm hover:shadow-lg hover:shadow-orange-burnt/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? 'Authenticating...' : 'Access Demo'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate/20">
            <p className="text-xs text-slate text-center">
              Usage is monitored and rate-limited to ensure fair access for all visitors.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
