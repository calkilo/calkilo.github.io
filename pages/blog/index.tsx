import { GetStaticProps } from 'next'
import BlogArchivePage from '../../components/BlogArchivePage'
import { fetchBlogListSnapshot, type BlogListSnapshot } from '../../lib/blog'

interface BlogPageProps {
  blogSnapshot?: BlogListSnapshot
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const blogSnapshot = await fetchBlogListSnapshot('en')

  return {
    props: {
      blogSnapshot,
    },
  }
}

export default function BlogPage({ blogSnapshot }: BlogPageProps) {
  return <BlogArchivePage initialPosts={blogSnapshot?.posts} initialStatus={blogSnapshot?.status} lang="en" />
}
