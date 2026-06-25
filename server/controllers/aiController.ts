import ai from "../configs/ai.ts";
import Resume from "../models/Resume.ts";


export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences highlighting key skills, experiences and career objectives. Make it compelling and ATS-friendly. Return only the text, no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be no more than 2-3 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Return only the text, no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message.content;
    return res.status(200).json({ enhancedContent });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = `You are an expert AI agent that extracts structured data from resumes. 
Always return valid JSON only — no markdown, no backticks, no extra text before or after.`;

    const userPrompt = `Extract data from this resume and return it as a JSON object matching exactly this structure.
Use empty strings for missing text fields, empty arrays for missing arrays, and false for missing booleans.
Do not include the type/default wrappers — just the actual values.

Resume text:
${resumeText}

Required JSON structure:
{
  "personal_info": {
    "full_name": "",
    "headline": "",
    "title": "",
    "email": "",
    "phone": "",
    "location": "",
    "website": "",
    "image": ""
  },
  "professional_summary": "",
  "experience": [
    {
      "position": "",
      "company": "",
      "start_date": "",
      "end_date": "",
      "is_current": false,
      "description": ""
    }
  ],
  "education": [
    {
      "degree": "",
      "field": "",
      "institution": "",
      "graduation_date": "",
      "gpa": ""
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": "",
      "date": ""
    }
  ],
  "skills": [],
  "languages": [
    {
      "name": "",
      "level": ""
    }
  ],
  "socials": [
    {
      "platform": "",
      "label": "",
      "url": ""
    }
  ],
  "profiles": [
    {
      "name": "",
      "url": ""
    }
  ]
}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title: title || parsedData.personal_info?.full_name || "Uploaded Resume",
      ...parsedData,
    });

    return res.status(201).json({ resumeId: newResume._id });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};