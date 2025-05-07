interface ButtonHomeProps {
    label: string;
    spanName: string;
    onClick?: () => void;
    // onBack: () => void;
}

function NavButton ({ label, spanName, onClick }: ButtonHomeProps) {
    return (
        <div className="flex-1 bg-accent hover:bg-red-700 text-white font-bold text-lg flex-nesw rounded-3xl p-20 no-select cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={onClick}>
            <div className="w-[90%] h-[90%] items-center justify-center flex flex-col">
                <span className="w-3/4 h-3/4 material-symbols-outlined mr-4 border-2 border-white rounded-lg p-6 text-center">
                    <h1 className="text-9xl">{spanName}</h1>
                </span>
                <p className=" w-3/4 h-1/5 text-center">{label}</p>
            </div>
        </div>
    );
}
export default NavButton;