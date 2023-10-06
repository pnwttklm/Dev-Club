import Image from "next/image"
const game = () => {
  return (
    <>
        <div className="text-white flex flex-col text-xl items-center gap-3">
            <h1 className=" text-lg md:text-2xl">PLUS,</h1>
            <p className=" text-sm md:text-base text-center w-3/4 md:w-full ">Certain prizes will be given to anyone who play and manage the game to reach the top score. Play the game by clicking the button below.</p>
        </div>
        <a href='/welcome-freshy/game'>
        <button className="mt-8 pl-5 w-fit h-fit flex p-2 bg-[#C80000] rounded-full justify-center items-center gap-3 transition-all duration-150
          hover:bg-[#00FF66]" onclick="location.href='/welcome-freshy/game'" type="button">
           
            <h1 className=" text-white font-bold text-xl">Play</h1>
            <Image width={100} height={40} src='/gamelogo.webp' alt="game btn icon"/>
            
        </button></a>
    </>
  )
}

export default game