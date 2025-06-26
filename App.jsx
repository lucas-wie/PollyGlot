import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import OpenAI from "openai";


import frFlag from "./assets/fr-flag.png";
import spFlag from "./assets/sp-flag.png";
import jpnFlag from "./assets/jpn-flag.png";
import parrot from "./assets/parrot.png";
import worldmap from "./assets/worldmap.png";

export default function App() {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [language, setLanguage] = useState("");
  const [translation_response, setTranslation] = useState(""); // Stubbed response

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainScreen setText={setTextToTranslate} setLanguage={setLanguage} setTranslation={setTranslation} />}
        />
        <Route
          path="/translated"
          element={<TranslatedScreen text={textToTranslate} translationResponse={translation_response} />}
        />
      </Routes>
    </Router>
  );
}

function Header() {
  return (
    <div className="banner">
      <img src={worldmap} alt="World Map" className="worldmap" />
      <div className="parrot-section">
        <img src={parrot} alt="Parrot" className="parrot" />
        <div>
          <h1 className="">PollyGlot</h1>
          <h3>Perfect Translation Every Time</h3>
        </div>
      </div>
    </div>
  ) 
}

function MainScreen({ setText, setLanguage, setTranslation }) {
  const navigate = useNavigate();
  const [inputText, updateText] = useState("");
  const [selectedLang, setSelectedLang] = useState("");


  const handleTranslate = async () => {
    setText(inputText);
    setLanguage(selectedLang);

    const messages = [
      {
          role: 'system',
          content: 'You are a helpful trnaslator assistant that knows a lot about of Spanish, French and Japanese language.'
      },

      {
          role: 'user',
          content: `Please translate the text ${inputText} to ${selectedLang} language. The response should have only return the translated text.`
      }
    ];

    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    })

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages
    });
    console.log(response.choices[0].message.content)
    setTranslation(response.choices[0].message.content);
    navigate("/translated");
  };

  return (
    <div className="main-div">
      <Header />
      <div className="main-div-translate-area">
        <div className="text-to-translate-area">
          <label className="font-bold text-blue-800">Text to translate 👇</label>
          <textarea
            value={inputText}
            onChange={(e) => updateText(e.target.value)}
            className="w-full mt-2 p-2 border rounded resize-none"
            rows={3}
            placeholder="How are you?"
          />
        </div>

        <div className="language-selection-area">
          <label>Select language 👇</label>
          <div className="language-selection-area-options">
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="fr"
                checked={selectedLang === "fr"}
                onChange={() => setSelectedLang("fr")}
              />
              <img src={frFlag} alt="French" className="h-5 ml-2" /> French
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="es"
                checked={selectedLang === "es"}
                onChange={() => setSelectedLang("es")}
              />
              <img src={spFlag} alt="Spanish" className="h-5 ml-2" /> Spanish
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="language"
                value="jp"
                checked={selectedLang === "jp"}
                onChange={() => setSelectedLang("jp")}
              />
              <img src={jpnFlag} alt="Japanese" className="h-5 ml-2" /> Japanese
            </label>
          </div>

          <button
            onClick={handleTranslate}
            className="mt-4 w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}

function TranslatedScreen({ text, translationResponse }) {
  const navigate = useNavigate();

  const handleStartOver = () => {
    navigate("/");
  };

  return (
    <div className="translated">
      <Header />
      <div className="translated-fields max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-md">
        <label className="font-bold text-blue-800">Original text 👇</label>
        <textarea
          value={text}
          readOnly
          className="w-full mt-2 p-2 border rounded resize-none"
          rows={3}
        />

        <label className="font-bold text-blue-800 mt-4 block">Your translation 👇</label>
        <textarea
          value={translationResponse}
          readOnly
          className="w-full mt-2 p-2 border rounded resize-none"
          rows={3}
        />

        <button
          onClick={handleStartOver}
          className="mt-4 w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}