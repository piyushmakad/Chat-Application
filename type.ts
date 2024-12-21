type ChatGroupType = {
    id:string,
    user_id: string,
    title: string,
    passcode:string,
    created_at: string
}

type ChatGroupUserType = {
    id:number,
    name:string,
    group_id:string,
    created_at: string,
}


type MessageType = {
    id: string,
    group_id: string,
    name: string,
    message:string,
    created_at: string
}