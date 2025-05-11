interface localOptProps {
    title: string;
    onClick: () => void;
}

export default function LocalOpt({ title, onClick }: localOptProps) {
    return (
        <button type="button" className="bg-accent hover:bg-red-700 text-white registerOpt
        hoverBtn" onClick={onClick}> {title}</button>
    );
}