import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [inputIngredients, setInputIngredients] = useState('')
  const [inputAdditional, setInputAdditional] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async() => {
    setIsGenerating(true)

    console.log('Calling OpenAI...')

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputIngredients, inputAdditional }),
    })

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedIngredients = (event) => {
    console.log(event.target.value);
    setInputIngredients(event.target.value);
  };

  const onUserChangedAdditional = (event) => {
    console.log(event.target.value);
    setInputAdditional(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Chef AIde | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>👩‍🍳 Chef AIde 👨‍🍳</h1>
          </div>
          <div className="header-subtitle">
            <h2>Find quick and delicious recepies</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="type your ingridents" 
            className="prompt-box" 
            value={inputIngredients}
            onChange={onUserChangedIngredients}
          />
          <textarea 
            placeholder="want it mexican style? maybe quick and easy? for 4 or more people? type it here" 
            className="prompt-box" 
            value={inputAdditional}
            onChange={onUserChangedAdditional}
          />
          <div className="prompt-buttons">
            <a
              className={isGenerating ? 'generate-button loading' : 'generate-button'}
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
              {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
