import React from 'react';
import { useParams } from 'react-router-dom';

const AccessCode = () => {
  const { code, validity } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>আপনার Mangalam WiFi Zone অ্যাক্সেস কোড: {code}</h1>
      <p>এটি {validity} সময়ের জন্য বৈধ।</p>
      <p>আমাদের পরিষেবা ব্যবহারের জন্য ধন্যবাদ।</p>
    </div>
  );
};

export default AccessCode;