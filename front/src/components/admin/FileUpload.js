import React, { useState } from 'react';

const FileUploadSingle = ({ onFileChange, onUploadClick }) => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const url = URL.createObjectURL(selectedFile);

      setFile(selectedFile);
      setImageUrl(url);

      if (onFileChange) {
        onFileChange(selectedFile, url);
      }
    }
  };

  const handleUploadClick = () => {
    if (onUploadClick) {
      onUploadClick(file);
    }

    // You can keep the file upload logic here if needed
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Selected" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default FileUploadSingle;
