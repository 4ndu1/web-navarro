import Link from "next/link";

export function Sidebar({ isOpen, toggle }) {
  return (
    <nav
      className={`flex flex-col justify-start h-screen bg-white border-r border-slate-200 p-6 fixed transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-20'} overflow-hidden shadow-sm z-10 top-0 left-0`}
    >
      <div className="flex flex-col mb-10">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="h-10 w-10 min-w-[2.5rem] bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-default shrink-0">
            N
          </div>
          {isOpen && (
            <button onClick={toggle} className="p-1 rounded hover:bg-slate-100 text-slate-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" /></svg>
            </button>
          )}
        </div>
        {!isOpen && (
          <button onClick={toggle} className="self-center mt-2 p-1 rounded hover:bg-slate-100 text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        )}

        {isOpen && (
          <div className="animate-fade-in truncate">
            <h1 className="text-lg font-bold text-slate-800 leading-tight">Complejo Educativo</h1>
            <h2 className="text-sm font-medium text-slate-500">Nicolas Eugenio Navarro</h2>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <SidebarLink href="/" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} label="Inicio" isOpen={isOpen} />

        <SidebarLink href="/estudiantes" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} label="Estudiantes" isOpen={isOpen} />

        <SidebarLink href="/profesores" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} label="Profesores" isOpen={isOpen} />

        <SidebarLink href="/agregar_estudiante" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>} label="Add Estudiante" isOpen={isOpen} />

        <SidebarLink href="/agregar_profesor" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>} label="Add Profesor" isOpen={isOpen} />
      </div>
    </nav>
  );
}

function SidebarLink({ href, icon, label, isOpen }) {
  return (
    <Link href={href} className="flex flex-row items-center gap-3 p-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium whitespace-nowrap overflow-hidden">
      <div className="min-w-[1.25rem] shrink-0">{icon}</div>
      <span className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 w-0'}`}>{label}</span>
    </Link>
  )
}
