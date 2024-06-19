// Import required modules from Deno
import OpenAI from "https://deno.land/x/openai@v4.52.0/mod.ts";

const openai = new OpenAI({
    apiKey: Deno.env.get('OPENAI_API_KEY'), // This is the default and can be omitted
});

// async function generateLoremIpsum() {
//     // Takes way too long to complete
//     const chatCompletion = await openai.chat.completions.create({
//         messages: [{ role: 'user', content: 'Generate lorem ipsum text.' }],
//         model: 'gpt-3.5-turbo',
//     });
//     console.log(chatCompletion);
// }
//
// generateLoremIpsum();

async function generateLoremIpsumStreaming() {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Generate lorem ipsum text." }],
        stream: true,
    });
    for await (const chunk of stream) {
        await Deno.stdout.write(new TextEncoder().encode(chunk.choices[0]?.delta?.content || ""));
    }
}

await generateLoremIpsumStreaming();
