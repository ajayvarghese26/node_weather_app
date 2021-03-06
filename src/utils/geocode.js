const request = require('request');

const geoCode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWpheXZhcmdoZXNlMjYiLCJhIjoiY2t3bWZmd3ptMXMzcjJwcGt3eDJ5aXN5OCJ9.NIZykUXLUwNuwDAmU64efg&limit=1';
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('not able to get geo info')
        }else if(body.message==="Not Found"){
            callback('NOt found '+body.message)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }

    })

}

module.exports=geoCode