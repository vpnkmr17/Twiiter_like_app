(this["webpackJsonptweetme-web"]=this["webpackJsonptweetme-web"]||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},function(e,t,a){e.exports=a(15)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(5),o=a.n(r),l=(a(13),a(7)),s=a.n(l);a(14);function i(e,t,a,n){var c;n&&(c=JSON.stringify(n));var r=new XMLHttpRequest,o="http://127.0.0.1:8000/api".concat(t);r.responseType="json";var l=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var c=a[n].trim();if(c.substring(0,e.length+1)===e+"="){t=decodeURIComponent(c.substring(e.length+1));break}}return t}("csrftoken");r.open(e,o),r.setRequestHeader("Content-Type","application/json"),l&&(r.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest"),r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("X-CSRFToken",l)),r.onload=function(){a(r.response,r.status)},r.onerror=function(e){console.log(e)},r.send(c)}function u(e){var t=e.tweet,a=e.action,n=e.didPerformAction,r=t.likes?t.likes:0,o=a.display?a.display:"Action",l=function(e,t){200!==t&&201!==t||!n||n(e,t)},s="like"===a.type?"".concat(r," ").concat(o):o,u=e.className?e.className:"btn btn-primary btn-small";return c.a.createElement("button",{className:u,onClick:function(e){e.preventDefault(),function(e,t,a){i("POST","/tweet/action",a,{id:e,action:t})}(t.id,a.type,l)}},s)}var m=a(2),d=a(1);function f(e){var t=c.a.createRef(),a=e.didTweet,n=function(e,t){201===t?a(e):(console.log(e),alert("An error occured please try again"))};return c.a.createElement("div",{className:e.className},c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=t.current.value;i("POST","/tweet/create-tweet",n,{content:a}),t.current.value=""}},c.a.createElement("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),c.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"},"Tweet")))}function p(e){var t=e.tweet;return t.parent?c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-11 mx-auto p-3 border rounded"},c.a.createElement("p",{className:"mb-0 text-muted small"},"Retweet"),c.a.createElement(w,{hideActions:!0,className:" ",tweet:t.parent}))):null}function w(e){var t=e.tweet,a=e.didRetweet,r=e.hideActions,o=Object(n.useState)(e.tweet?e.tweet:null),l=Object(d.a)(o,2),s=l[0],i=l[1],m=e.className?e.className:"col-10 mx-auto col-md-6",f=window.location.pathname;if("/"!=f){console.log("Path is ",f);var w=f.match(/(\d+)/)[0],b=w||-1;"".concat(t.id),"".concat(b)}var v=function(e,t){200===t?i(e):201===t&&a&&a(e)};return c.a.createElement("div",{className:m},c.a.createElement("div",null,c.a.createElement("p",null,t.id," - ",t.content),c.a.createElement(p,{tweet:t})),c.a.createElement("div",{className:"btn btn-group"},s&&!0!==r&&c.a.createElement(c.a.Fragment,null,c.a.createElement(u,{tweet:s,didPerformAction:v,action:{type:"like",display:"Likes"}}),c.a.createElement(u,{tweet:s,didPerformAction:v,action:{type:"unlike",display:"Unlike"}}),c.a.createElement(u,{tweet:s,didPerformAction:v,action:{type:"retweet",display:"Retweet"}})),c.a.createElement("button",{className:"btn btn-outline-primary btn-sm",onClick:function(e){e.preventDefault(),window.location.href="/".concat(t.id)}},"View")))}function b(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),r=a[0],o=a[1],l=Object(n.useState)([]),s=Object(d.a)(l,2),u=s[0],f=s[1],p=Object(n.useState)(!1),b=Object(d.a)(p,2),v=b[0],E=b[1];Object(n.useEffect)((function(){console.log("Second one call hua ");var t=Object(m.a)(e.newTweets).concat(r);t.length!==u.length&&f(t)}),[e.newTweets,u,r]),Object(n.useEffect)((function(){if(console.log("First one call hua "),!1===v){!function(e,t){var a="/tweet";e&&(a="/tweet?username=".concat(e)),i("GET",a,t)}(e.username,(function(e,t){200==t&&o(e),E(!0)}))}}),[r,v]);var h=function(e){console.log("DidhandleTweet hai kya?");var t=Object(m.a)(r);t.unshift(e),o(t);var a=Object(m.a)(u);a.unshift(u),f(a)};return u.map((function(e,t){return c.a.createElement(w,{didRetweet:h,tweet:e,className:"my-5 py-5 border bg-white text-dark",key:"".concat(t,"-{item.id}")})}))}function v(e){var t=Object(n.useState)([]),a=Object(d.a)(t,2),r=a[0],o=a[1],l="false"!==e.canTweet;return c.a.createElement("div",{className:e.className},!1===l&&c.a.createElement(f,{didTweet:function(e){var t=Object(m.a)(r);t.unshift(e),o(t)},className:"col-12 mb-3"}),c.a.createElement(b,Object.assign({newTweets:r},e)))}function E(e){var t=e.tweetId;console.log("Tweet id is ",t);var a=Object(n.useState)(!1),r=Object(d.a)(a,2),o=r[0],l=r[1],s=Object(n.useState)(null),u=Object(d.a)(s,2),m=u[0],f=u[1],p=function(e,t){console.log("Response and status is ",e,t),200===t?f(e):alert("There was an error finding your tweet.")};return Object(n.useEffect)((function(){var e;!1===o&&(e=p,i("GET","/tweet/".concat(t),e),l(!0))}),[t,o,l]),null===m?null:c.a.createElement(w,{tweet:m,className:e.className})}var h=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),c.a.createElement("p",null,"Edit ",c.a.createElement("code",null,"src/App.js")," and save to reload."),c.a.createElement("div",null,c.a.createElement(v,null)),c.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var g=document.getElementById("root");g&&o.a.render(c.a.createElement(h,null),g);var y=c.a.createElement,N=document.getElementById("tweetme-2");N&&o.a.render(y(v,N.dataset),N),document.querySelectorAll(".tweet-me-2").forEach((function(e){o.a.render(y(E,e.dataset),e)})),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.f4dd8f68.chunk.js.map