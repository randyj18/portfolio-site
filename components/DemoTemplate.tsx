'use client';

import PlaygroundAuth from './PlaygroundAuth';

/**
 * DemoTemplate - Example template for creating playground demos
 *
 * This component demonstrates how to structure a playground demo with optional authentication.
 * Copy this template when creating new demos.
 *
 * To enable authentication:
 * 1. Set requireAuth={true}
 * 2. Implement the onAuthenticate handler with your authentication logic
 * 3. Optionally integrate with API routes for server-side validation
 */

interface DemoTemplateProps {
  requireAuth?: boolean;
}

export default function DemoTemplate({ requireAuth = false }: DemoTemplateProps) {
  // Example authentication handler
  // Replace this with actual API calls when ready
  const handleAuthentication = async (username: string, password: string): Promise<boolean> => {
    // Example: Call your API endpoint
    // const response = await fetch('/api/auth/verify', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // return response.ok;

    // Placeholder for demonstration (remove in production)
    console.log('Auth attempt:', { username, password });
    return false; // Always deny for now
  };

  return (
    <PlaygroundAuth
      requireAuth={requireAuth}
      onAuthenticate={handleAuthentication}
    >
      <div className="py-24 bg-beige">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-navy mb-6">Demo Content</h2>
            <p className="text-lg text-slate leading-relaxed mb-8">
              This is the authenticated demo content. Replace this with your actual demo implementation.
            </p>

            {/* Demo interface */}
            <div className="bg-white rounded-sm border border-slate/20 p-8">
              <h3 className="text-xl font-bold text-navy mb-4">Interactive Demo</h3>
              <p className="text-slate mb-6">
                Add your interactive demo components here. This could be:
              </p>
              <ul className="list-disc list-inside text-slate space-y-2 mb-8">
                <li>AI-powered tools or chatbots</li>
                <li>Data visualization dashboards</li>
                <li>API demonstrations</li>
                <li>Code playgrounds</li>
                <li>Interactive tutorials</li>
              </ul>

              <div className="bg-beige/50 border border-gold-dark/20 rounded-sm p-6">
                <p className="text-sm text-slate italic">
                  Demo placeholder - replace with your implementation
                </p>
              </div>
            </div>

            {/* Usage info */}
            <div className="mt-8 border-l-4 border-gold-dark pl-6">
              <h4 className="text-lg font-bold text-navy mb-2">Usage Notes</h4>
              <p className="text-slate text-sm leading-relaxed">
                Rate limits and quotas are enforced at the cloud provider level to ensure reliable
                access. Each user has a daily quota that resets at midnight UTC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PlaygroundAuth>
  );
}
