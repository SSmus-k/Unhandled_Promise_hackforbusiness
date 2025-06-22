import React from 'react'
import { useApp } from '../context/AppContext'
import { Card, NoSubscription, Subscription } from '../components'

export default function Subscribed() {

    const {user} = useApp()
  if(user.isSubscribed){
    return(
        <Subscription/>
    )
  }
  else{
    return(
      <div className='flex flex-col gap-1'>
        <NoSubscription/>
        <Card/>
        </div>
    )
  }
}
