import { Link } from "react-router-dom";

const Footer=()=>{
    return(
        <div>
        
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-30">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
                <div className="md:max-w-96">
                    
                    <p className="mt-6 text-sm">
                        reate your resume in seconds.
                        With customizable themes and AI Summary available.
                       Download your cv in one click for free.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><Link to="#">Home</Link></li>
                            <li><Link to="#">About us</Link></li>
                            <li><Link to="#">Contact us</Link></li>
             
                        </ul>
                    </div>
                  
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Made by Aleeza :3
            </p>
        </footer>

        </div>
    )
}
export default Footer;