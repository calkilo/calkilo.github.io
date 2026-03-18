import Document, {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'
import { isRtlLanguage, normalizeSiteLanguage } from '../lib/site-language'

interface AppDocumentProps extends DocumentInitialProps {
  direction: 'ltr' | 'rtl'
  language: string
}

export default class AppDocument extends Document<AppDocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<AppDocumentProps> {
    const initialProps = await Document.getInitialProps(ctx)
    const queryLanguage = Array.isArray(ctx.query.lang) ? ctx.query.lang[0] : ctx.query.lang
    const language = normalizeSiteLanguage(queryLanguage)

    return {
      ...initialProps,
      direction: isRtlLanguage(language) ? 'rtl' : 'ltr',
      language,
    }
  }

  render() {
    const { direction, language } = this.props

    return (
      <Html lang={language} dir={direction}>
        <Head>
          <meta name="color-scheme" content="light dark" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
