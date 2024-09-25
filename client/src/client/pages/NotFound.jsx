import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div  style={{minHeight:'100dvh',display:'flex',alignItems:'center'}}>
            <div className="mx-auto max-w-md text-center">
                <h2 style={{fontSize:'4rem',color:'var(--primaryBGColor)'}}>404</h2>
                <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Oops, page not found!</h1>
                <p className=" text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
                <div className="mt-5">
                    <Link className="btn btn-secondary" to={'/'}>Go to home</Link>
                </div>
            </div>
        </div>
    )
}