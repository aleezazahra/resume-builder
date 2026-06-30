const questions = [
  {
    q: "Is it free?",
    ans: "Yes, Naqsh is completely free and doesn't limit features behind a paywall.",
  },
  {
    q: "How do we share our resumes?",
    ans: "Every resume gets a unique public URL that you can share with recruiters or employers.",
  },
  {
    q: "Can I export my resume to PDF?",
    ans: "Yes , Export your resume to a professional PDF in just one click.",
  },
  {
    q: "Is my data secure?",
    ans: "Yes. Your resumes are securely stored and remain private unless you choose to share them.",
  },
  {q:"Are the templates ATS-friendly?", ans:"Yes. The templates are really ATS-friendly I have use various tools to verify them."},
  {q:"What is the meaning of word 'Naqsh' ?",ans:"It's an Urdu word primarily means design, pattern, engraving, or imprint ,I think this is a really cool word."}
];

const Faqs = () => {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black py-32 px-6"
    >

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_65%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[340px_1fr]">
    
        <div>
          <h2 className="text-5xl mt-53 font-semibold leading-[0.95] text-white/50 md:text-7xl">
            You've got
            <br />
            questions.
             </h2>
            <h2 className="text-5xl font-semibold 
            leading-[0.95] text-white md:text-7xl">
              <br />
            <br />
            We've got
            <br />
            answers.</h2>
              
           
            
         
        </div>

        
        <div className="grid border-l border-white/10 md:grid-cols-2">
          {questions.map((item, index) => (
            <div
              key={index}
              className="group border-b border-r border-white/10 p-10 transition-all duration-300 hover:bg-white/[0.03]"
            >
              
              <span className="inline-block border border-white/15 px-2 py-1 text-[10px] tracking-[0.25em] text-white/40">
                {(index + 1).toString().padStart(2, "00")}
              </span>

              
              <h3 className="mt-10 text-3xl font-medium text-white transition-transform duration-300 ">
                {item.q}
              </h3>

              
              <p className="mt-6 max-w-md leading-8 text-white/60">
                {item.ans}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;