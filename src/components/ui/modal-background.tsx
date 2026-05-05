export function ModalBackground({ children }: { children: React.ReactNode }) {
    return (
        <section className='fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 md:items-center overflow-y-auto'>
            <div className='w-1/2 md:w-1/2 bg-white px-5 py-2 rounded-xl max-h-[90vh] overflow-y-auto no-scrollbar'>
                {children}
            </div>
        </section>
    );
}
