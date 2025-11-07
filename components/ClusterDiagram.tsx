"use client";

import { useState } from 'react';
import Link from 'next/link';
import { BlogCluster } from '@/lib/blog';

interface ClusterDiagramProps {
  clusters: BlogCluster[];
}

interface ClusterPosition {
  x: number;
  y: number;
}

export default function ClusterDiagram({ clusters }: ClusterDiagramProps) {
  const [activeCluster, setActiveCluster] = useState<string | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);

  // Define positions for each cluster aligned with circuit background image buttons
  // Note: These coordinates are for the 1600x800 background image
  // with background-size: cover in a responsive container
  const clusterPositions: Record<string, ClusterPosition> = {
    'Knowledge & Operations': { x: 58.44, y: 11.88 },
    'Systems & Architecture': { x: 27.13, y: 36.13 },
    'Strategy & Market Analysis': { x: 48.25, y: 44.63 },
    'Strategy & Implementation': { x: 63.50, y: 50.13 },
    'Governance & Implementation': { x: 79.63, y: 44.75 },
    'Strategy & Architecture': { x: 31.94, y: 56.75 },
    'Adoption & Tooling': { x: 67.44, y: 70.00 },
    'Perspective & Opinion': { x: 50, y: 85 }, // Placeholder for unmapped cluster
  };

  const getClusterColor = (cluster: string): string => {
    const colors: Record<string, string> = {
      'Systems & Architecture': '#D4AF37', // gold-light
      'Knowledge & Operations': '#8B4513', // bronze
      'Governance & Implementation': '#CC5500', // orange-burnt
      'Strategy & Architecture': '#B8860B', // gold-dark
      'Strategy & Market Analysis': '#CD7F32', // bronze-light
      'Strategy & Implementation': '#FF6347', // red-medium
      'Adoption & Tooling': '#2F4F4F', // green-forest
      'Perspective & Opinion': '#DAA520', // goldenrod
    };
    return colors[cluster] || '#D4AF37';
  };

  const handleClusterClick = (clusterName: string) => {
    setActiveCluster(activeCluster === clusterName ? null : clusterName);
  };

  return (
    <div className="relative w-full bg-navy rounded-sm border border-slate/20" style={{ aspectRatio: '2 / 1' }}>
      {/* Background circuit pattern */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'url(/images/circuit-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Fade effect at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(27, 34, 46, 0.4) 70%, rgba(27, 34, 46, 0.7) 100%)',
        }}
      />

      {/* Text overlay for post counts and cluster names */}
      <div className="absolute inset-0 pointer-events-none">
        {clusters.map((cluster) => {
          const position = clusterPositions[cluster.name] || { x: 50, y: 50 };

          return (
            <div
              key={`count-${cluster.name}`}
              className="absolute"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -60%)',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: '0.85rem',
                color: 'rgba(237, 221, 204, 0.8)',
                marginBottom: '0.5rem',
                fontWeight: '600',
                maxWidth: '110px',
                lineHeight: '1.2',
              }}>
                {cluster.name}
              </div>
              <div style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: '#A6602C',
                lineHeight: '1',
              }}>
                {cluster.posts.length}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: 'rgba(237, 221, 204, 0.7)',
                marginTop: '0.25rem',
              }}>
                Posts
              </div>
            </div>
          );
        })}
      </div>

      {/* Cluster labels and expanded content */}
      <div className="absolute inset-0 pointer-events-none">
        {clusters.map((cluster) => {
          const position = clusterPositions[cluster.name] || { x: 50, y: 50 };
          const isActive = activeCluster === cluster.name;

          return (
            <div
              key={cluster.name}
              className="absolute transition-all duration-300 pointer-events-auto cursor-pointer"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => handleClusterClick(cluster.name)}
              onMouseEnter={() => setHoveredCluster(cluster.name)}
              onMouseLeave={() => setHoveredCluster(null)}
            >
              {/* Cluster name label */}
              <div className={`
                text-center transition-all duration-300 whitespace-nowrap
                ${isActive ? 'text-gold-light font-bold text-xs' : 'text-beige text-xs opacity-0'}
              `}>
                {cluster.name}
              </div>

              {/* Expanded blog posts */}
              {isActive && (
                <div className="pointer-events-auto z-20 absolute" style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}>
                  <div className="bg-navy/98 backdrop-blur-md border border-gold-light/50 rounded-sm p-6 w-[420px] shadow-2xl shadow-black/60" style={{
                    maxHeight: '70vh',
                    overflowY: 'auto',
                  }}>
                    <h3 className="text-base uppercase tracking-widest text-gold-light font-semibold mb-4 border-b border-gold-light/20 pb-3">Posts in cluster</h3>
                    <div className="space-y-3">
                      {cluster.posts.map((post) => (
                        <Link
                          key={post.slug}
                          href={`/blog/${post.slug}`}
                          className="block p-4 bg-navy/40 rounded-sm hover:bg-navy/60 hover:border-gold-light/50 border border-slate/20 transition-all duration-200 group"
                        >
                          <h4 className="text-base font-semibold text-beige group-hover:text-gold-light transition-colors duration-200 leading-tight">
                            {post.title}
                          </h4>
                          {post.subtitle && (
                            <p className="text-sm text-slate mt-2 line-clamp-2">
                              {post.subtitle}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <p className="text-xs text-slate/60 uppercase tracking-widest">
          Click clusters to explore posts
        </p>
      </div>
    </div>
  );
}
