import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface SkillsFormProps {
    data: string;
    onChange: (data: string) => void;
}

const SkillsForm = ({ data, onChange }: SkillsFormProps) => {
    const quillRef = useRef<Quill | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const isInternalChange = useRef(false);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: "#skills-toolbar",
                },
            });

            quillRef.current.on("text-change", (_delta, _oldDelta, source) => {
                if (source === "user") {
                    isInternalChange.current = true;
                    onChange(quillRef.current!.root.innerHTML);
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
        <div className="space-y-4 w-full">
            <div className="mt-6 w-full">
                <div
                    id="skills-toolbar"
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

            <p className="text-xs text-white/40 max-w-[80%] text-left mt-2">
                e.g. Languages: Python, C++, JavaScript, TypeScript, React, Node.js
            </p>
        </div>
    );
};

export default SkillsForm;