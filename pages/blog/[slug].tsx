import { GetStaticPaths, GetStaticProps } from 'next'
import BlogDetailPage from '../../components/BlogDetailPage'
import { fetchBlogPost, fetchBlogPosts, type BlogPost } from '../../lib/blog'

interface BlogPostPageProps {
  initialPost?: BlogPost | null
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await fetchBlogPosts('en')

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''

  if (!slug) {
    return {
      notFound: true,
    }
  }

  try {
    const initialPost = await fetchBlogPost(slug, 'en')

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
