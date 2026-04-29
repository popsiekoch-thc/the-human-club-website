import { defineField, defineType } from 'sanity'

export const artist = defineType({
  name: 'artist',
  title: 'Music & Artists',
  type: 'document',
  fields: [
    defineField({ name: 'name',       title: 'Name',           type: 'string', validation: r => r.required() }),
    defineField({ name: 'bio',        title: 'Bio',            type: 'text', rows: 3 }),
    defineField({ name: 'soundcloud', title: 'SoundCloud URL', type: 'url' }),
    defineField({ name: 'photo',      title: 'Photo',          type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order',      title: 'Order',          type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'photo' } },
})
