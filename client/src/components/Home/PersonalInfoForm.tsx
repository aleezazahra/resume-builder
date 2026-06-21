import { User, UserIcon, Mail, PhoneIcon, MapPin, BriefcaseBusiness, Globe, Icon } from "lucide-react";

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        onChange({ ...data, [field]: value });
    };

   const fields = [
    { key: "full_name", label: "Full name", icon: User, type: "text", required: true },
    { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
    

    { key: "phone", label: "Phone Number", icon: PhoneIcon, type: "tel", required: true },
    {key:"title",label:"Profession",icon:BriefcaseBusiness, type:"text", required:true},
    
    { key: "location", label: "Location", icon: MapPin, type: "text" },

];

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-200">Personal Information</h3>
            <p className="text-sm text-gray-500">Get Started with personal information</p>
            
      
            <div className="flex items-center gap-2">
                <label>
                    {data.image ? (
                        <img 
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)}
                            alt="user-image" 
                            className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80" 
                        />
                    ) : (
                        <div className="inline-flex items-center gap-2 mt-5 text-slate-300 hover:text-slate-700 cursor-pointer">
                            <UserIcon className="size-10 p-2.5 border rounded-full" />
                            Upload User Image
                        </div>
                    )}
                    <input type="file" accept="image/jpeg, image/png" hidden onChange={(e) => handleChange("image", e.target.files[0])} />
                </label>
                
                {typeof data.image === 'object' && (
                    <div className="flex flex-col gap-1 pl-4 text-sm">
                        <p>Remove bg</p>
                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                            <input type="checkbox" className="sr-only peer" onChange={() => setRemoveBackground(prev => !prev)} checked={removeBackground} />
                            <div className="w-9 h-5 bg-slate-500 rounded-full peer peer-checked:bg-slate-800 transition-colors duration-200"></div>
                            <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                        </label>
                    </div>
                )}
            </div>

            {fields.map((field) => {
                const Icon = field.icon;
                return (
                    <div key={field.key} className="space-y-1 mt-5">
                     
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
                      <Icon className="size-4" />
                            <span>{field.label}</span>
                            {field.required && <span className="text-red-500">*</span>}
                        </label>
                        
   
                        <input 
                            type={field.type} 
                            value={data[field.key] || ""} 
                            onChange={(e) => handleChange(field.key, e.target.value)} 
                            className="mt-1 w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring focus:ring-slate-200 focus:border-slate-600 outline-none transition-colors text-sm" 
                            placeholder={`Enter your ${field.label.toLowerCase()}`} 
                            required={field.required} 
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default PersonalInfoForm;