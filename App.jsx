import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import frFlag from "./assets/fr-flag.png";
import spFlag from "./assets/sp-flag.png";
import jpnFlag from "./assets/jpn-flag.png";
import parrot from "./assets/parrot.png";
import worldmap from "./assets/worldmap.png";


export default function App() {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [language, setLanguage] = useState("fr");
  const translation_response = ""; // Stubbed response

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainScreen setText={setTextToTranslate} setLanguage={setLanguage} />}
        />
        <Route
          path="/translated"
          element={<TranslatedScreen text={textToTranslate} translationResponse={translation_response} />}
        />
      </Routes>
    </Router>
  );
}

function MainScreen({ setText, setLanguage }) {
  const navigate = useNavigate();
  const [inputText, updateText] = useState("");
  const [selectedLang, setSelectedLang] = useState("fr");

  const handleTranslate = () => {
    setText(inputText);
    setLanguage(selectedLang);
    navigate("/translated");
  };

  return (
    <div className="main-div">
      <Header />
      <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-md">
        <label className="font-bold text-blue-800">Text to translate 👇</label>
        <textarea
          value={inputText}
          onChange={(e) => updateText(e.target.value)}
          className="w-full mt-2 p-2 border rounded resize-none"
          rows={3}
          placeholder="How are you?"
        />

        <label className="font-bold text-blue-800 mt-4 block">Select language 👇</label>
        <div className="mt-2 space-y-2">
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
  );
}

function TranslatedScreen({ text, translationResponse }) {
  const navigate = useNavigate();

  const handleStartOver = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-md">
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