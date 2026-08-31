import { GetStaticProps } from 'next'
import BlogArchivePage from '../../components/BlogArchivePage'
import { getBlogBuildSnapshot } from '../../lib/blog-build-data'
import { type BlogListSnapshot } from '../../lib/blog'

interface BlogPageProps {
  blogSnapshot?: BlogListSnapshot
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  const blogSnapshot = getBlogBuildSnapshot('en')

  return {
    props: {
      blogSnapshot,
    },
  }
}

export default function BlogPage({ blogSnapshot }: BlogPageProps) {
  return <BlogArchivePage initialPosts={blogSnapshot?.posts} initialStatus={blogSnapshot?.status} lang="en" />
}
