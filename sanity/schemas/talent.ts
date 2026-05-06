import { defineField, defineType } from 'sanity'

export const talent = defineType({
  name: 'talent',
  title: 'Roster Talent',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Name',           type: 'string', validation: r => r.required() }),
    defineField({ name: 'handle',   title: 'Handle',         type: 'string', description: '@username' }),
    defineField({ name: 'role',     title: 'Role',           type: 'string' }),
    defineField({ name: 'bio',      title: 'Bio',            type: 'text', rows: 4 }),
    defineField({ name: 'igUrl',    title: 'Instagram URL',  type: 'url' }),
    defineField({ name: 'linkUrl',  title: 'Second Link URL', type: 'url' }),
    defineField({ name: 'linkLabel', title: 'Second Link Label', type: 'string', description: 'e.g. Website, TikTok' }),
    defineField({
      name: 'muxReel',
      title: 'Mux Reel',
      type: 'object',
      fields: [
        defineField({ name: 'playbackId', title: 'Mux Playback ID', type: 'string' }),
        defineField({ name: 'assetId',    title: 'Mux Asset ID',    type: 'string' }),
      ],
    }),
    defineField({
      name: 'reelRatio',
      title: 'Reel Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: 'Portrait 4:5 (default)', value: '4 / 5' },
          { title: 'Square 1:1',             value: '1 / 1' },
          { title: 'Landscape 16:9',         value: '16 / 9' },
          { title: 'Vertical 9:16 (Reels)',  value: '9 / 16' },
        ],
      },
      description: 'Override the frame ratio if this creator uploads square or landscape reels.',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Display order on page' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'role' } },
})
