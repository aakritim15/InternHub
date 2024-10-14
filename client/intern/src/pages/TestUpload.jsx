import React, { useState } from 'react';

const TestUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:1000/api/profile', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus('Resume uploaded successfully');
      } else {
        setUploadStatus('Resume upload failed');
      }
    } catch (error) {
      console.error('Error uploading file', error);
      setUploadStatus('An error occurred while uploading');
    }
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default TestUpload;
