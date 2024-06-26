import { useState, useEffect, useRef } from 'react'

export default function TruncatedText( text: string, maxHeight: string ) {
    const [isTruncated, setIsTruncated] = useState(false);
    const [displayText, setDisplayText] = useState(text);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (textRef.current)
            if (textRef.current.scrollHeight > textRef.current.clientHeight) {
                setIsTruncated(true);
            }
    }, [text]);

    useEffect(() => {
        if (isTruncated) {
            let truncatedText = text;
            if (textRef.current)
                while (textRef.current.scrollHeight > textRef.current.clientHeight) {
                    truncatedText = truncatedText.slice(0, -1);
                    setDisplayText(truncatedText + '...');
                }
        }
    }, [isTruncated]);

    return (
        <div style={{ maxHeight, overflow: 'hidden' }}>
            <div
                ref={textRef}
                style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.25rem'
                }}
            >
                {displayText}
            </div>
        </div>
    );
}