import { GetServerSideProps } from 'next'
import BlogDetailPage from '../../components/BlogDetailPage'
import { fetchBlogPost, type BlogPost } from '../../lib/blog'

interface BlogPostPageProps {
  initialPost?: BlogPost | null
  slug: string
}

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async ({ params, res }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    const initialPost = await fetchBlogPost(slug, 'en')

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400')

    return {
      props: {
        initialPost,
        slug,
      },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default function BlogPostPage({ initialPost, slug }: BlogPostPageProps) {
  return <BlogDetailPage initialPost={initialPost} lang="en" slug={slug} />
}
