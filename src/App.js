import React, { useState } from 'react';
import './App.css';

import Offline from './components/Offline';

function App() {

  const [Original, setOriginal] = useState(0);
  const [BaseOriginal, setBaseOriginal] = useState(0);
  const [BaseFinal, setBaseFinal] = useState(0);
  const [Result, setResult] = useState(0);
  const [isOffline, setisOffline] = useState(false);

  function VerificarValores() {
    if (Original > 0 && BaseOriginal > 0 && BaseFinal > 0) {

      let NumeroDecimal = 0;

      for (let i = 0; i < Original.length; i++) {
          NumeroDecimal += ( parseInt(Original[(Original.length - 1) - i]) * Math.pow(BaseOriginal, i) );
      }

      PasarBaseFinal(NumeroDecimal, BaseFinal);

    } else {
      alert("UNO O VARIOS CAMPOS ESTÁN VACIOS ☣");
    }

  }

  function PasarBaseFinal( number, basef ) {
    
    let BaseFinal = basef;
    let NumeroFinal = [];
    let NumeroAConvertir = number;

    for (let i = 0; NumeroAConvertir >= BaseFinal; i++) {
        
        NumeroFinal[i] = parseInt(NumeroAConvertir % BaseFinal);
        NumeroAConvertir = parseInt(NumeroAConvertir / BaseFinal);

    }
    
    NumeroFinal.push(NumeroAConvertir)
    ImprimirResultado(NumeroFinal);
}

function ImprimirResultado( valorImprimir ) {
  setResult(valorImprimir.reverse().join(''));
}

function Share() {
  if( ! navigator.share ) {
    alert("Tu browser no soporta la Web Share API"); 
    return;
  }

  navigator.share({
    title: `App de Bases númericas`,
    text: 'PWA para calcular bases numéricas',
    url: document.location.href
  })
    .then(() => alert('Contenido compartido!'))
    .catch((error) => alert('Hubo un error'))
}

  window.addEventListener('online', () => {
    setisOffline(false);
  })

  window.addEventListener('offline', () => {
    setisOffline(true);
  })

  return (
    <React.Fragment>
      { isOffline ? <Offline></Offline> : '' }
      <h1>Convertidor de bases numéricas</h1>
      <header>
          <label htmlFor="original">
              Número: 
              <input id="original" onChange={ (NumeroOriginalInput) => { setOriginal(NumeroOriginalInput.target.value); } } type="number"/>
          </label>
          <label htmlFor="baseOriginal">
              Base Original: 
              <input id="baseOriginal" onChange={ (BaseOriginalInput) => { setBaseOriginal(BaseOriginalInput.target.value); } } type="number"/>
          </label>
          <label htmlFor="baseFinal">
              Base a pasar: 
              <input id="baseFinal" onChange={ (BaseFinalInput) => { setBaseFinal(BaseFinalInput.target.value); } } type="number"/>
          </label>
          <button id="btn_calcular" onClick={VerificarValores} className="btn">🔢 Calcular 🔢</button>
          <button onClick={Share} className="btn"> 🔄 Compartir 🔄 </button>
      </header>
      <main>
          <h2 id="result">{ Result ? `Resultado: ${Result}` : '' }</h2>
      </main>
    </React.Fragment>
  );
}

export default App;
