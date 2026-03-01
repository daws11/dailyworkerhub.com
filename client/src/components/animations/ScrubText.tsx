import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrubTextProps {
    text: string;
    className?: string;
    variant?: "reveal" | "blur" | "opacity";
}

export function ScrubText({ text, className = "", variant = "reveal" }: ScrubTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const words = text.split(" ");

    return (
        <div ref={ref} className={className}>
            {words.map((word, i) => {
                // Calculate start/end for each word based on its position
                const start = i / words.length;
                const end = (i + 1) / words.length;

                return (
                    <Word
                        key={i}
                        progress={smoothProgress}
                        range={[start, end]}
                        variant={variant}
                    >
                        {word}
                    </Word>
                );
            })}
        </div>
    );
}

function Word({ children, progress, range, variant }: {
    children: string;
    progress: any;
    range: [number, number];
    variant: "reveal" | "blur" | "opacity";
}) {
    const opacity = useTransform(progress, range, [0.2, 1]);
    const blur = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
    const y = useTransform(progress, range, [10, 0]);

    return (
        <span className="relative inline-block mr-[0.25em]">
            <motion.span
                style={{
                    opacity,
                    filter: variant === "blur" ? blur : "none",
                    y: variant === "reveal" ? y : 0
                }}
            >
                {children}
            </motion.span>
        </span>
    );
}
