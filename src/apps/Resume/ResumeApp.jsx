export function ResumeApp() {
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
        <button
          className="px-3 py-[2px] text-[11px] text-white rounded font-medium"
          style={{
            background: 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 100%)',
            border: '1px solid #2870b0',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          Download PDF
        </button>
        <span className="text-[11px] text-[#444]">Resume.pdf</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-[11px] text-[#555]">
          <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-black/10">−</button>
          <span>100%</span>
          <button className="w-5 h-5 rounded flex items-center justify-center hover:bg-black/10">+</button>
        </div>
      </div>

      {/* PDF Preview Area */}
      <div
        className="flex-1 overflow-auto p-5"
        style={{ background: '#606060' }}
      >
        <div
          className="max-w-[560px] mx-auto bg-white p-8"
          style={{ boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)' }}
        >
          {/* Header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-[#333]">
            <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-wide">JOHN DOE</h1>
            <p className="text-[13px] text-[#444] mt-1">Full Stack Developer</p>
            <p className="text-[10px] text-[#666] mt-1">
              San Francisco, CA &nbsp;•&nbsp; john@example.com &nbsp;•&nbsp; (555) 123-4567
            </p>
          </div>

          {/* Summary */}
          <div className="mb-5">
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Summary
            </h2>
            <p className="text-[10px] text-[#333] leading-[1.7]">
              Experienced Full Stack Developer with 5+ years of expertise in building
              scalable web applications. Proficient in React, Node.js, and cloud technologies.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Experience
            </h2>

            <div className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[10px] font-semibold text-[#1a1a1a]">Senior Developer</h3>
                <span className="text-[9px] text-[#666]">2022 - Present</span>
              </div>
              <p className="text-[9px] text-[#0066cc] mb-1">Tech Company Inc.</p>
              <ul className="text-[9px] text-[#444] list-disc ml-3 space-y-0.5">
                <li>Led microservices architecture development</li>
                <li>Mentored junior developers</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h3 className="text-[10px] font-semibold text-[#1a1a1a]">Full Stack Developer</h3>
                <span className="text-[9px] text-[#666]">2019 - 2022</span>
              </div>
              <p className="text-[9px] text-[#0066cc] mb-1">Startup Co.</p>
              <ul className="text-[9px] text-[#444] list-disc ml-3 space-y-0.5">
                <li>Built React applications</li>
                <li>Designed RESTful APIs</li>
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Skills
            </h2>
            <p className="text-[9px] text-[#444] leading-[1.6]">
              JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, Docker, AWS
            </p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-center px-3 h-[20px] text-[11px] text-[#555] border-t"
        style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
          borderColor: '#b0b0b0',
        }}
      >
        1 page
      </div>
    </div>
  );
}
