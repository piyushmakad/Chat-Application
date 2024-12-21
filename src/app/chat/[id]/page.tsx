import { fetchChat } from '@/app/fetch/chatFetch';
import { fetchChatGroup, fetchChatUsers } from '@/app/fetch/groupFetch'
import ChatBase from '@/components/chat/ChatBase'
import { notFound } from 'next/navigation';
import React from 'react'

export default async function chat({params}:{params: {id:string}}) {
  if(params.id.length !== 36){
     return notFound();
  }
  const group:ChatGroupType | null = await fetchChatGroup(params.id);
  if(group === null){
    return notFound();
  }

  const users:Array<ChatGroupUserType> | [] = await fetchChatUsers(params.id);
  const chats:Array<MessageType> | [] = await fetchChat(params.id);
  return (
    <div>
        <ChatBase users={users} group={group} oldMessages={chats}/>
    </div>
  )
}
