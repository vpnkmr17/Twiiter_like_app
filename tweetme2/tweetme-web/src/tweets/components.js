import React, {useState, useEffect}  from 'react'

import {TweetCreate} from './create'
import {TweetList} from './list'
import {apiTweetDetail} from './lookup'
import {Tweet} from './detail'
import {TweetFeedList} from './feed'


export function TweetsComponent(props) {
  console.log("helloooo")
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) =>{
      let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)
      setNewTweets(tempNewTweets)

    }
    if (canTweet ===false){
    }

    return <div className={props.className}>
            {canTweet ===false && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
          <TweetList newTweets={newTweets} {...props} />
        </div>
}


export function TweetsFeedComponent(props) {
  console.log("helloooo")
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true
    const handleNewTweet = (newTweet) =>{
      let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)
      setNewTweets(tempNewTweets)

    }
    if (canTweet ===false){
    }

    return <div className={props.className}>
            {canTweet ===false && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3' />}
          <TweetFeedList newTweets={newTweets} {...props} />
        </div>
}



export function TweetDetailComponent(props){
  const {tweetId} = props
  console.log('Tweet id is ',tweetId)
  const [didLookup, setDidLookup] = useState(false)
  const [tweet, setTweet] = useState(null)

  const handleBackendLookup = (response, status) => {
    console.log("Response and status is ",response,status)
    if (status === 200) {
      setTweet(response)
    } else {
      alert("There was an error finding your tweet.")
    }
  }
  useEffect(()=>{
    if (didLookup === false){

      apiTweetDetail(tweetId, handleBackendLookup)
      setDidLookup(true)
    }
  }, [tweetId,didLookup])

  return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
 }