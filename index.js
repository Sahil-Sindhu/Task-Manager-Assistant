const express = require('express');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();
const sys=require('./system.json');

const app = express();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({model: 'gemini-1.5-pro'});
app.use(cors());
app.use(express.json());
app.post('/generate',async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        const response = await model.generateContent(prompt+'\n'+sys.prompt);
        const reply = response.response.candidates[0].content.parts[0].text;
        res.status(200).json({reply});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
})

app.listen(3000,()=>{
    console.log(`Server Running on PORT:3000`);
})