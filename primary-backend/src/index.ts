import express from 'express'
import { createClient } from 'redis'

const client=createClient({
    url:'redis://localhost:6379'
})
const app=express()

app.use(express.json())

app.listen(3000,()=>{
    console.log('listening on port 3000!')
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
    })

app.post('/submissions',async (req,res)=>{
    try{
        const submissionDetails={
            problem:req.body.problem,
            status:req.body.status
        }
        await client.lPush('submissions',JSON.stringify(submissionDetails))
        res.json({
            msg:'Submission received!'
        })
    } catch(e){
        console.log(e)
    }
})