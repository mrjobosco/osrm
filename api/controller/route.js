'use strict'
// Third part imports 
const multer = require('multer')
const path = require('path')
const csv = require('csvtojson')

// Local imports
const log = require('../util/logger')

const routeOptimizer = {    

     process: (req, res) => {
         var csvfilename
        log.info("Route request received.")
 
        multer({ dest: './uploads/',
        rename: function (fieldname, filename)   {
            return filename+Date.now()
         },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting ...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path)
         }
        })

        var storage = multer.diskStorage({
            destination: function(req, file, callback) {
               callback(null,  './uploads/')
            },
            filename: function(req, file, callback) {
                csvfilename = file.fieldname + '-' + Date.now() + path.extname(file.originalname)
                callback(null, csvfilename)
            }
        })

        var upload = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
                var ext = path.extname(file.originalname)
                if (ext !== '.csv') {
                    return callback(res.end('Only .csv files are allowed'), null)
                }
                callback(null, true)
            }
        }).single('csv')

        
        upload(req, res, (err) => {
            var jsonresponse = {};
            if(err){
                res.status(500).json(err)
            }else{
                csv({
                    noheader: false            
                })
                .fromFile('./uploads/'+csvfilename)
                .on('end_parsed', jsonObj=>{

                    var sort = require('./sort')
                  
                    sort.populateArray(jsonObj).then(response => {
                        res.status(200).json({
                            "json":response
                        })
                    })
                   
                 })
            }
        })
        
        
    }
}

module.exports = routeOptimizer
