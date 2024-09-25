import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div  style={{minHeight:'100dvh',display:'flex',alignItems:'center'}}>
            <div className="mx-auto max-w-md text-center">
                <h2 style={{fontSize:'3rem',color:'var(--primaryBGColor)'}}>Oops, this page is under management!</h2>
                <p className=" text-muted-foreground">The page you're looking for is under management please retry later.</p>
            </div>
        </div>
    )
}