import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const Certifications = ({ data, onChange }) => {
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
                    onChange(quillRef.current.root.innerHTML);
                    isInternalChange.current = false;
                }
            });
        }
    }, [onChange]);

    useEffect(() => {
        if (quillRef.current && !isInternalChange.current) {
            const currentHtml = quillRef.current.root.innerHTML;
            const incomingHtml = data || "";

            if (currentHtml !== incomingHtml) {
                quillRef.current.clipboard.dangerouslyPasteHTML(incomingHtml);

                const length = quillRef.current.getLength();
                quillRef.current.setSelection(length, 0);
            }
        }
    }, [data]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                
            </div>

            <div className="mt-6">
                <div
                    id="toolbar"
                    className="border border-gray-300 rounded-t-lg p-2 bg-gray-50"
                >
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
                    className="border border-t-0 border-gray-300 rounded-b-lg"
                    style={{ minHeight: "168px" }}
                />
            </div>

            <p className="text-xs text-gray-500 max-w-[80%] mx-auto text-center mt-2">
                e.g. 1. Google AI/ML: Learned about LLMs and data structures
                from a free three-day course provided by Google...
            </p>
        </div>
    );
};

export default Certifications;