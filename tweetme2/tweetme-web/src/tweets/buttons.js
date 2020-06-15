import React from 'react'

import {apiTweetAction} from './lookup'


export function ActionBtn(props){
    const {tweet,action,didPerformAction}=props
    let likes=tweet.likes ? tweet.likes : 0
    const actionDisplay=action.display ? action.display:"Action"
    const handleActionBackendEvent = (response, status) =>{

        if ((status === 200 || status===201)&& didPerformAction ){
          didPerformAction(response,status)
        }
      }

    const handleAction=(event)=>{
        event.preventDefault()
        apiTweetAction(tweet.id,action.type,handleActionBackendEvent)
    }
    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay
    const className=props.className ? props.className:'btn btn-primary btn-small'
    return <button className={className} onClick={handleAction}>{display}</button>
  }
  