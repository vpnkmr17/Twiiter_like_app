
import  {backendLookup} from '../lookup'

export function apiTweetCreate(data,callback){
    
    backendLookup('POST',"/tweet/create-tweet",callback,{content:data})
    
  }
  
  export function apiTweetAction(tweet_id,action,callback){
    const data={id:tweet_id,action:action}
    
    backendLookup("POST","/tweet/action/",callback,data)
    }


  export function apiTweetDetail(tweet_id,callback){
    backendLookup("GET",`/tweet/${tweet_id}`,callback)
  }

  export function apiTweetFeed(callback, nextUrl) {
    let endpoint =  "/tweet/feed/"
   
    if (nextUrl !== null && nextUrl !== undefined) {
        console.log(nextUrl)
        endpoint = nextUrl.replace("http://127.0.0.1:8000/api", "")
        console.log("endpoint is ",endpoint)
    }
    backendLookup("GET", endpoint, callback)
  }

  export function apiTweetList(username, callback, nextUrl) {
    let endpoint =  "/tweet/"
    if (username){
        endpoint =  `/tweet/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined) {
        console.log(nextUrl)
        endpoint = nextUrl.replace("http://127.0.0.1:8000/api", "")
        console.log("endpoint is ",endpoint)
    }
    backendLookup("GET", endpoint, callback)
  }

  // export function apiTweetList(username,callback){
  //   //This is to used to refresh the page after sometime without refreshing
  //   let endpoint="/tweet"
  //   if(username){
  //     endpoint=`/tweet?username=${username}`
  //   }
  //   backendLookup("GET",endpoint,callback)
  //   }