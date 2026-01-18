function ListBox({ mainText, headers, data, renderRow }) {
    // Default fallback
    const gridCols = headers ? `grid-cols-${headers.length}` : 'grid-cols-3';

    return (
        <div className="flex flex-col w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    {mainText}
                </h2>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    {data ? data.length : 0} Registros
                </div>
            </div>

            <div className="p-0">
                {headers && (
                    <div className={`grid ${gridCols} gap-4 py-3 px-6 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider`}>
                        {headers.map((header, index) => (
                            <h3 key={index}>{header}</h3>
                        ))}
                    </div>
                )}

                <div className="flex flex-col">
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
                            <div key={item.id || index} className="group hover:bg-blue-50/50 transition-colors duration-200 border-b last:border-0 border-slate-50">
                                <div className="py-4 px-6">
                                    {renderRow(item)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                            <svg className="w-10 h-10 mb-3 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm">No hay datos disponibles</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListBox;