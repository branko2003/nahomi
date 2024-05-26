import React from 'react';

export function ImageGallery({ photos }) {
    console.log(photos);
  const baseUrl = 'http://localhost:4000/';
  return (
    <div className="grid grid-cols-3 gap-4"> {/* Esto organiza las imágenes en una cuadrícula */}
      {photos.map((photo, index) => (
        <div key={index} className="p-2 border rounded shadow-sm">
          <img src={`${baseUrl}${photo}`} alt={`Foto ${index + 1}`} className="max-w-full h-auto" />
        </div>
      ))}
    </div>
  );
}