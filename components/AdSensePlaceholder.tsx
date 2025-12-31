
export default function AdSensePlaceholder({ slot, format = 'auto', className = '' }: { slot: string, format?: string, className?: string }) {
    if (process.env.NODE_ENV === 'development') {
        return (
            <div className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 font-mono text-xs p-4 ${className}`}>
                [Publicidade Google AdSense]
            </div>
        );
    }

    return (
        <div className={className}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-4160276489030508"
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"></ins>
        </div>
    );
}
