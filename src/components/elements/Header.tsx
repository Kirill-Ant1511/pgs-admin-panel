"use client";

import cn from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "./menu";
export function Header() {
    const pathname = usePathname();
    return (
        <header className="flex gap-2 p-2 place-content-center">
            <div className="rounded-xl bg-accent-background p-4 w-3/4 max-lg:w-9/10 shadow-2xl">
                <div className="flex gap-2 items-center ">
                    <Image
                        src="/logo.png"
                        width={100}
                        height={100}
                        className="w-10 h-10 rounded-xl"
                        priority
                        alt="logo"
                    />
                    <h1 className="text-2xl font-bold">PGS Admin Panel</h1>
                </div>
                <nav className="flex place-content-between mt-5">
                    {MENU.map((item) => (
                        <Link
                            href={item.path}
                            key={item.path}
                            className={cn(
                                "flex gap-2 items-center py-1 px-3 rounded-xl",
                                pathname === item.path && "bg-amber-400",
                            )}
                        >
                            <item.icon />
                            <p>{item.name}</p>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
