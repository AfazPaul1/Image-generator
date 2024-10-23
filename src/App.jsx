import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './App.css';

// List of sensitive terms to filter out
const sensitiveTerms = [
  "nude","nudity","sex", "porn","body", "adult", "explicit", "unclothed", "bare","Boobs", "naked","masturbation", "topless"
];

// Function to check if a prompt contains sensitive words
const isSensitivePrompt = (prompt) => {
  return sensitiveTerms.some(term => prompt.toLowerCase().includes(term));
};

function App() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Realistic');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for image generation
  const [error, setError] = useState(null); // Error state for handling errors

  const navigate = useNavigate(); // Initialize useNavigate

  const generateImage = async () => {
    setIsLoading(true); // Set loading state to true
    setError(null); // Reset any previous errors

    // Check if the prompt contains sensitive content
    if (isSensitivePrompt(prompt)) {
      alert('Your prompt contains sensitive content. Please revise your input.');
      setIsLoading(false);
      return;
    }

    const api_key = 'key-HhzW2rU57zoPp39pIpE7WeH2Q2ua0Gl9pXqjTe1tbTDvOqOjO2nXiJUhjPLMRwbDBT0ug3kvZQO5MyqHShzfe1kxBKBeGlo';
    const completePrompt = `${prompt} in style: ${style}`;

    const headers = {
      'Authorization': `Bearer ${api_key}`,
      'Content-Type': 'application/json',
    };

    const data = {
      prompt: completePrompt,
      output_format: 'jpeg',
      width: 512,
      height: 512,
      response_format: 'b64',
    };

    try {
      const response = await axios.post(
        'https://api.getimg.ai/v1/flux-schnell/text-to-image',
        data,
        { headers, timeout: 30000 }
      );

      if (response.status === 200) {
        const base64Image = response.data.image;
        const imageSrc = `data:image/jpeg;base64,${base64Image}`;
        setGeneratedImage(imageSrc);
        console.log('Image generated and displayed successfully.');
      }
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        setError('Connection to the server timed out. Please check your internet connection or try again later.');
      } else {
        setError('An error occurred while generating the image. Please try again.');
      }
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const saveImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `${prompt.slice(0, 50).replace(' ', '_')}_in_style_${style}.jpeg`;
      link.click();
    } else {
      alert('No image to save.');
    }
  };

  return (
    <div className="App-container">
      <div className="App">
        <div className="content1">
          <h1>Image Generator</h1>
          <label>
            <strong>Prompt: </strong>
            <textarea
              rows="4"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              required
            />
          </label>
          <br />
          <label>
            <strong>Style: </strong>
            <select value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="Realistic">Realistic</option>
              <option value="Cartoon">Cartoon</option>
              <option value="3D Illustration">3D Illustration</option>
              <option value="Flat Art">Flat Art</option>
            </select>
          </label>
          <br />
          <button onClick={generateImage} disabled={isLoading}>Generate</button>
          <button onClick={saveImage}>Save Image</button>

          {/* Display loading state */}
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div>
            {generatedImage ? (
              <img src={generatedImage} alt="Generated" style={{ marginTop: '20px', maxWidth: '100%', height: '100%' }} />
            ) : (
              <p>No image generated yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Back button outside the card */}
      <button
        className="back-to-login"
        onClick={() => navigate('/')}
      >
        Back to Login
      </button>
    </div>
  );
}

export default App;
