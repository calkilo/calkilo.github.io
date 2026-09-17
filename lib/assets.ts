import manifest from '../data/asset-manifest.json'

type Asset = { url: string; width?: number; height?: number }
const assets: Record<string, Asset> = manifest
export function assetUrl(src: string) { return assets[src]?.url ?? src }
export function assetDimensions(src: string) { return assets[src] }
export function assetSrcSet(srcSet?: string) {
  return srcSet?.split(',').map(item => {
    const [src, descriptor] = item.trim().split(/\s+/)
    return `${assetUrl(src)}${descriptor ? ` ${descriptor}` : ''}`
  }).join(', ')
}
