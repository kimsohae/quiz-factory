import OpenAI from "openai";
import { NextRequest } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FEW_SHOT_PROMPT: ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: `You are a brilliant assistant. write a quiz and options for the quiz recording to user's input, in Korean, 
    in JSON format(YOU MUST ANSWER IN JSON FORMAT, DON'T WRITE ANYTHING ELSE, SO COULD BE PARSED BY JSON.PARSE DIRECTLY).:
            {
                "questions": [
                  {
                    "question": "물의 화학식은 무엇인가요?",
                    "options": ["CO₂", "H₂O", "O₂", "NaCl"],
                    "correctAnswer": 1,
                    "explanation": "CO₂: Carbon Dioxide, H₂O: Water, O₂: Oxygen, NaCl: Sodium Chloride"
                  },
                  {
                    "question": "지구를 도는 위성은 무엇인가요?",
                    "options": ["화성", "달", "태양", "금성"],
                    "correctAnswer": 2
                    "explanation": "달은 지구를 공전하고 있어요."
                  }
                ]
            }
            
            `,
  },
];

export async function POST(req: NextRequest): Promise<Response> {
  const { prompt } = await req.json();
  let content;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...FEW_SHOT_PROMPT,
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  content = completion.choices[0].message.content;

  return new Response(JSON.stringify({ content }), {
    status: 200,
  });
}
