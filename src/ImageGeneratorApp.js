import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageGeneratorApp = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          count: 10,
          query: text,
          client_id: 'UrxFY2PLtYlWbrxCY3TVmGmd8XSSQfXEY0da71u5TY4',
        },
      });
      setImages(response.data);
    } catch (error) {
      toast.error('Failed to fetch images. Please try again later.');
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchImages();
    }
  };

  const handleLoadMore = () => {
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []); 

  return (
    <div>
      <h1>AI Image Generation App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter text . . . . . "
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={fetchImages}>Generate Images</button>
      </div>
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.urls.regular} alt="Generated" />
        ))}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
      <ToastContainer />
    </div>
  );
};

export default ImageGeneratorApp;
