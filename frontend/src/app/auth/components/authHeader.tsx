interface AuthHeaderProps {
    onBack: () => void;
    authtitle: string;
    authslogan: string;
}

function AuthHeader({ onBack, authtitle, authslogan }: AuthHeaderProps) {
    return (
        <div className="w-full h-1/5 bg-transparent !p-5 flex flex-row">
        <div className="w-1/10 h-full">
            <div className="!w-max !h-max rounded-xl bg-accent hover:bg-red-700 text-white text-center  transition duration-500 ease-in-out transform hover:scale-105" onClick={() => onBack()}>
                <span className="material-symbols-outlined !text-5xl no-select ">arrow_back</span>
            </div>
        </div>  
        <div className="w-9/10 h-full flex flex-col">
            <div className='w-full h-1/2'><p className='text-5xl text-primary select-none'>{authtitle}</p>
            </div>
            <div className='w-full h-1/2'><p className=' text-primary select-none'>{authslogan}</p>
            </div>
        </div>
    </div>
    );
}

export default AuthHeader;