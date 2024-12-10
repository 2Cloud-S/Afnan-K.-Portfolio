import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from '../sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [deskTool()],

  schema: {
    types: schemaTypes,
  },
}) 