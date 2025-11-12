import {Movie} from "@/models/Movie";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

interface Props {
    data: Movie
}

export default function ShowCard({data}:Props){
    return (
        <Card>
            <Image
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                alt={data.title}
                width={800}
                height={800}
                className="w-full h-64 object-cover"
            />

            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
            </CardHeader>
        </Card>
    )
}