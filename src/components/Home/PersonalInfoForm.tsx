const PersonalInfoForm=({data,onChange,removeBackground,setRemoveBackground})=>{
    return(
        <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-600">Get Started with personal information</p>
            <div className="flex items0-center gap-2">
                <label htmlFor="">
                    {data.image ?(
                        <img src={typeof data.image === 'string'? data.image:URL.createObjectURL(data.image)}
                        alt="user-image" className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80" />
                    ) }
                </label>

            </div>

        </div>


    )
}
export default PersonalInfoForm;