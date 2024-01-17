import React, { useState } from "react";
import OpenAI from "openai";
import process from "process";

const App = () => {
  // Use state to manage the user's input
  const [userContent, setUserContent] = useState("");

  const generateContent = async () => {
    // Call OpenAI API to generate content
    const openai = new OpenAI({ organization: process.env.OPENAI_ORG, apiKey: process.env.OPENAI_API_KEY });

    console.log(`Generating content for: ${userContent}`);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: userContent },
        ],
      });

      const generatedContent = completion.choices[0]?.message?.content || 'No content generated.';

      // Insert the generated content into OneNote (you may need to implement this function)
      insertContentIntoOneNote(generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const insertContentIntoOneNote = (content) => {
    console.log(`Inserting content into OneNote: ${content}`);
    // Implement logic to insert content into OneNote
  };

  return (
    <div>
      <h2>TextMan - AI Content Generator</h2>
      <input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
      <button onClick={generateContent}>Generate Content</button>
    </div>
  );
};

export default App;
