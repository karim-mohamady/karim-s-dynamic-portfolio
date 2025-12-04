import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeDecorations } from '@/components/CodeDecorations';
import heroBgImg from '@/assets/hero-bg.png';

const WHATSAPP_NUMBER = '201017238942';

export function HeroSection() {
  const { t } = useTranslation();

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Karim, I'm interested in your front-end development services!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `url(${heroBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      {/* Code decorations */}
      <CodeDecorations />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Code-style greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block code-block px-4 py-2 font-mono text-sm">
              <span className="code-comment">{t('hero.code_comment')}</span>
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-lg sm:text-xl text-muted-foreground mb-2">
              {t('hero.greeting')}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
              <span className="gradient-text">{t('hero.name')}</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/90 mb-6 font-mono">
              {'{'}
              <span className="text-primary"> {t('hero.title')} </span>
              {'}'}
            </h2>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              className="group bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-glow"
              asChild
            >
              <a href="#projects">
                {t('hero.cta_projects')}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={openWhatsApp}
              className="group border-primary/30 hover:bg-primary/10"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t('hero.cta_contact')}
            </Button>
          </motion.div>

          {/* Code snippet decoration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-16 hidden sm:block"
          >
            <div className="code-block p-4 sm:p-6 max-w-md mx-auto text-left font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div>
                <span className="code-keyword">const</span>{' '}
                <span className="code-function">developer</span> = {'{'}
              </div>
              <div className="pl-4">
                <span className="text-foreground">name:</span>{' '}
                <span className="code-string">"Karim Mohamady"</span>,
              </div>
              <div className="pl-4">
                <span className="text-foreground">skills:</span>{' '}
                <span className="text-foreground">[</span>
                <span className="code-string">"React"</span>,{' '}
                <span className="code-string">"TypeScript"</span>,{' '}
                <span className="code-string">"Next.js"</span>
                <span className="text-foreground">]</span>,
              </div>
              <div className="pl-4">
                <span className="text-foreground">passion:</span>{' '}
                <span className="code-string">"∞"</span>
              </div>
              <div>{'}'}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
