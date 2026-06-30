import { useState } from 'react'

interface BlogImageProps {
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  src?: string | null
}

export default function BlogImage({ alt, className, loading = 'lazy', src }: BlogImageProps) {
  const [hasFailed, setHasFailed] = useState(false)

  if (!src || hasFailed) {
    return (
      <div className={`lp-blog-image-placeholder${className ? ` ${className}` : ''}`} role="img" aria-label={alt}>
        <span>Calkilo</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={className}
      decoding="async"
      loading={loading}
      onError={() => setHasFailed(true)}
      src={src}
    />
  )
}
