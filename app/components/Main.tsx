"use client"
import React, { useEffect, useState } from "react";
import { useCompletion } from "ai/react";
import { AiOutlineGithub } from 'react-icons/ai'; // Import GitHub icon from react-icons

const LyricsGeneratorApp = () => {
  const [theme, setTheme] = useState('');
  const [mood, setMood] = useState('');
  const [artistStyle, setArtistStyle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [error, setError] = useState('');
  const { completion, isLoading, complete, error: apiError } = useCompletion({
    api: '/api/generate-lyrics',
  });

  const handleGenerateLyrics = async () => {
    setError('');
    setLyrics('');

    try {
      console.log({ theme, mood, artistStyle })
      const messageToSend = JSON.stringify({ theme, mood, artistStyle })
      await complete(messageToSend)
      console.log({ completion })
    } catch (err) {
      setError('Failed to generate lyrics');
    }
  };

  useEffect(() => {
    if (completion) {
      setLyrics(completion);
    }
  }, [completion])

  const inputStyle = 'w-full p-2 border border-gray-300 rounded text-black';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">Song Lyrics Generator</h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-gray-700">Theme</label>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block text-gray-700">Mood</label>
            <input
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className={inputStyle}
            />
          </div>
          <div>
            <label className="block text-gray-700">Artist Style</label>
            <input
              type="text"
              value={artistStyle}
              onChange={(e) => setArtistStyle(e.target.value)}
              className={inputStyle}
            />
          </div>

          <button
            onClick={handleGenerateLyrics}
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Lyrics'}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}
          {lyrics && (
            <div className="mt-6 text-black">
              <h2 className="text-2xl font-bold">Generated Lyrics</h2>
              <pre className="whitespace-pre-wrap mt-2">{lyrics}</pre>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://github.com/iameddieyayaya/AI-LyricsGenerator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-800 hover:text-gray-600"
          >
            <AiOutlineGithub className="text-3xl mr-2" />
            <span className="text-lg">View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LyricsGeneratorApp;
