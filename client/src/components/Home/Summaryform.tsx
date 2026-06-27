import { Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";

const Summaryform = ({ data, onChange }) => {
    const [loading, setLoading] = useState(false);

    const handleEnhance = async () => {
        if (!data) return;
        setLoading(true);

        try {
            const response = await fetch('/api/ai/enhance-pro-sum', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userContent: data }) 
            });
            
            if (!response.ok) throw new Error('Failed to enhance');
            
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
                <textarea 
                    value={data || ""} 
                    onChange={(e) => onChange(e.target.value)} 
                    rows={7} 
                    className="w-full px-4 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none" 
                    placeholder="Write a compelling professional summary that highlights your objectives clearly..."
                ></textarea>
                <p className="text-xs text-gray-500 max-w-[80%] mx-auto text-center mt-2">
                    Tip: Keep it concise (3-4 sentences) and focus on your next relevant skill set.
                </p>
            </div>
        </div>
    );
};

export default Summaryform;