import React from 'react'
import { useApp } from '../context/AppContext'
import { NoSubscription, Subscription } from '../components'

export default function Subscribed() {

    const {user} = useApp()
    user.isSubscribed = false
  if(user.isSubscribed){
    return(
        <Subscription/>
    )
  }
  else{
    return(
        <NoSubscription/>
 
    )
  }
}
