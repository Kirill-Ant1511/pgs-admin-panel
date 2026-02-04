import Image from 'next/image'

export function Header() {
	return (
		<header className='flex gap-2 p-2 place-content-center'>
			<div className='flex gap-2 items-center rounded-xl bg-accent-background p-4 w-1/2 shadow-2xl'>
				<Image
					src='/logo.png'
					width={100}
					height={100}
					className='w-10 h-10 rounded-xl'
					priority
					alt='logo'
				/>
				<h1 className='text-2xl font-bold'>PGS Admin Panel</h1>
			</div>
		</header>
	)
}
