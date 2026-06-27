import OpenAI from "openai";

const ai=new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
    model:process.env.OPENAI_MODEL
})
export default ai;