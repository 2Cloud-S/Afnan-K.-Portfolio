import { type SchemaTypeDefinition } from 'sanity'
import project from './schemaTypes/project'
import about from './schemaTypes/about'
import post from './schemaTypes/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, about, post],
} 