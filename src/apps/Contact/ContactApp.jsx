import { useState } from 'react';

export function ContactApp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
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
          className="px-4 py-[2px] text-[11px] text-white rounded font-medium"
          style={{
            background: 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 100%)',
            border: '1px solid #2870b0',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          Send
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col bg-white">
        {/* Header Fields */}
        <div style={{ borderBottom: '1px solid #d8d8d8' }}>
          <div className="flex items-center px-4 py-2" style={{ borderBottom: '1px solid #e8e8e8' }}>
            <label className="w-[50px] text-[12px] text-[#666] font-medium">To:</label>
            <span className="text-[12px] text-[#333]">john@example.com</span>
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
          {status === 'success' && <span className="text-green-600">Message sent!</span>}
          {status === 'error' && <span className="text-red-600">Failed to send</span>}
          {status === 'sending' && <span>Sending...</span>}
        </span>
        <span>Draft</span>
      </div>
    </div>
  );
}
