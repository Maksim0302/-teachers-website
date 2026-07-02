import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes } from './sanity/schemaTypes'

const singletons = [
  {
    title: 'Navigation Menu',
    schemaType: 'menuNavigation',
    documentId: 'menuNavigation',
  },
  { title: 'Hero', schemaType: 'hero', documentId: 'hero' },
  {
    title: 'Assessment Methodology',
    schemaType: 'assessmentMethodology',
    documentId: 'assessmentMethodology',
  },
  {
    title: 'Advanced Training',
    schemaType: 'advancedTraining',
    documentId: 'advancedTraining',
  },
  {
    title: 'Events School',
    schemaType: 'eventsSchool',
    documentId: 'eventsSchool',
  },
]

const singletonIds = singletons.map((item) => item.schemaType)

export default defineConfig({
  name: 'teachers-website',
  title: 'Teachers Website',
  projectId: projectId || 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            ...singletons.map(({ title, schemaType, documentId }) =>
              S.listItem()
                .title(title)
                .id(documentId)
                .child(
                  S.document().schemaType(schemaType).documentId(documentId)
                )
            ),
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonIds.includes(listItem.getId())
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  apiVersion,
})
