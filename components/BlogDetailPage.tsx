import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  fetchBlogPost,
  formatBlogDate,
  formatBlogDateValue,
  getBlogArchivePath,
  getBlogPostAlternateLanguagePaths,
  normalizeBlogLanguage,
  type BlogPost,
} from '../lib/blog'
import { getBlogCopy } from '../lib/blog-copy'
import { SITE_URL } from '../lib/seo'
import { type SiteLanguage } from '../lib/site-language'
import BlogImage from './BlogImage'
import BlogMarkdown from './BlogMarkdown'
import StaticPageLayout from './StaticPageLayout'

type BlogDetailStatus = 'error' | 'loading' | 'ready'

interface BlogDetailPageProps {
  alternateLanguagePaths?: ReadonlyArray<{ lang: string; path: string }>
  initialPost?: BlogPost | null
  lang?: string
  slug: string
}

const EDITORIAL_COPY: Record<SiteLanguage, {
  author: string
  updated: string
  noteTitle: string
  note: string
  methodology: string
  referencesTitle: string
  referencesIntro: string
}> = {
  en: {
    author: 'Calkilo Editorial Team',
    updated: 'Updated',
    noteTitle: 'Editorial and health note',
    note: 'This article is general education, not medical advice. Nutrition values and food-photo results are estimates; recipes, portions, oils, sauces, and hidden ingredients can materially change them.',
    methodology: 'Read how Calkilo approaches nutrition estimates',
    referencesTitle: 'Authoritative nutrition references',
    referencesIntro: 'Use these official sources to verify general nutrition values and dietary guidance:',
  },
  nl: {
    author: 'Calkilo-redactieteam', updated: 'Bijgewerkt', noteTitle: 'Redactionele en gezondheidsnotitie',
    note: 'Dit artikel is algemene informatie en geen medisch advies. Voedingswaarden en fotoresultaten zijn schattingen; recepten, porties, olie, sauzen en verborgen ingredienten kunnen de uitkomst veranderen.',
    methodology: 'Lees hoe Calkilo voedingsschattingen benadert', referencesTitle: 'Betrouwbare voedingsbronnen',
    referencesIntro: 'Gebruik deze officiele bronnen om algemene voedingswaarden en richtlijnen te controleren:',
  },
  ru: {
    author: 'Редакция Calkilo', updated: 'Обновлено', noteTitle: 'Редакционное примечание о здоровье',
    note: 'Статья носит общий образовательный характер и не является медицинской рекомендацией. Пищевая ценность и результаты анализа фото являются оценочными; рецепты, порции, масла, соусы и скрытые ингредиенты могут изменить результат.',
    methodology: 'Как Calkilo подходит к оценке питания', referencesTitle: 'Авторитетные источники по питанию',
    referencesIntro: 'Проверяйте общие данные и рекомендации по официальным источникам:',
  },
  zh: {
    author: 'Calkilo 编辑团队', updated: '更新于', noteTitle: '编辑与健康说明',
    note: '本文仅用于一般教育，不构成医疗建议。营养数值和食物照片结果均为估算；配方、份量、油、酱汁和隐藏食材都会显著影响结果。',
    methodology: '了解 Calkilo 如何处理营养估算', referencesTitle: '权威营养参考',
    referencesIntro: '请使用以下官方来源核对一般营养数据和膳食指导：',
  },
  ar: {
    author: 'فريق تحرير Calkilo', updated: 'آخر تحديث', noteTitle: 'ملاحظة تحريرية وصحية',
    note: 'هذه المقالة للتثقيف العام وليست نصيحة طبية. القيم الغذائية ونتائج صور الطعام تقديرات؛ وقد تغير الوصفة والحصة والزيوت والصلصات والمكونات المخفية النتيجة بشكل ملحوظ.',
    methodology: 'اقرأ كيف تتعامل Calkilo مع تقديرات التغذية', referencesTitle: 'مراجع تغذية موثوقة',
    referencesIntro: 'استخدم هذه المصادر الرسمية للتحقق من القيم والإرشادات الغذائية العامة:',
  },
  fa: {
    author: 'تیم تحریریه Calkilo', updated: 'به‌روزرسانی', noteTitle: 'یادداشت تحریریه و سلامت',
    note: 'این مقاله برای آموزش عمومی است و توصیه پزشکی محسوب نمی‌شود. مقادیر تغذیه‌ای و نتایج عکس غذا تخمینی هستند؛ دستور پخت، اندازه وعده، روغن، سس و مواد پنهان می‌توانند نتیجه را به‌طور محسوسی تغییر دهند.',
    methodology: 'روش Calkilo برای تخمین اطلاعات تغذیه‌ای', referencesTitle: 'منابع معتبر تغذیه',
    referencesIntro: 'برای بررسی مقادیر و راهنماهای عمومی تغذیه از این منابع رسمی استفاده کنید:',
  },
  it: {
    author: 'Redazione Calkilo', updated: 'Aggiornato', noteTitle: 'Nota editoriale e sanitaria',
    note: 'Questo articolo offre informazioni generali e non sostituisce un consiglio medico. I valori nutrizionali e i risultati da foto sono stime; ricetta, porzione, oli, salse e ingredienti nascosti possono cambiare il risultato.',
    methodology: 'Come Calkilo gestisce le stime nutrizionali', referencesTitle: 'Fonti nutrizionali autorevoli',
    referencesIntro: 'Usa queste fonti ufficiali per verificare valori e indicazioni nutrizionali generali:',
  },
}

const NUTRITION_REFERENCES = [
  { label: 'USDA FoodData Central', href: 'https://fdc.nal.usda.gov/' },
  { label: 'World Health Organization — Healthy diet', href: 'https://www.who.int/news-room/fact-sheets/detail/healthy-diet' },
  { label: 'European Food Safety Authority — Dietary reference values', href: 'https://www.efsa.europa.eu/en/topics/topic/dietary-reference-values' },
] as const

export default function BlogDetailPage({ alternateLanguagePaths, initialPost = null, lang, slug }: BlogDetailPageProps) {
  const language = normalizeBlogLanguage(lang)
  const copy = getBlogCopy(language)
  const editorialCopy = EDITORIAL_COPY[language]
  const hasInitialPost = Boolean(initialPost)
  const [post, setPost] = useState<BlogPost | null>(initialPost)
  const [status, setStatus] = useState<BlogDetailStatus>(initialPost ? 'ready' : 'loading')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (hasInitialPost && initialPost) {
      setPost(initialPost)
      setStatus('ready')

      if (reloadKey === 0) {
        return
      }
    }

    const controller = new AbortController()

    if (!hasInitialPost) {
      setStatus('loading')
    }

    fetchBlogPost(slug, language, { signal: controller.signal })
      .then((nextPost) => {
        setPost(nextPost)
        setStatus('ready')
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        if (hasInitialPost && initialPost) {
          setPost(initialPost)
          setStatus('ready')
          return
        }

        setStatus('error')
      })

    return () => controller.abort()
  }, [hasInitialPost, initialPost, language, reloadKey, slug])

  const pageTitle = post?.title || copy.detailLoadingTitle
  const pageDescription = post?.excerpt || copy.detailLoadingIntro
  const basePath = `/blog/${post?.slug || slug}`
  const publishedDate = post ? formatBlogDate(post, language) : ''
  const updatedDate = post?.updated_at ? formatBlogDateValue(post.updated_at, language) : ''
  const articleUrl = `${SITE_URL}${language === 'en' ? basePath : `/${language}${basePath}`}/`
  const resolvedAlternateLanguagePaths = alternateLanguagePaths
    ?? (post ? getBlogPostAlternateLanguagePaths(post) : undefined)

  const jsonLd = useMemo(() => {
    if (!post) {
      return undefined
    }

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: post.image_url ? [post.image_url] : undefined,
        datePublished: post.published_at || post.created_at || undefined,
        dateModified: post.updated_at || post.published_at || undefined,
        keywords: post.tags.length > 0 ? post.tags : undefined,
        articleSection: post.topic || undefined,
        inLanguage: language,
        url: articleUrl,
        author: {
          '@type': 'Organization',
          name: editorialCopy.author,
          url: SITE_URL,
          parentOrganization: {
            '@type': 'Organization',
            name: 'Calkilo',
            url: SITE_URL,
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'Calkilo',
          url: SITE_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/assets/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Blog',
            item: `${SITE_URL}${getBlogArchivePath(language)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ]
  }, [articleUrl, editorialCopy.author, language, post])

  return (
    <StaticPageLayout
      title={pageTitle}
      description={pageDescription}
      path={basePath}
      heading={pageTitle}
      intro={pageDescription}
      activeNav="blog"
      lang={language}
      ogType="article"
      imagePath={post?.image_url || undefined}
      imageAlt={post?.image_alt_text || post?.title || copy.fallbackImageAlt}
      jsonLd={jsonLd}
      noindex={!post}
      alternateLanguagePaths={resolvedAlternateLanguagePaths}
      articlePublishedTime={post?.published_at || post?.created_at || undefined}
      articleModifiedTime={post?.updated_at || post?.published_at || undefined}
      articleSection={post?.topic || undefined}
      articleTags={post?.tags}
    >
      <article className="lp-static-card lp-blog-detail-card">
        <div className="lp-blog-detail-cover">
          <BlogImage
            alt={post?.image_alt_text || post?.title || copy.fallbackImageAlt}
            className="lp-blog-detail-image"
            loading="eager"
            src={post?.image_url}
          />
        </div>

        <div className="lp-blog-detail-body">
          <Link className="lp-blog-back-link" href={getBlogArchivePath(language)}>
            {copy.backToBlog}
          </Link>

          {status === 'error' ? (
            <div className="lp-blog-state lp-blog-state--inline" role="alert">
              <h2>{copy.detailErrorTitle}</h2>
              <p>{copy.detailErrorText}</p>
              <button type="button" onClick={() => setReloadKey((key) => key + 1)}>
                {copy.retry}
              </button>
            </div>
          ) : null}

          {status === 'loading' ? (
            <div className="lp-blog-state lp-blog-state--inline" role="status">
              <h2>{copy.detailLoadingTitle}</h2>
              <p>{copy.detailLoadingIntro}</p>
            </div>
          ) : null}

          {post ? (
            <>
              <div className="lp-blog-detail-meta">
                {publishedDate ? (
                  <time dateTime={post.published_at || post.created_at || undefined}>
                    {copy.published}: {publishedDate}
                  </time>
                ) : null}
                {post.topic ? <span>{post.topic}</span> : null}
                {updatedDate && updatedDate !== publishedDate ? (
                  <time dateTime={post.updated_at || undefined}>{editorialCopy.updated}: {updatedDate}</time>
                ) : null}
                <span>{editorialCopy.author}</span>
              </div>

              {post.tags.length > 0 ? (
                <ul className="lp-blog-tags lp-blog-detail-tags" aria-label="Tags">
                  {post.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              ) : null}

              <div className="lp-blog-prose">
                <BlogMarkdown content={post.content} emptyLabel={copy.contentUnavailable} />
              </div>

              <aside className="lp-blog-editorial-note" aria-labelledby="blog-editorial-note-title">
                <h2 id="blog-editorial-note-title">{editorialCopy.noteTitle}</h2>
                <p>{editorialCopy.note}</p>
                <p><Link href="/about/#editorial-methodology">{editorialCopy.methodology}</Link></p>
                <h3>{editorialCopy.referencesTitle}</h3>
                <p>{editorialCopy.referencesIntro}</p>
                <ul>
                  {NUTRITION_REFERENCES.map((reference) => (
                    <li key={reference.href}>
                      <a href={reference.href} target="_blank" rel="noreferrer">{reference.label}</a>
                    </li>
                  ))}
                </ul>
              </aside>
            </>
          ) : null}
        </div>
      </article>
    </StaticPageLayout>
  )
}
