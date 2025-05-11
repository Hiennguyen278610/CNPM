import { DeviconGoogle } from '@/app/auth/components/logoGoogle';

interface GoogleOptProps {
    title: string;
    onClick: () => void;
}

export default function GoogleOpt({ title, onClick }: GoogleOptProps) {
    return (
        <button type="button" className="bg-light hover:bg-secondary text-dark registerOpt
        cursor-pointer flex-nesw flex-row gap-2 border-1 border-dark hoverBtn" onClick={onClick}>
            <span className='w-max h-max'><DeviconGoogle /></span>
            <span className='w-max'>{title}</span>
        </button>
    );
}
