function SimpleBox({mainText, subTitle}){
    return ( 
        <div className="flex flex-col p-5 rounded-xl border-1 border-neutral-400 shadow-xl w-[500px]">
            <div className="text-[40px] antialiased font-medium">
                {mainText}
            </div>

            <div className="text-[15px] antialiased font-medium text-[#828282]">
                {subTitle}
            </div>
        </div>
     );
}

export default SimpleBox;