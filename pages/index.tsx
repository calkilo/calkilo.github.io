import { GetStaticProps } from 'next'
import LandingPage from '../components/LandingPage'
import { fetchBlogListSnapshot, type BlogListSnapshot } from '../lib/blog'

interface HomePageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const blogSnapshot = await fetchBlogListSnapshot('en')

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
