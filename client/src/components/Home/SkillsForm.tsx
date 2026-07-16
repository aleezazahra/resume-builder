import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface InterestsFormProps {
    data: string;
    onChange: (data: string) => void;
}

const SKillsForm = ({ data, onChange }: InterestsFormProps) => {
    const quillRef = useRef<Quill | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const isInternalChange = useRef(false);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            const quillInstance = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: "#interests-toolbar"
                }
            });

            quillRef.current = quillInstance;

            quillInstance.on("text-change", () => {
                isInternalChange.current = true;
                const html = quillInstance.root.innerHTML;
                onChange(html === "<p><br></p>" ? "" : html);
                isInternalChange.current = false;
            });
        }
    }, [onChange]);

    useEffect(() => {
        if (quillRef.current && !isInternalChange.current) {
            const currentHtml = quillRef.current.root.innerHTML;
            const incomingHtml = data || "";
            if (currentHtml !== incomingHtml && currentHtml !== `<p>${incomingHtml}</p>`) {
                if (typeof incomingHtml === "string") {
                    quillRef.current.clipboard.dangerouslyPasteHTML(incomingHtml);
                }
            }
        }
    }, [data]);

    return (
        <div className="space-y-4 w-full">
            <div className="mt-2 w-full overflow-hidden rounded-lg border border-dashed border-white/30">
                <div
                    id="interests-toolbar"
                    className="border border-gray-300 rounded-t-lg p-2 bg-gray-50"
                >
                    <button className="ql-bold" title="Bold" />
                    <button className="ql-italic" title="Italic" />
                    <button className="ql-list" value="ordered" title="Ordered List" />
                    <button className="ql-list" value="bullet" title="Bullet List" />
                </div>

                <div
                    ref={editorRef}
                    className="border border-t-0 border-gray-300 rounded-b-lg"
                    style={{ minHeight: "168px" }}
                />
            </div>

            <p className="text-xs text-white/40 max-w-[80%] text-left mt-2">
                e.g. 1. Solving Puzzles 2. Running and jogging
            </p>
        </div>
    );
};

export default SKillsForm;