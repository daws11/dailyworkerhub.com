import { motion } from "framer-motion";

export function FloatingElements() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-[10%] left-[5%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    x: [0, -15, 0],
                    rotate: [0, -8, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute top-[40%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-[20%] left-[15%] w-72 h-72 bg-accent/10 rounded-full blur-3xl"
            />
        </div>
    );
}
