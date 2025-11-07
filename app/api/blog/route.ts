import { NextResponse } from 'next/server';
import { getAllBlogPosts, getBlogsByCluster } from '@/lib/blog';

export async function GET() {
  try {
    const posts = getAllBlogPosts();
    const clusters = getBlogsByCluster();

    return NextResponse.json({
      posts,
      clusters,
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
