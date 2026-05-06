import { defineField, defineType } from 'sanity'

/**
 * Episodes are sourced from Apple Podcasts (iTunes lookup) at runtime.
 * This document type lets editors flag a specific episode as "featured"
 * (tobacco-brown row + flipped play button) without changing the feed.
 */
export const podcastEpisode = defineType({
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'trackId',
      title: 'Apple Track ID',
      type: 'string',
      validation: r => r.required(),
      description: 'The Apple Podcasts trackId — visible in the iTunes URL after `?i=` (e.g. 1000758809096).',
    }),
    defineField({
      name: 'featured',
      title: 'Featured (tobacco theme)',
      type: 'boolean',
      initialValue: false,
      description: 'When true, this row gets the full tobacco-brown treatment with flipped play button.',
    }),
    defineField({
      name: 'title',
      title: 'Title override (optional)',
      type: 'string',
      description: 'Leave blank to use the title from Apple Podcasts.',
    }),
  ],
  preview: {
    select: { title: 'trackId', featured: 'featured', titleOverride: 'title' },
    prepare({ title, featured, titleOverride }) {
      return {
        title: titleOverride || `Track ${title}`,
        subtitle: featured ? '★ Featured' : 'Override',
      }
    },
  },
})
