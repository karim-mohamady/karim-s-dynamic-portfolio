import { motion } from 'framer-motion';

const codeElements = [
  { text: '</>', top: '15%', left: '5%', delay: 0 },
  { text: '{}', top: '25%', right: '8%', delay: 0.5 },
  { text: 'const', top: '70%', left: '10%', delay: 1 },
  { text: '=>', top: '60%', right: '12%', delay: 1.5 },
  { text: '()', top: '80%', right: '20%', delay: 2 },
  { text: '[]', top: '20%', left: '15%', delay: 0.3 },
  { text: '/*', top: '45%', left: '3%', delay: 0.8 },
  { text: '*/', top: '55%', right: '5%', delay: 1.2 },
];

export function CodeDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codeElements.map((element, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: element.delay,
            ease: 'easeOut',
          }}
          className="absolute font-mono text-3xl sm:text-5xl font-bold text-primary animate-float select-none"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
            animationDelay: `${element.delay}s`,
          }}
        >
          {element.text}
        </motion.span>
      ))}
    </div>
  );
}
