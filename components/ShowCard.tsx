"use client"
import {Movie} from "@/models/Movie";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {TvShow} from "@/models/TvShow";
import Link from "next/link";

interface Props {
    data: Movie | TvShow;
}

export default function ShowCard({data}: Props) {

    const isMovie = "title" in data;
    const title = isMovie ? data.title : data.name;
    const path = isMovie ? `/movies/${data.id}` : `/shows/${data.id}`;
    const voteAverage = data.vote_average;

    return (
        <Link href={path}>
            <Card
                className="flex flex-col p-0 overflow-hidden transition-all duration-300
    hover:scale-102 hover:shadow-lg hover:border hover:border-amber-600
    w-full cursor-pointer h-full"
            >
                <div className="w-full aspect-[2/3] relative overflow-hidden flex-shrink-0">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                </div>

                <CardHeader className="overflow-hidden h-[48px] sm:h-[56px] md:h-[64px]">
                    <CardTitle className="text-sm sm:text-base md:text-lg line-clamp-2">
                        {title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-xs sm:text-sm md:text-base text-gray-600 flex flex-col gap-1 pb-2 mt font-bold
                items-center">
                    ⭐ {voteAverage.toFixed(1)}/10
                </CardContent>
            </Card>
        </Link>
    )
}