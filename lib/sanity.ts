import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-21',
  useCdn: false,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: string | null): {
  url: () => string;
} {
  return imageUrlBuilder(client).image(source || '');
}

export async function sanityFetch<T>(query: string): Promise<T> {
  try {
    const data = await client.fetch<T>(query)
    return data
  } catch (error) {
    console.error('Sanity fetch error:', error)
    throw new Error('Failed to fetch data from Sanity')
  }
} 