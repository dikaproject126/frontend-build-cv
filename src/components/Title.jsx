const Title = ({ section, title, description }) => {
    return (
        <div className="text-center">
            <span className="text-xl text-zinc-900 ">{section}</span>
            <h1 className="text-4xl md:text-[40px] font-medium text-zinc-900 mt-3">{title}</h1>
            <p className="text-base text-zinc-600 max-w-md mx-auto mt-3">{description}</p>
        </div>

    )
}

export default Title