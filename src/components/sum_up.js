const sum_up = ({theText}) => {
  return (
    <>
        <div className="flex flex-col w-screen h-full bg-white py-16  items-center">
            <h1 className='text-2xl md:text-4xl font-bold text-black items-center pb-14'>Sum Up</h1>
            <div className=" flex flex-col bg-[#F5F5F7] w-2/4 md:w-3/4 p-6 h-full mb-14 rounded-2xl">
                {theText}
            </div>
            <div className="h-[2px] w-4/6 bg-black rounded-full"/>
        </div>
    </>
  )
}

export default sum_up