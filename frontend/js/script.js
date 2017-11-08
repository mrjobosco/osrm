mapboxgl.accessToken = 'pk.eyJ1IjoibXJqb29zY28iLCJhIjoiY2o5cWpmYXA1NjQ0dDJ3cW1zdG9iZTZkdSJ9.usN4xmhvpr53WvyxTk3vjA';
var map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [5.247552, 13.005873],
    zoom: 10
});


$("form#form").submit(function(){
    
        var formData = new FormData(this);
    
        $.ajax({
            url: 'http://localhost:3333/api/route',
            type: 'POST',
            data: formData,
            async: false,
            success: function (response) {
                for (let i = 0; i < response.json.length; i++) {
                    console.log(response.json[i].route[0].routes[0].geometry)
                    
                    map.addLayer(
                        {
                            "id": "r"+i,
                            "type":"line",
                            "source":{
                                "type":"geojson",
                                "data": {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry":response.json[i].route[0].routes[0].geometry
                            }
                        },
                            "layout": {
                                "line-join": "round",
                                "line-cap": "round"
                            },
                            "paint": {
                                "line-color": "#888",
                                "line-width": 1
                            }
                    })
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    
        return false;
    });
