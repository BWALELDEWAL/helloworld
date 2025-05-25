import React from 'react';

const Footer = () => (
    <footer style={{ 
        background: '#f1f1f1', 
        padding: '20px 0', 
        textAlign: 'center', 
        marginTop: '40px' 
    }}>
        <div>
            &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </div>
        <div style={{ marginTop: '8px' }}>
            Contact: <a href="mailto:info@Eventify.com">info@Eventify.com</a> | 
            <a href="https://x.com/Eventify480444" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px' }}>Twitter</a>
        </div>
    </footer>
);

export default Footer;