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
        <Card>
            <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={title}
                width={800}
                height={800}
                className="w-full h-64 object-cover"
            />

            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
        </Card>
        </Link>
    )
}