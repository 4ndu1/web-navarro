import RowRegistros from "./RowRegistros";

function ListBox({ mainText, headers, data, renderRow }) {
    // Default fallback for legacy usage (if any remains, though we will update usages)
    const gridCols = headers ? `grid-cols-${headers.length}` : 'grid-cols-3';

    return (
        <div className="flex flex-col p-5 rounded-xl border-1 border-neutral-400 shadow-xl w-[1000px] min-h-[400px] bg-white">
            <div className="text-[40px] antialiased font-medium mb-4 text-black">
                {mainText}
            </div>

            <div className="flex flex-col mt-2">
                {headers && (
                    <>
                        <div className={`grid ${gridCols} text-[#828282] gap-10 my-2 px-4`}>
                            {headers.map((header, index) => (
                                <h3 key={index} className="font-semibold">{header}</h3>
                            ))}
                        </div>
                        <hr className="border-gray-300 my-2"></hr>
                    </>
                )}

                <div className="flex flex-col gap-2">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={item.id || index}>
                                {renderRow(item)}
                                <hr className="border-gray-100 my-1"></hr>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-500 text-center py-10">
                            No hay datos para mostrar
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListBox;