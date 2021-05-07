import React, { useState } from 'react';
import './App.css';

function App() {

  const [Original, setOriginal] = useState(0);
  const [BaseOriginal, setBaseOriginal] = useState(0);
  const [BaseFinal, setBaseFinal] = useState(0);
  const [Result, setResult] = useState(0);

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

  return (
    <React.Fragment>
      <h1>Convertidor de bases númericas</h1>
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
      </header>
      <main>
          <h2 id="result">{ Result ? `Resultado: ${Result}` : '' }</h2>
      </main>
    </React.Fragment>
  );
}

export default App;
