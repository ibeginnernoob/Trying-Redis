import { createClient } from "redis";

const client=createClient({
    url:'redis://localhost:6379'
})

const redisConnect=async ()=>{
    try{
        await client.connect()
        return true
    } catch(e){
        console.log(e)
        return false
    }
}

let isConnected:boolean=false

redisConnect()
    .then(res=>{
        while(!res){
            redisConnect()
        }
        isConnected=res
        console.log(res)
        getQueueElement()
    })

const getQueueElement=async ()=>{
    try{
        while(1){
            const response=await client.brPop('submissions',0)
            console.log(response)
        }
    } catch(e){
        console.log(e)
    }
}