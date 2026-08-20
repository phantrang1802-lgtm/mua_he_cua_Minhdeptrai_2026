import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/image.png" alt="English App" style={{ width: '200px', borderRadius: '10px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2.5rem', color: '#2563eb' }}>LEXIS</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b' }}>ENGLISH WRITING PRACTICE</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <span style={{ background: '#3b82f6', color: 'white', padding: '5px 15px', borderRadius: '20px' }}>A1</span>
          <span style={{ background: '#e5e7eb', color: '#374151', padding: '5px 15px', borderRadius: '20px' }}>A2</span>
          <span style={{ background: '#e5e7eb', color: '#374151', padding: '5px 15px', borderRadius: '20px' }}>B1</span>
          <span style={{ background: '#e5e7eb', color: '#374151', padding: '5px 15px', borderRadius: '20px' }}>B2</span>
          <span style={{ background: '#e5e7eb', color: '#374151', padding: '5px 15px', borderRadius: '20px' }}>C1</span>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#1e293b' }}>CURATED DICTATION LESSONS</h2>
          <h3 style={{ color: '#475569' }}>Bài Học Trình Độ A1</h3>
          <p style={{ color: '#64748b' }}>Chọn một chủ đề để bắt đầu buổi luyện nghe phát âm và chép chính tả tiếng Anh.</p>
        </div>

        <div style={{ marginTop: '30px', background: '#f1f5f9', padding: '20px', borderRadius: '12px', width: '80%', maxWidth: '500px' }}>
          <h3 style={{ color: '#1e293b' }}>BÀI 01 • A1 LEVEL</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0f172a' }}>#01</p>
          <h4 style={{ color: '#2563eb' }}>Self Introduction</h4>
          <p style={{ color: '#64748b' }}>Giới thiệu bản thân</p>
        </div>
      </header>
    </div>
  );
}

export default App;