import { GetStaticPaths, GetStaticProps } from 'next'
import ScanExamplePage from '../../../components/ScanExamplePage'
import { getScanExamplePage, SCAN_EXAMPLE_PAGES, type ScanExamplePageData } from '../../../lib/scan-example-pages'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: SCAN_EXAMPLE_PAGES.map((example) => ({
    params: { exampleSlug: example.slug },
  })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<ScanExampleRouteProps> = async ({ params }) => {
  const example = getScanExamplePage(String(params?.exampleSlug || ''))

  if (!example) {
    return { notFound: true }
  }

  return {
    props: {
      example,
    },
  }
}

interface ScanExampleRouteProps {
  example: ScanExamplePageData
}

export default function PersianScanExampleRoute({ example }: ScanExampleRouteProps) {
  return <ScanExamplePage example={example} />
}

