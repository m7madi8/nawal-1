/**
 * Downloads curated stock imagery for the retreat site into public/media
 * Uses Unsplash (https://unsplash.com/license) - free to use
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MEDIA_DIR = join(__dirname, '..', 'public', 'media')

const IMAGES = [
  {
    file: 'hero-mountain-retreat.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&fm=jpg',
    desc: 'Mountain peaks at dawn (hero)'
  },
  {
    file: 'story-lodge-exterior.jpg',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=85&fm=jpg',
    desc: 'Luxury mountain lodge exterior'
  },
  {
    file: 'story-yoga-deck.jpg',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=85&fm=jpg',
    desc: 'Yoga deck with valley view'
  },
  {
    file: 'story-tea-ritual.jpg',
    url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&q=85&fm=jpg',
    desc: 'Tea ceremony'
  },
  {
    file: 'testimonial-1.jpg',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85&fm=jpg',
    desc: 'Portrait 1 (Elena)'
  },
  {
    file: 'testimonial-2.jpg',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&fm=jpg',
    desc: 'Portrait 2 (Marcus)'
  },
  {
    file: 'testimonial-3.jpg',
    url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=85&fm=jpg',
    desc: 'Portrait 3 (Sophie)'
  },
  {
    file: 'quote-banner-mountains.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&fm=jpg',
    desc: 'Mountain peaks for quote banner'
  }
]

mkdirSync(MEDIA_DIR, { recursive: true })

for (const { file, url, desc } of IMAGES) {
  try {
    console.log(`Downloading ${desc}...`)
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RetreatAssets/1.0)' }
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const path = join(MEDIA_DIR, file)
    writeFileSync(path, buf)
    console.log(`  -> ${file} (${(buf.length / 1024).toFixed(1)} KB)`)
  } catch (e) {
    console.error(`  FAILED ${file}:`, e.message)
  }
}

console.log('Done.')
