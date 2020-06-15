import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {TweetsComponent,TweetsFeedComponent} from './tweets'
import {TweetDetailComponent} from './tweets'
import {ProfileBadgeComponent} from './profiles'
import * as serviceWorker from './serviceWorker';


const appEl=document.getElementById('root')
if (appEl){
ReactDOM.render(
    <App />,appEl
 
)}
const e=React.createElement
const TweetEl=document.getElementById("tweetme-2")
if (TweetEl){
  ReactDOM.render(e(TweetsComponent,TweetEl.dataset),TweetEl)
};

const TweetFeedEl=document.getElementById("tweetme-2-feed")
if (TweetFeedEl){
  ReactDOM.render(e(TweetsFeedComponent,TweetFeedEl.dataset),TweetFeedEl)
};



const tweetDetailElements = document.querySelectorAll(".tweet-me-2")

tweetDetailElements.forEach(container=> {
    ReactDOM.render(
        e(TweetDetailComponent, container.dataset), 
        container);
})

const profileBadgeDetailElements = document.querySelectorAll(".tweet-me-2-badge")

profileBadgeDetailElements.forEach(container=> {
    ReactDOM.render(
        e(ProfileBadgeComponent, container.dataset), 
        container);
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
