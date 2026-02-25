"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pages } from "@/constants/page";
import { useTypeWork } from "@/store/type-work.state";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DeleteDialog } from "./DeleteDialog";

export function TypeWorkTable() {
    const { typeWorks, getAllTypeWorks, loading, deleteTypeWork } =
        useTypeWork();
    const [nameSubstring, setNameSubstring] = useState<string>("");
    const [codeSubstring, setCodeSubstring] = useState<string>("");
    useEffect(() => {
        const getData = async () => {
            await getAllTypeWorks();
        };

        getData();
    }, []);

    const getTypeWorkByFilter = async () => {
        await getAllTypeWorks(nameSubstring, codeSubstring.toUpperCase());
    };

    const resetFilters = async () => {
        setNameSubstring("");
        setCodeSubstring("");

        await getAllTypeWorks();
    };

    if (loading) return <div>Загрузка...</div>;
    return (
        <>
            <section>
                <div className="p-3 border border-accent-foreground bg-accent-foreground/20 rounded-xl space-y-3 mb-5">
                    <h1>Фильтры</h1>
                    <Input
                        type="text"
                        placeholder="Код..."
                        value={codeSubstring}
                        onChange={(e) => setCodeSubstring(e.target.value)}
                        className="bg-accent"
                    />
                    <Input
                        type="text"
                        placeholder="Название..."
                        value={nameSubstring}
                        onChange={(e) => setNameSubstring(e.target.value)}
                        className="bg-accent"
                    />

                    <div className="space-x-2">
                        <Button onClick={getTypeWorkByFilter}>Поиск</Button>
                        <Button onClick={resetFilters} variant="secondary">
                            Сбросить фильтры
                        </Button>
                    </div>
                </div>
            </section>
            {typeWorks.length === 0 ? (
                <div className="w-full h-40 flex items-center justify-center text-muted-foreground">
                    Нет данных для отображения
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Код</TableHead>
                            <TableHead>Название</TableHead>
                            <TableHead className="text-right">
                                Действия
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {typeWorks.map((typeWork) => (
                            <TableRow key={typeWork.id}>
                                <TableCell>{typeWork.id}</TableCell>
                                <TableCell>{typeWork.code}</TableCell>
                                <TableCell>{typeWork.name}</TableCell>
                                <TableCell className="text-right flex gap-2">
                                    <Button variant="outline">
                                        <Link
                                            href={Pages.EDIT_TYPE_WORK(
                                                typeWork.id,
                                            )}
                                        >
                                            <Edit size={20} />
                                        </Link>
                                    </Button>
                                    <DeleteDialog typeWork={typeWork} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </>
    );
}
