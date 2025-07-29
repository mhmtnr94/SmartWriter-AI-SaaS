export async function generateBlogPost({ title, outline }: { title: string; outline: string }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OpenAI API key");

  const prompt = `Write a detailed blog post with the following title and outline.\n\nTitle: ${title}\n\nOutline: ${outline}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful AI writing assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1200,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate blog post");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}
