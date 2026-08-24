import { defineField, defineType } from 'sanity'

export const categoriaType = defineType({
  name: 'categoria',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      options: {
        list: [
          'Corporativo',
          'Residencial',
          'Hotelería y Entretenimiento',
          'Azoteas y Terrazas',
          'Casas Playa',
          'Casas Sur',
          'Inmobiliarias',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredProject',
      title: 'Proyecto destacado',
      type: 'reference',
      to: [{ type: 'proyecto' }],
      description: 'El proyecto que aparece destacado arriba al filtrar por esta categoría',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'featuredProject.name',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? 'Sin nombre',
        subtitle: subtitle ? `Destacado: ${subtitle}` : 'Sin proyecto destacado',
      }
    },
  },
})
