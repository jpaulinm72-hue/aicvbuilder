import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req) {
  try {
    const { cvData, jobTitle, company, jobDescription } = await req.json();

    const prompt = `
      Write a professional, personalized cover letter for the following position:
      Job Title: ${jobTitle}
      Company: ${company}
      ${jobDescription ? `Job Description: ${jobDescription}` : ''}

      Use the following candidate information:
      Name: ${cvData.personalInfo.name}
      Summary: ${cvData.personalInfo.summary}
      Key Experience: ${cvData.experience.slice(0, 2).map(e => `${e.title} at ${e.company}`).join(', ')}

      The cover letter should be modern, engaging, and highlight how the candidate's skills match the job requirements. Keep it under 400 words.
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert recruiter and career consultant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const coverLetter = response.choices[0].message.content.trim();

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Cover Letter Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 });
  }
}
