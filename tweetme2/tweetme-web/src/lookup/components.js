import React from 'react'

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


export function backendLookup(method,endpoint,callback,data){
  let jsonData;
  if(data){
    jsonData=JSON.stringify(data)
    //console.log("Json data is ",jsonData)
  }
  const xhr=new XMLHttpRequest() //xhr=Someclass()('similar in python') 
  const url=`http://127.0.0.1:8000/api${endpoint}`
  xhr.responseType="json"
  const csrftoken = getCookie('csrftoken');
  xhr.open(method,url)
  xhr.setRequestHeader('Content-Type','application/json')
  if (csrftoken){
    console.log("Csrf token is ",csrftoken)
    // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest")
    xhr.setRequestHeader('X-CSRFToken',csrftoken)
  }
  
  xhr.onload=function(){
    if (xhr.status === 403) {
      const detail = xhr.response.detail
      if (detail === "Authentication credentials were not provided."){
        if(window.location.href.indexOf("login")===-1){
        window.location.href = "/login?showLoginRequired=true"
        // console.log('I am in buddy')
      }
    }
    }
    callback(xhr.response,xhr.status)
  }
  xhr.onerror=(e)=>{
    console.log(e)
  }
  xhr.send(jsonData)


}
