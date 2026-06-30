import { GetStaticPaths, GetStaticProps } from 'next'
import BlogDetailPage from '../../components/BlogDetailPage'
import { fetchBlogPost, fetchBlogPosts, type BlogPost } from '../../lib/blog'

interface BlogPostPageProps {
  initialPost?: BlogPost | null
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await fetchBlogPosts('en')

    return {
      paths: posts.map((post) => ({
        params: { slug: post.slug },
      })),
      fallback: false,
    }
  } catch {
    return {
      paths: [],
      fallback: false,
    }
  }
}

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''

  if (!slug) {
    return {
      notFound: true,
    }
  }

  let initialPost: BlogPost | null = null

  try {
    initialPost = await fetchBlogPost(slug, 'en')
  } catch {
    initialPost = null
  }

  return {
    props: {
      initialPost,
      slug,
    },
  }
}

export default function BlogPostPage({ initialPost, slug }: BlogPostPageProps) {
  return <BlogDetailPage initialPost={initialPost} lang="en" slug={slug} />
}
