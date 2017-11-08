'use strict'

// Third party imports
const multer = require('multer')

// Local imports
const routeOptimizerController = require('../controller/route')

const routes = (app) => {
  
  // GET: Index route
  app.get('/api', (req, res) => {
    res.status(200).json("I optimize routes like crazy!!!!")
  })

  // GET: Campaign routes
 
  // POST: Process routes
  app.post('/api/route', routeOptimizerController.process)
  
 
  // GET: Non-existing routes
  app.use((req, res) => {
    res.redirect('/api')
  })
}

module.exports = routes
