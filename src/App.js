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

    // Inicializa deferredPrompt para su uso más tarde.
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Previene a la mini barra de información que aparezca en smartphones
      e.preventDefault();
      // Guarda el evento para que se dispare más tarde
      deferredPrompt = e;
      // Actualizar la IU para notificarle al usuario que se puede instalar tu PWA
      showInstallPromotion();
      // De manera opcional, envía el evento de analíticos para saber si se mostró la promoción a a instalación del PWA
      console.log(`'beforeinstallprompt' event was fired.`);
    });

    const handlerInstall = async () => {
      // Muestre el mensaje de instalación
      deferredPrompt.prompt();
      // Espera a que el usuario responda al mensaje
      const { outcome } = await deferredPrompt.userChoice;
      // De manera opcional, envía analíticos del resultado que eligió el usuario
      console.log(`User response to the install prompt: ${outcome}`);
      // Como ya usamos el mensaje, no lo podemos usar de nuevo, este es descartado
      deferredPrompt = null;
    }

    StartNotificacion();

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
  ShowNotificacion(valorImprimir.reverse().join(''));
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

  /** PEDIR PERMISO PARA LAS NOTIFICACIONES */
  async function StartNotificacion() {
    
    if( ! ('Notification' in window) || ! ('serviceWorker' in navigator) ) {
      return alert('Tu browser no soporta notificaciones')
    }

    if( Notification.permission === 'default' ) {
      await Notification.requestPermission()
    }

    if( Notification.permission === 'blocked' ) {
      return alert("Bloqueaste las notificaciones :(")
    }

    if( Notification.permission !== 'granted' ) {
      return;
    }
  }

  async function ShowNotificacion(value) {
    const registration = await navigator.serviceWorker.getRegistration()

    if (!registration) {
      alert("No hay un serviceWorker");
      return;
    }

    registration.showNotification("Listo el resultado!", {
      body: `El resultado fue: ${value}`,
      img: '/icon-192x192.png'
    })
  }

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
          <button onClick={handlerInstall}>Instalar</button>
      </main>
    </React.Fragment>
  );
}

export default App;
