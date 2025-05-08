interface MenuLeftHeadProps {
    onClick?: () => void;
}

export default function MenuLeftHead({ onClick }: MenuLeftHeadProps) {
    return (
        <div className="w-full h-1/10 !p-4">
            <div className="flex flex-row gap-3 w-max hover:bg-secondary rounded-2xl !p-1 hoverBtn" onClick={onClick}>
                <button className="h-full text-light">
                    <span className="material-symbols-outlined bg-primary rounded-lg !text-3xl">
                        home
                    </span>
                </button>
                <button className="h-full bg-transparent text-primary text-xl"> Back to home</button>
            </div>
        </div> 
    );
}