import { Customer } from "../models/input.model.js";

function calculateAge(dob) {
    const today = new Date();
    dob=new Date(dob);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

let prevTime=0,prevTime2=0;
let prevName="xyz";


const dbSave=async (req,res)=>{
    let {customer_name,dob,income}=req.body;
    if(!customer_name||!dob||!income){
        return res.status(402).json({
            message:"all the fields are required"
        })
    }
    const age=calculateAge(dob);
    if(age<15){
        // throw new Error({
        //     message:"underage"
        // })
        return res.status(404).json({message:"age less than 15"})
    }
    const currentTime=Date.now();
    // console.log(currentTime-prevTime)
    if(customer_name===prevName){
        if(currentTime-prevTime<120000){
            // throw new Error({
            //     message:"maximum limit exceeded"
            // })
            return res.status(404).json({message:"message lmit exceeded"})
        }
    }
    if(currentTime-prevTime2<300000){
        return res.status(404).json({message:"only 2 api hits are allowed per 5 mins"})
    }
    try {
        dob=new Date(dob);
        // console.log("dob is : ",dob);
        const customer=await Customer.create({
            customer_name,dob,income
        })
        prevTime2=prevTime;
        prevTime=currentTime;
        prevName=customer_name;
        res.status(200).json(customer);
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const dbTimeBased=async (req,res)=>{
    let {customer_name,dob,income}=req.body;
    let d = new Date();
    if(d.getDay() === 2){
        return res.status(404).json({message:"Please don't use this api on monday"})
    }
    const currentTime=new Date();
    const Hour = currentTime.getHours();
    const Minute = currentTime.getMinutes();
    const totalMinutes=Hour*60+Minute;
    if(totalMinutes>8*60&&totalMinutes<15*60){
        return res.status(404).json({message:"Please try after 3pm"})
    }
    try {
        dob=new Date(dob);
        const customer=await Customer.create({
            customer_name,dob,income
        })
        return res.status(200).json(customer);
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

const dbSearch=async (req,res)=>{
    const startTime=performance.now();
    try {
        const currentDate = new Date();
        let minBirthDate = new Date(currentDate.getFullYear() - 25, currentDate.getMonth(), currentDate.getDate());
        let maxBirthDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
        
        // console.log(minBirthDate,maxBirthDate);
        const customer_names = await Customer.find({
            dob:{$gte: minBirthDate,$lte: maxBirthDate}
        })
        console.log("customer names ",customer_names);
        const endTime=performance.now();
        return res.status(200).json({
            response:customer_names,
            response_time:endTime-startTime
        })
    } catch (error) {
        return res.status(501).json({
            message:"Could not fetch data",
        })
    }
}

export {dbSave,dbTimeBased,dbSearch}