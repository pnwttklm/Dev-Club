import Image from "next/image";

export default function Card({main_tag, name, name_color, type_name, sub_tags}) {
    return (
        <>
            <div className="flex flex-col w-72">
                <Image className=" rounded-t-3xl" src='/ICTBuilding.webp' width={300} height={300} alt="mock picture"/>
                <div className="flex flex-col p-4 h-full bg-[#F5F5F7] rounded-b-3xl gap-2">
                    <p className={`w-fit h-fit py-[2px] px-1 text-white text-center text-[10px] font-medium bg-[${name_color}] rounded-md`}>{main_tag}</p>
                    <h1 className="text-black font-semibold text-xl">{name}</h1>
                    
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-black font-medium text-xs whitespace-nowrap">{type_name}</p>
                        <div className="flex flex-wrap gap-1">
                            {sub_tags.map((card, index) => (
                                <div key={index} className={`text-[10px] font-semibold text-white bg-[${card.color}] py-[2px] px-1 rounded-md`}>
                                    {card.tag_name} 
                                    {console.log(card.tag_name, card.color)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}