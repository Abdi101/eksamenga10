module.exports = {
    makeRequest: (request,callBack)=>{
        // let hostedApiUrl = `https://coffee-beans-api.herokuapp.com/api${request.apiEndpoint}`;
        let apiUrl = `http://localhost:3001/api${request.apiEndpoint}`;
        fetch(
            apiUrl,
            {
                method: request.method,
                headers: request.headers,
                body: JSON.stringify(request.body) || null
            }
        )
        .then((response)=>{
            if(!response.ok){
                throw response;
            }else{
                return response.json();
            }
        })
        .then((data)=>callBack(null,data))
        .catch((err)=>{
            console.log(err)
            err.json()
            .then((error)=>callBack(error,null))
            .catch(()=>callBack({error:`Resource request: ${err.statusText}`},null))
        })
    },
}