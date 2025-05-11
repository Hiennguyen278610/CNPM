interface ButtonHomeProps {
    label: string;
    spanName: string;
    onClick?: () => void;
    // onBack: () => void;
}

function NavButton ({ label, spanName, onClick }: ButtonHomeProps) {
    return (
        <div className="aspect-square w-full bg-accent hover:bg-red-700 text-white font-bold text-lg flex-nesw rounded-3xl p-20 no-select cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onClick}>
                <div className="w-full h-full flex-nesw flex-col !p-4">
                    <div className="w-full h-4/5 flex-nesw border-2 rounded-2xl !p-6">
                        <span className="material-symbols-outlined !text-5xl md:!text-8xl ">
                            {spanName}
                        </span>
                    </div>
                    <p className="w-full h-1/5 flex-nesw text-[13px] md:text-xl">{label}</p>
                </div>
        </div>
    );
}
export default NavButton;