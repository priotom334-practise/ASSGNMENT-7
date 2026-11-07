import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Product {
    id: number;
    image: string;
    nameBn: string;
    today: number;
    change: {
        dir: string;
        pct: number;
    };
}

const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json() 

    return (
        <div className="bg-mist-50 text-black">

            <div className="">

            <MarqueeText className="py-1" direction="right" duration={10}>
            
            {data.map((h: Product) => <Link className="hover:underline" href={`/categories/${h.id}`} key={h.id}>
                <span className="mx-1">{h.image}</span>
                <span className="mx-1">{h.nameBn}</span>
                <span className="mx-2">{h.today.toLocaleString("bn-BD")} টাকা/কেজি</span>

                <span className={`mx-2 ${h.change.dir === "up" ? "text-green-600" : h.change.dir === "down" ? "text-red-600" : "text-gray-600"}`}>
                    {h.change.dir === "up" ? "▲ " : h.change.dir === "down" ? "▼" : ""}
                    {h.change.pct.toLocaleString("bn-BD")}
                </span>
            </Link>)}

            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;