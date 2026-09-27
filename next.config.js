/** @type {import('next').NextConfig} */

// Posts that were merged or retired in the September 2026 refresh. Each old URL
// permanently redirects to the post that now carries its ideas (see
// SITE-REFRESH-NOTES.md). Keep these even if the old slugs look unused: people
// and search engines still have the old links.
const retiredPosts = {
  // Merged into another post
  'finance-tech-divide-ai-investment': '/blog/beyond-roi-measuring-ai-value',
  'custom-chat-interfaces': '/blog/build-vs-buy-agentic-ai',
  'multi-cloud-ai-strategy-2025': '/blog/cloud-provider-diversification',
  'knowledge-tax-ai-amplification': '/blog/duplicated-solution-problem',
  'resistance-to-adoption-ai-change': '/blog/shadow-ai-organizational-intelligence',
  'prompt-engineering-skills-gap': '/blog/reskilling-at-scale-ai-era',
  'data-storage-reality': '/blog/metadata-matters',
  // Unfinished template that was publicly reachable; kept in blogs/drafts/
  'model-rankings': '/blog',
};

const retiredResearch = {
  'deepseek-v3': '/research/deepseek-r1',
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    NEXT_PUBLIC_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA || 'dev',
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  async redirects() {
    return [
      ...Object.entries(retiredPosts).map(([slug, destination]) => ({
        source: `/blog/${slug}`,
        destination,
        permanent: true,
      })),
      ...Object.entries(retiredResearch).map(([slug, destination]) => ({
        source: `/research/${slug}`,
        destination,
        permanent: true,
      })),
    ];
  },
};

module.exports = nextConfig;
