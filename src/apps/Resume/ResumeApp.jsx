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
        <a
          href="/resume.pdf"
          download
          className="px-3 py-[2px] text-[11px] text-white rounded font-medium inline-block"
          style={{
            background: 'linear-gradient(180deg, #6ab4f5 0%, #3890d5 100%)',
            border: '1px solid #2870b0',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          Download PDF
        </a>
        <span className="text-[11px] text-[#444]">Francisco_Iannolo_Resume.pdf</span>
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
            <h1 className="text-[22px] font-bold text-[#1a1a1a] tracking-wide">FRANCISCO IANNOLO</h1>
            <p className="text-[13px] text-[#444] mt-1">Senior Software Engineer</p>
            <p className="text-[10px] text-[#666] mt-1">
              Caracas, Venezuela &nbsp;•&nbsp; fiannolo@gmail.com &nbsp;•&nbsp; github.com/fiannolo
            </p>
          </div>

          {/* Summary */}
          <div className="mb-5">
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Summary
            </h2>
            <p className="text-[10px] text-[#333] leading-[1.7]">
              Language-agnostic Software Engineer with 15+ years in IT and 8+ years remote experience
              leading international teams. Focused on creating cost-effective, stable, robust, and scalable solutions.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-5">
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Experience
            </h2>

            <div className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[10px] font-semibold text-[#1a1a1a]">Senior Software Developer</h3>
                <span className="text-[9px] text-[#666]">2017 - Present</span>
              </div>
              <p className="text-[9px] text-[#0066cc] mb-1">Adaptivetelehealth, NC (Remote)</p>
              <ul className="text-[9px] text-[#444] list-disc ml-3 space-y-0.5">
                <li>HIPAA-compliant healthcare platform with 100+ features</li>
                <li>Full lifecycle: architecture, development, DevOps, team lead</li>
                <li>Go-to technical expert for the entire organization</li>
              </ul>
            </div>

            <div className="mb-3">
              <div className="flex justify-between">
                <h3 className="text-[10px] font-semibold text-[#1a1a1a]">Support Engineer</h3>
                <span className="text-[9px] text-[#666]">2016 - 2017</span>
              </div>
              <p className="text-[9px] text-[#0066cc] mb-1">Techaid Solutions (Auth0 Client)</p>
              <ul className="text-[9px] text-[#444] list-disc ml-3 space-y-0.5">
                <li>SDK testing across multiple languages and platforms</li>
                <li>Rapid language acquisition and debugging</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between">
                <h3 className="text-[10px] font-semibold text-[#1a1a1a]">Software Development Team Lead</h3>
                <span className="text-[9px] text-[#666]">2011 - 2016</span>
              </div>
              <p className="text-[9px] text-[#0066cc] mb-1">Telefonica Movistar Venezuela</p>
              <ul className="text-[9px] text-[#444] list-disc ml-3 space-y-0.5">
                <li>Led 5-person team as internal software factory</li>
                <li>Architecture, full-stack development, Oracle DB admin</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="mb-5">
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Education
            </h2>
            <div className="flex justify-between">
              <div>
                <h3 className="text-[10px] font-semibold text-[#1a1a1a]">Bachelor's in Computer Engineering</h3>
                <p className="text-[9px] text-[#0066cc]">Andres Bello Catholic University, Caracas</p>
              </div>
              <span className="text-[9px] text-[#666]">2009</span>
            </div>
            <p className="text-[9px] text-[#444] mt-1">Thesis: "Web Code Generator Using Programming by Demonstration" — Honorific Mention</p>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-[11px] font-bold text-[#1a1a1a] border-b border-[#ccc] pb-1 mb-2 uppercase tracking-wider">
              Skills
            </h2>
            <p className="text-[9px] text-[#444] leading-[1.6]">
              Full Stack Development • Architecture Design • Team Leadership • DevOps •
              API Integrations • Database Management • HIPAA Compliance • Remote Collaboration
            </p>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-4 h-[20px] text-[11px] text-[#555] border-t"
        style={{
          background: 'linear-gradient(180deg, #e8e8e8 0%, #d8d8d8 100%)',
          borderColor: '#b0b0b0',
        }}
      >
        <span>Preview — Download PDF for full resume</span>
        <span>2 pages</span>
      </div>
    </div>
  );
}
