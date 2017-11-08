const http = require('http')
const axios = require('axios')

   { 
       function getService(service, coordinates){

        //Route Service
        if(service == "route")
        var url = 'http://localhost:5000/'+service+'/v1/driving/'+convertCoordinateToString(coordinates)+'?geometries=geojson'
        console.log(url)
        return axios.get(url, 
        res=>{
            return res
        })
    }
        function getRouteGeoJson(coordinates){

            return getService("route", coordinates).then(data => {
                return [data.data]
            }).catch(err => {
                console.log('this error => ', err)
            })

        }
        function getDistanceBetweenTwoCoordinates(lonlat1, lonlat2){  
        return getService("route", [lonlat1, lonlat2]).then(data => {
           
            return [data.data.routes[0].distance, data.data.routes[0].duration]
         }).catch(err => {
             console.log("this is an error", err)
         })
    }

     
    function convertCoordinateToString(coordinates){
        var longCoordinates = coordinates.map(obj => {
            return obj.join(',')
        })
        return longCoordinates.join(';')
    }

   function populateArray(jsonObj){
            
            var nameDistanceArray = []
          
        jsonObj.forEach((obj)=>{
        
           nameDistanceArray.push(getRouteGeoJson([[13.053708,5.245972], [obj.Latitude,obj.Longitude]]).then(data =>{
                    var json = {
                        "code": obj.Hthfa_code,
                        "zone":obj.Zone,
                        "lga":obj.LGA,
                        "name":obj.HF_Name,
                        "ward":obj.Ward,
                        "Latitude": obj.Latitude,
                        "Longitude": obj.Longitude,
                        "route": data
                    }
                    return json
                }))
            })
            return Promise.all(nameDistanceArray).then(response => {
                return response.sort(
                    (a,b)=>{
                        a.duration - b.duration
                        // var x = a.lga; var y = b.lga;
                        // return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                })
             })
         
    }
   }
    module.exports.populateArray = populateArray