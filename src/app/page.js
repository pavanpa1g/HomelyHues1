"use client";

import Header from "@/components/Header";
import BottomNavBar from "@/components/BottomNavBar";
import {useState} from 'react'
import "./page.css";

export default function Home() {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
  
      // You can add additional logic here, such as previewing the selected image.
    };

  return (
    <main className="home">
      <Header />
      <div className="home-con">

 
    <div className="image-upload-container">
      <label htmlFor="image-upload" className="custom-file-upload">
        Select Image
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {selectedFile && <p>Selected: {selectedFile.name}</p>}
    </div>
      </div>
      <BottomNavBar />
    </main>
  );
}
