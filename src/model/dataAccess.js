const axios = require('axios');
const domain = 'http://172.16.12.121:5000';

let dataAccess = {
    getData(apiRoute,handleData) {
        let api = domain + apiRoute;
        console.log(api);
        axios.get(api)
        .then( (response) =>{
            console.log("get data from:" + api);
            console.log(response);
            handleData(response);
        } )
        .catch( (error) => {
            console.log( "access data fail" );
        } )
    },
    postData(apiRoute,data,handleData) {
        let api = domain + apiRoute;
        console.log(api);
        console.log(data);
        axios.post(api, JSON.stringify(data))
        .then( (response) =>{
            // console.log("get data from:" + api);
            // console.log(response);
            handleData(response);
        } )
        .catch( (error) => {
            console.log( "access data fail" );
        } )
    }
}

export default dataAccess;