import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { chatHistory, senderName, receiverName } = await req.json();

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Convert chat history to readable conversation
    const conversationText = chatHistory
      .map((msg) => `${msg.senderId}: ${msg.message}`)
      .join("\n");

    // The main prompt
    const prompt = `You are helping ${senderName} chat with ${receiverName}. 
Here is their conversation so far:

${conversationText}

Suggest ONLY 3 short natural replies for ${senderName}.
Each reply MUST be:
- under 15 words
- friendly
- conversational
- ONLY the reply, no numbering or extra text

Return replies separated by new lines.`;

    // Ask Gemini
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Split into suggestions
    const suggestions = text.split("\n").filter((s) => s.trim() !== "");

    return Response.json({
      success: true,
      suggestions: suggestions.slice(0, 3),
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to get suggestions",
      },
      { status: 500 }
    );
  }
}
