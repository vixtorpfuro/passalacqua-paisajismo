import { type SchemaTypeDefinition } from 'sanity'
import { proyectoType } from './proyecto'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [proyectoType],
}
