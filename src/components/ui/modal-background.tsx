export function ModalBackground({ children }: { children: React.ReactNode }) {
	return (
		<section className='fixed min-w-screen min-h-screen top-0 left-0 flex place-content-center place-items-center bg-black/50'>
			<div className='w-1/2 bg-white px-5 py-2 rounded-xl'>{children}</div>
		</section>
	)
}
