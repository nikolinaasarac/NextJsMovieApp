import {Movie} from "@/models/Movie";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {TvShow} from "@/models/TvShow";

interface Props {
    data: Movie | TvShow;
}

export default function ShowCard({data}:Props){
    const title = "title" in data ? data?.title : data.name;
    return (
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
    )
}