import { GetStaticProps } from 'next'
import LandingPage from '../components/LandingPage'
import { getBlogBuildSnapshot } from '../lib/blog-build-data'
import { type BlogListSnapshot } from '../lib/blog'

interface HomePageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const blogSnapshot = getBlogBuildSnapshot('en', 3)

  return {
    props: {
      blogSnapshot,
      lang: 'en',
    },
  }
}

export default function HomePage({ blogSnapshot, lang }: HomePageProps) {
  return (
    <LandingPage
      initialBlogPosts={blogSnapshot?.posts}
      initialBlogStatus={blogSnapshot?.status}
      lang={lang}
      variant="light"
    />
  )
}
