import React, {useState}  from 'react'

import {ActionBtn} from './buttons'

import {
  UserDisplay,
  UserPicture
} from '../profiles'


export function ParentTweet(props){
    const {tweet} = props
    return tweet.parent ? <Tweet isRetweet retweeter={props.retweeter} hideActions className={' '} tweet={tweet.parent} /> : null
  }
  export function Tweet(props) {
      const {tweet, didRetweet, hideActions, isRetweet, retweeter} = props
      const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
      let className = props.className ? props.className : 'col-10 mx-auto col-md-6'
      className = isRetweet === true ? `${className} p-2 border rounded` : className
     
      var isDetail=false
      var path = window.location.pathname
      var match=path.match(/(\d+)/)

      if(match){
      console.log("Path is ",path)
      
      //const match = path.match(idRegex)
      const urlTweetId = match[0] ? match[0] : -1
      console.log("tweet.id and urlTweetId is ",tweet.id,urlTweetId)
      isDetail = `${tweet.id}` === `${urlTweetId}`
      
      }
      
      const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${tweet.id}`
      }

      const handlePerformAction = (newActionTweet, status) => {
        if (status === 200){
          setActionTweet(newActionTweet)
        } else if (status === 201) {
          if (didRetweet){
            didRetweet(newActionTweet)
          }
        }
        
      }
      
      return <div className={className}>
         {isRetweet === true && <div className='mb-2'>
         <span className='small text-muted'>Retweet via <UserDisplay user={retweeter} /></span>
        </div>}
        <div className='d-flex'>
       
          <div className=''>
            <span className='mx-1 px-3 py-2 rounded-circle bg-dark text-white'>
            {tweet.user.username[0]}
            </span>
          </div>
          <div className='col-11'>
              <div>
             
                <p>
                <UserDisplay includeFullName user={tweet.user} />
                </p>
                <p>{tweet.content}</p>
               
                <ParentTweet tweet={tweet} retweeter={tweet.user} />
              </div>
          <div className='btn btn-group px-0'>
          {(actionTweet && hideActions !== true) && <React.Fragment>
                  <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
                  <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "unlike", display:"Unlike"}}/>
                  <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "retweet", display:"Retweet"}}/>
                </React.Fragment>
          }
                  {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
                </div>
                </div>
      </div>
      </div>
    }
  





















// export function ParentTweet(props){
//     const {tweet} = props
//     return tweet.parent ? <div className='row'>
//     <div className='col-11 mx-auto p-3 border rounded'>
//       <p className='mb-0 text-muted small'>Retweet</p>
//       <Tweet hideActions className={' '} tweet={tweet.parent} />
//     </div>
//     </div> : null
//   }
//   export function Tweet(props) {
//       const {tweet, didRetweet, hideActions} = props
//       const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
//       const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
//       //const path = window.location.pathname
//       //var idRegex = /(?<tweetid>\d+)/
//       var isDetail=false
//       var path = window.location.pathname
//       var match=path.match(/(\d+)/)

//       if(match){
//       console.log("Path is ",path)
      
//       //const match = path.match(idRegex)
//       const urlTweetId = match[0] ? match[0] : -1
//       console.log("tweet.id and urlTweetId is ",tweet.id,urlTweetId)
//       isDetail = `${tweet.id}` === `${urlTweetId}`
      
//       }
      
//       const handleLink = (event) => {
//         event.preventDefault()
//         window.location.href = `/${tweet.id}`
//       }
//       const handlePerformAction = (newActionTweet, status) => {
//         if (status === 200){
//           setActionTweet(newActionTweet)
//         } else if (status === 201) {
//           if (didRetweet){
//             didRetweet(newActionTweet)
//           }
//         }
        
//       }
      
//       return <div className={className}>
//               <div>
//                 <p>{tweet.id} - {tweet.content}</p>
//                 <ParentTweet tweet={tweet} />
//               </div>
//           <div className='btn btn-group'>
//           {(actionTweet && hideActions !== true) && <React.Fragment>
//                   <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "like", display:"Likes"}}/>
//                   <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "unlike", display:"Unlike"}}/>
//                   <ActionBtn tweet={actionTweet} didPerformAction={handlePerformAction} action={{type: "retweet", display:"Retweet"}}/>
//                 </React.Fragment>
//           }
//                   {isDetail===true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}
//                 </div>
       
//       </div>
//     }