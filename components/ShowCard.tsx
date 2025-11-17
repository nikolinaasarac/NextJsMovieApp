"use client"
import {Movie} from "@/models/Movie";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {TvShow} from "@/models/TvShow";
import Link from "next/link";

interface Props {
    data: Movie | TvShow;
}

export default function ShowCard({data}:Props){

    const isMovie = "title" in data;
    const title = isMovie ? data?.title : data.name;
    const path = isMovie ? `/movies/${data.id}` : `/shows/${data.id}`;
    return (
        <Link href={path}>
            <Card
                className="p-0 overflow-hidden transition-all duration-300
       hover:scale-105 hover:shadow-lg hover:border hover:border-amber-600
       w-[160px] sm:w-[200px] md:w-[258px]"
            >
                <div className="w-full aspect-[2/3] relative overflow-hidden">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <CardHeader className="h-16 overflow-hidden">
                    <CardTitle className="text-sm sm:text-base md:text-lg line-clamp-2">
                        {title}
                    </CardTitle>
                </CardHeader>
            </Card>
        </Link>
    )
}