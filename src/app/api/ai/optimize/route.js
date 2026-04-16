import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req) {
  try {
    const { content, type, jobDescription } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    let prompt = '';
    
    if (type === 'summary') {
      prompt = `Rewrite the following professional summary to be more impactful, professional, and results-oriented. ${jobDescription ? `Tailor it towards this job description: ${jobDescription}` : ''}\n\nSummary: ${content}`;
    } else if (type === 'experience') {
      prompt = `Enhance the following job experience description. Use action verbs, quantify achievements where possible, and make it sound more professional. ${jobDescription ? `Tailor it towards this job description: ${jobDescription}` : ''}\n\nExperience: ${content}`;
    } else {
      prompt = `Improve the following text to be more professional and clear for a CV.\n\nText: ${content}`;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using mini for speed and cost-effectiveness
      messages: [
        { role: 'system', content: 'You are a professional CV writer and career coach. Your goal is to help users land their dream job by optimizing their resume content.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const optimizedContent = response.choices[0].message.content.trim();

    return NextResponse.json({ optimizedContent });
  } catch (error) {
    console.error('AI Optimization Error:', error);
    return NextResponse.json({ error: 'Failed to optimize content' }, { status: 500 });
  }
}
