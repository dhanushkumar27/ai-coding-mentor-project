import { useNavigate } from "react-router-dom";
import {useContext} from 'react'

import {
    FaBrain,
    FaBug,
    FaChartLine
} from "react-icons/fa";

import AIConfigContext from '../../../contexts/AIConfigContext/AIConfigContext'

import "./index.css";

const Home = () => {
    const navigate = useNavigate();
    const features = [
    {
        icon:<FaBrain/>,
        title:"Learn",
        description:"Understand concepts deeply."
    },
    {
        icon:<FaBug/>,
        title:"Review",
        description:"Receive AI feedback."
    },
    {
        icon:<FaChartLine/>,
        title:"Improve",
        description:"Become interview ready."
    }
];

      const {apiKeyValue, setApiKeyValue,showApiKeyError, setShowApiKeyError} = useContext(AIConfigContext)

      const addApiKeyFun = () =>{
        if(typeof apiKeyValue === "string" && apiKeyValue.trim().length > 10){
            setApiKeyValue(apiKeyValue)
            setShowApiKeyError(false)
            localStorage.setItem("api_key_value", apiKeyValue)
        }else{
            setShowApiKeyError(true)
        }
    }

    const removeApiKeyFun = () =>{

        setApiKeyValue("")
        setShowApiKeyError(false)
        localStorage.setItem("api_key_value", "")
    }


    return (
        
                        <main className="home-container">

                        <section className="hero">

                              <div className="hero-badge">
                                    ✨ AI Powered Learning
                              </div>

                              <h1 className="hero-title">
                                    <span>Become Better at Coding,</span>
                                    <br />
                                    <span>Not Better at Copying.</span>
                              </h1>

                              <p className="hero-subtitle">
                                    Practice • Debug • Optimize • Learn
                              </p>

                              <p className="hero-description">
                                    Your personal AI mentor that helps you understand
                                    mistakes instead of simply showing answers.
                              </p>

                              <div className="hero-buttons">

                                    <button
                                    className="primary-btn"
                                    onClick={() => navigate("/workspace")}
                                    >
                                    🚀 Start Coding
                                    </button>

                                    

                              </div>


                        </section>

                        <section className="floating-icons">

                        {features.map((item)=>(

                              <div
                                    key={item.title}
                                    className="floating-card"
                              >

                                    <div className="icon">
                                    {item.icon}
                                    </div>

                                    <h3>{item.title}</h3>

                                    <p>{item.description}</p>

                              </div>

                              ))}

                        </section>

                        <section className="api-key-section">
                                    <div className="api-key-header">
                                          <h3 className="api-key-title">API Key</h3>

                                          <p className="api-key-description">
                                                Add your own API key to continue learning.
                                          </p>
                                    </div>

                                    <div className="api-key-form">
                                    <input
                                          type="password"
                                          value={apiKeyValue}
                                          className="api-input-element"
                                          onChange={e => setApiKeyValue(e.target.value)}
                                          placeholder="Enter your API key"
                                          autoComplete="off"
                                    />

                                    <div className="api-key-actions">
                                          <button
                                                type="button"
                                                className="api-add-button"
                                                onClick={addApiKeyFun}
                                          >
                                                Add
                                          </button>

                                          <button
                                                type="button"
                                                className="api-remove-button"
                                                onClick={removeApiKeyFun}
                                          >
                                                Remove
                                          </button>
                                    </div>
                                    </div>

                                    {showApiKeyError && (
                                          <p className="api-key-error" role="alert">
                                                Please enter a valid API key.
                                          </p>
                                    )}

                              <h1 className="api-key-link-title">
                              You can get an API key from below:
                              </h1>

                              <a
                              href="https://openrouter.ai/workspaces/default/keys"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="api-key-link"
                              >
                              Get API Key from OpenRouter ↗
                              </a>
                        </section>

                  </main>
                  
    );
};

export default Home;