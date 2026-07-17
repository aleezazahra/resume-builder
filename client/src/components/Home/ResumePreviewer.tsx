import MinimalTemplate from "../templates/MinimalTemplate";
import MinimalImageTemplate from "../templates/MinimalImageTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import ClassicTemplate from "../templates/ClassicTemplate";
import TechTemplate from "../templates/Techtemplate";
import NexusTemplate from "../templates/NexusTemplate";
import { useRef } from "react";

interface ResumePreviewerProps {
  data: any;
  template: string;
  accentColor: string;
  classes?: string;
}

const ResumePreviewer: React.FC<ResumePreviewerProps> = ({ data, template, accentColor, classes = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      case "tech":
        return <TechTemplate data={data} accentColor={accentColor} />;
      case "nexus":
        return <NexusTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      ref={containerRef}
      id="resume-preview-container"
      style={{ maxHeight: "100vh", overflowY: "auto" }}
      className="w-full bg-gray-100"
    >
      <div
        id="resume-preview"
        className={`border border-gray-200 bg-white print:shadow-none print:border-none ${classes}`}
      >
        {renderTemplate()}
      </div>

     <style dangerouslySetInnerHTML={{ __html: `
        #resume-preview-container::-webkit-scrollbar {
          width: 8px;
        }
        #resume-preview-container::-webkit-scrollbar-track {
          background: transparent;
        }
        #resume-preview-container::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 999px;
        }
        #resume-preview-container::-webkit-scrollbar-thumb:hover {
          background: #71717a;
        }
        #resume-preview ol {
          list-style-type: decimal !important;
          padding-left: 1.5em !important;
        }
        #resume-preview ul {
          list-style-type: disc !important;
          padding-left: 1.5em !important;
        }
        #resume-preview li {
          display: list-item !important;
        }
      `}} />
    </div>
  );
};

export default ResumePreviewer;