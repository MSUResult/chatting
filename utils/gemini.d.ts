// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function POST(req) {
//   try {
//     const { chatHistory, senderName, receiverName } = await req.json();

//     // Initialize Gemini
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // Create a conversation context for Gemini
//     const conversationText = chatHistory
//       .map((msg) => `${msg.senderId}: ${msg.message}`)
//       .join("\n");

//     // The prompt - THIS IS THE BRAIN!
//     const prompt = `You are helping ${senderName} chat with ${receiverName}. 
// Here's their conversation so far:

// ${conversationText}

// Based on this conversation, suggest 3 short, natural reply options that ${senderName} could send next. 
// Make them friendly and conversational. Keep each under 15 words.
// Format: Return ONLY 3 suggestions, one per line, no numbering.`;

//     // Ask Gemini
//     const result = await model.generateContent(prompt);
//      const response = await result.text()

//     // Split into array of suggestions
//     const suggestions = response.split("\n").filter((s) => s.trim());

//     return Response.json({
//       success: true,
//       suggestions: suggestions.slice(0, 3),
//     });
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     return Response.json(
//       {
//         success: false,
//         error: "Failed to get suggestions",
//       },
//       { status: 500 }
//     );
//   }
// }
