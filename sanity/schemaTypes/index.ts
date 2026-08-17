import { type SchemaTypeDefinition } from 'sanity'
import { proyectoType } from './proyecto'
import { postType } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [proyectoType, postType],
}
