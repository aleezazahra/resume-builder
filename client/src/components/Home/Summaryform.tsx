import { Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Summaryform = ({ data, onChange }) => {
    const [loading, setLoading] = useState(false);
    const quillRef = useRef(null);
    const editorRef = useRef(null);
    const isInternalChange = useRef(false);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: "#toolbar",
                },
                
            });

       
            quillRef.current.on("text-change", (delta, oldDelta, source) => {
                if (source === "user") {
                    isInternalChange.current = true;
                    const html = editorRef.current.querySelector(".ql-editor").innerHTML;
                    onChange(html);
                    isInternalChange.current = false;
                }
            });
        }
    }, []);

  
    useEffect(() => {
        if (quillRef.current && !isInternalChange.current) {
            const editor = editorRef.current.querySelector(".ql-editor");
            const currentHtml = editor.innerHTML;
            const incoming = data || "";
            if (currentHtml !== incoming) {
                quillRef.current.clipboard.dangerouslyPasteHTML(incoming);
         
                const length = quillRef.current.getLength();
                quillRef.current.setSelection(length, 0);
            }
        }
    }, [data]);

    const handleEnhance = async () => {
        if (!data) return;
        setLoading(true);
        try {
            const response = await fetch("/api/ai/enhance-pro-sum", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userContent: data }),
            });

            if (!response.ok) throw new Error("Failed to enhance");

            const result = await response.json();
            if (result.enhancedContent) {
                onChange(result.enhancedContent);
            }
        } catch (error) {
            console.error("Failed to enhance:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Add summary to your resume here.</p>
            </div>

            <button
                type="button"
                onClick={handleEnhance}
                disabled={loading}
                className="btn py-2 px-6 flex items-center gap-2 border rounded-md hover:bg-gray-50 transition-colors"
            >
                {loading ? <Loader2 className="animate-spin" size={17} /> : <Sparkles size={17} />}
                {loading ? "Enhancing..." : "AI enhance"}
            </button>

            <div className="mt-6">
               
                <div id="toolbar">
    <button className="ql-bold" title="Bold" />
    <button className="ql-italic" title="Italic" />
        <button
                        className="ql-list"
                        value="ordered"
                        title="Ordered List"
                    />
                    <button
                        className="ql-list"
                        value="bullet"
                        title="Bullet List"
                    />
</div>

          
                <div
                    ref={editorRef}
                    className="border border-gray-300 rounded-b-lg"
                    style={{ minHeight: "168px" }} 
                />

                <p className="text-xs text-gray-500 max-w-[80%] mx-auto text-center mt-2">
                    Tip: Keep it concise (3–4 sentences) and focus on your next relevant skill set.
                </p>
            </div>
        </div>
    );
};

export default Summaryform;