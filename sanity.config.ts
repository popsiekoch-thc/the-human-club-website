import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes }   from './sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  name:    'the-human-club-studio',
  title:   'The Human Club',
  schema:  { types: schemaTypes },
  plugins: [structureTool()],
})
