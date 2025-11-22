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
    'Knowledge & Operations': { x: 58.69, y: 13.1 },
    'Systems & Architecture': { x: 26.85, y: 37.13 },
    'Strategy & Market Analysis': { x: 48.35, y: 46.65 },
    'Strategy & Implementation': { x: 64, y: 51.75 },
    'Governance & Implementation': { x: 80.4, y: 46.4 },
    'Strategy & Architecture': { x: 31.55, y: 58.9 },
    'Adoption & Tooling': { x: 68.2, y: 71.75 },
    'Perspective & Opinion': { x: 50, y: 86 }, // Placeholder for unmapped cluster
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
    <div className="relative w-full rounded-sm" style={{ aspectRatio: '2 / 1', backgroundColor: '#1C222D' }}>
      {/* Background circuit pattern */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: 'url(/images/circuit-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Fade effect at edges - blends border into background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, #1C222D 0%, #1C222D 5%, transparent 15%, transparent 85%, #1C222D 95%, #1C222D 100%),
            linear-gradient(to bottom, #1C222D 0%, #1C222D 5%, transparent 15%, transparent 85%, #1C222D 95%, #1C222D 100%)
          `,
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
                background: 'radial-gradient(ellipse at center, rgba(28, 34, 45, 0.7) 0%, rgba(28, 34, 45, 0.4) 55%, transparent 90%)',
                padding: '1rem',
                borderRadius: '4px',
              }}
            >
              <div style={{
                fontSize: '0.85rem',
                color: '#FAAE1B',
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
                color: '#C9C8C5',
                lineHeight: '1',
              }}>
                {cluster.posts.length}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: '#FAAE1B',
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
        <p className="text-xs text-beige-warm uppercase tracking-widest">
          Click clusters to explore posts
        </p>
      </div>
    </div>
  );
}
