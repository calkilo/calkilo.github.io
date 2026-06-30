import { GetStaticProps } from 'next'
import LandingPage from '../components/LandingPage'
import { fetchBlogListSnapshot, type BlogListSnapshot } from '../lib/blog'

interface DarkPageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<DarkPageProps> = async () => {
  const blogSnapshot = await fetchBlogListSnapshot('en')

  return {
    props: {
      blogSnapshot,
      lang: 'en',
    },
  }
}

export default function DarkPage({ blogSnapshot, lang }: DarkPageProps) {
  return (
    <LandingPage
      initialBlogPosts={blogSnapshot?.posts}
      initialBlogStatus={blogSnapshot?.status}
      lang={lang}
      variant="dark"
    />
  )
}
