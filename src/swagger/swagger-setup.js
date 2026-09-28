import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { swaggerOptions } from './swagger-config.js'

export function setupSwagger(app) {
  const specs = swaggerJsdoc(swaggerOptions)

  app.use('/api/docs', swaggerUi.serve)
  app.get('/api/docs', swaggerUi.setup(specs, { swaggerOptions: { tryItOutEnabled: true } }))
  app.get('/api/docs/json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })
}
