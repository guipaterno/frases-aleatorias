import React, { useState, useEffect } from "react";

function Citacao ({ texto, autor }) {
  const [traducao, setTraducao] = useState("");

  
  useEffect(() => {
    setTraducao("");
  }, [texto]);

  async function traduzirCitação(idioma) {
    try {
      const resposta =  await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: "ola",
            source: "pt",
            target: idioma,
            format: "text",
            
        }),
        headers: { "Content-Type": "application/json" }
    });

      const data = await resposta.json();
      setTraducao(data.translatedText);
    } catch (erro) {
      console.log("Erro ao traduzir citação:");
    }
  }

  return (
    <div>
      <blockquote className="blockquote">
        <p>{traducao ? traducao : texto}</p>
        <footer className="blockquote-footer">{autor}</footer>
      </blockquote>
      <button
        className="btn btn-primary m-1"
        onClick={() => traduzirCitação("en")}
      >
        Traduzir para Inglês
      </button>
      <button
        className="btn btn-secondary m-1"
        onClick={() => traduzirCitação("es")}
      >
        Traduzir para Espanhol
      </button>
    </div>
  );
}


export default Citacao;