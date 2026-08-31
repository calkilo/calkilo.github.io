import { GetStaticProps } from 'next'
import LandingPage from '../components/LandingPage'
import { getBlogBuildSnapshot } from '../lib/blog-build-data'
import { type BlogListSnapshot } from '../lib/blog'

interface DarkPageProps {
  blogSnapshot?: BlogListSnapshot
  lang?: string
}

export const getStaticProps: GetStaticProps<DarkPageProps> = async () => {
  const blogSnapshot = getBlogBuildSnapshot('en', 3)

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
