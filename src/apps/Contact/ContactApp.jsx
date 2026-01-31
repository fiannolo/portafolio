import { useState } from 'react';
import { useSound } from '../../hooks/useSound';

export function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);
  const { play } = useSound();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    play('click');

    // Create mailto link with email template
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Francisco,

I'm reaching out from your portfolio!

Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}

---
Sent from your Mac OS X Tiger Portfolio
`
    );

    const mailtoLink = `mailto:fiannolo@gmail.com?subject=${subject}&body=${body}`;

    try {
      // Open email client
      window.location.href = mailtoLink;
      
      // Simulate sending for UX
      setTimeout(() => {
        setStatus('success');
        setShowMotivation(true);
        setFormData({ name: '', email: '', message: '' });
        play('pop');
      }, 500);
    } catch (error) {
      setStatus('error');
      play('error');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Brushed Metal Toolbar */}
      <div
        className="flex items-center gap-3 px-3 py-1 border-b"
        style={{
          background: 'linear-gradient(180deg, #d8d8d8 0%, #c8c8c8 45%, #b8b8b8 50%, #c4c4c4 100%)',
          borderColor: '#888',
        }}
      >
        <span className="text-[12px] font-medium text-[#333]">New Message</span>
        <div className="flex-1" />
        <button
          onClick={handleSubmit}
          disabled={status === 'sending'}
          className="px-4 py-[2px] text-[11px] text-white rounded font-medium hover:opacity-90 transition-opacity"
          style={{
            background: status === 'sending' 
              ? 'linear-gradient(180deg, #999 0%, #666 100%)'
              : 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 100%)',
            border: '1px solid #2870b0',
            boxShadow: status === 'sending'
              ? 'none'
              : 'inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          {status === 'sending' ? 'Opening Email...' : 'Send Email'}
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col bg-white">
        {/* Header Fields */}
        <div style={{ borderBottom: '1px solid #d8d8d8' }}>
          <div className="flex items-center px-4 py-2" style={{ borderBottom: '1px solid #e8e8e8' }}>
            <label className="w-[50px] text-[12px] text-[#666] font-medium">To:</label>
            <span className="text-[12px] text-[#333]">fiannolo@gmail.com</span>
          </div>
          <div className="flex items-center px-4 py-2" style={{ borderBottom: '1px solid #e8e8e8' }}>
            <label className="w-[50px] text-[12px] text-[#666] font-medium">From:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="flex-1 text-[12px] outline-none bg-transparent text-[#333] placeholder-[#aaa]"
            />
          </div>
          <div className="flex items-center px-4 py-2">
            <label className="w-[50px] text-[12px] text-[#666] font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="flex-1 text-[12px] outline-none bg-transparent text-[#333] placeholder-[#aaa]"
            />
          </div>
        </div>

        {/* Message Body */}
        <div className="flex-1 p-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
            className="w-full h-full resize-none text-[12px] outline-none text-[#333] placeholder-[#aaa] leading-[1.6]"
          />
        </div>
      </form>

      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-4 h-[20px] text-[11px] text-[#555] border-t"
        style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
          borderColor: '#b0b0b0',
        }}
      >
        <span>
          {status === 'success' && <span className="text-green-600">Email client opened!</span>}
          {status === 'error' && <span className="text-red-600">Failed to open email</span>}
          {status === 'sending' && <span>Opening email client...</span>}
        </span>
        <span>{status ? 'Sent' : 'Draft'}</span>
      </div>

      {/* Motivational Modal */}
      {showMotivation && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowMotivation(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl p-6 max-w-sm mx-4"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)',
              border: '1px solid #ccc',
            }}
          >
            <div className="text-center mb-4">
              <div
                className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(180deg, #4ade80 0%, #22c55e 100%)',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Message Ready to Send! 🎯
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Thank you for reaching out! I'm excited to connect with you about potential collaborations or opportunities.
              </p>
              <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg">
                <p className="text-xs font-semibold text-gray-700 mb-2">💡 Pro Tip:</p>
                <p className="text-xs text-gray-600">
                  I typically respond within 24 hours. Feel free to include:
                </p>
                <ul className="text-xs text-gray-600 mt-2 space-y-1 ml-4">
                  <li>• Project details or requirements</li>
                  <li>• Timeline and budget expectations</li>
                  <li>• Any specific technical challenges</li>
                </ul>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowMotivation(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg"
                  style={{
                    background: 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.2)',
                  }}
                >
                  Awesome!
                </button>
                <a
                  href="https://linkedin.com/in/fiannolo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
