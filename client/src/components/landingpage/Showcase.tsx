import Recording from "../../assets/landing.mp4";
const Showcase=()=>{
    return(
        <div className="justify-center -mt-40 flex items-center">
            <video
      src={Recording}
      autoPlay
      muted
      loop
      playsInline
      className="h-180 w-auto items-center"
    />
        </div>
    )
}
export default Showcase;