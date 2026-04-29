import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'coverTagline',      title: 'Cover tagline (first line)',    type: 'string' }),
    defineField({ name: 'coverConsultancy',  title: 'Cover consultancy line',        type: 'string' }),
    defineField({ name: 'contactEmail',      title: 'Contact email',                 type: 'string' }),
    defineField({ name: 'contactPhone',      title: 'Contact phone',                 type: 'string' }),
    defineField({ name: 'instagramUrl',      title: 'Instagram URL',                 type: 'url' }),
    defineField({ name: 'youtubeUrl',        title: 'YouTube URL',                   type: 'url' }),
    defineField({ name: 'soundcloudUrl',     title: 'SoundCloud URL',                type: 'url' }),
    defineField({ name: 'applePodcastsUrl',  title: 'Apple Podcasts URL',            type: 'url' }),
  ],
  preview: { select: { title: 'contactEmail' } },
})
