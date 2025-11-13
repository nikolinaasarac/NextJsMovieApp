"use client"
import DetailedCard from "@/components/DetailedCard";
import {useParams} from "next/navigation";
import {Button} from "@/components/ui/button";

export default function Info(){
    const params = useParams();
    const id = params?.id?.toString();
    if (id === undefined){
        return;
    }

    console.log("Film ID je:", id);

    return (<div>
        <Button>Back</Button>
        <DetailedCard id={id} type={"movie"}/>
    </div>)
}