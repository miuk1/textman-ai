import React, { useState } from "react";
import OpenAI from "openai";
import process from "process";

const App = () => {
  const [userContent, setUserContent] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const generateContent = async () => {
    // Call OpenAI API to generate content
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    console.log(`Generating content for: ${userContent}`);

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant named TextMan that helps in making notes in OneNote.",
          },
          { role: "user", content: userContent },
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const content = completion.choices[0]?.message?.content || "No content generated.";

      // Update the state with the generated content
      setGeneratedContent(content);

      // Insert the generated content into OneNote (you may need to implement this function)
      insertContentIntoOneNote(content);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const insertContentIntoOneNote = (content) => {
    console.log(`Inserting content into OneNote: ${content}`);
    // Implement logic to insert content into OneNote
  };

  const handleGenerateContentClick = () => {
    // Create an async function and call it immediately
    (async () => {
      await generateContent();
    })();
  };

  return (
    <div>
      <h2>TextMan - AI Content Generator</h2>
      <input type="text" value={userContent} onChange={(e) => setUserContent(e.target.value)} />
      <button onClick={handleGenerateContentClick}>Generate Content</button>

      {/* Display the generated content */}
      <div>
        <h3>Generated Content</h3>
        <p>{generatedContent}</p>
      </div>
    </div>
  );
};

export default App;
