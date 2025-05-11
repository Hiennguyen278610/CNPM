interface LegendCenterProps {
    title: string;
}

export default function LegendCenter({ title }: LegendCenterProps) {
    return (
        <div className="w-full flex-nesw gap-4">
            <div className="h-px bg-dark flex-1"></div>
            <legend className="text-center !text-sm text-gray-500 px-2">{title}</legend>
            <div className="h-px bg-dark flex-1"></div>
        </div>
    );
}

