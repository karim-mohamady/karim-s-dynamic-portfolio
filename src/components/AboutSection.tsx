import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SkillsChart } from '@/components/SkillsChart';

const stats = [
  { key: 'experience', value: '3+' },
  { key: 'projects_completed', value: '50+' },
  { key: 'happy_clients', value: '30+' },
];

const skillIcons = [
  { name: 'HTML5', icon: '🌐' },
  { name: 'CSS3', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind', icon: '💨' },
  { name: 'Git', icon: '📦' },
];

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('about.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: D3 Skills Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">
                {t('about.skills_title')}
              </h3>
              <SkillsChart />
            </div>
          </motion.div>

          {/* Right: Description & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {t(`about.${stat.key}`)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Skill Icons Grid */}
            <div className="grid grid-cols-4 gap-3">
              {skillIcons.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="glass-card rounded-lg p-3 text-center cursor-default"
                >
                  <div className="text-2xl mb-1">{skill.icon}</div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {skill.name}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
