import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Rocket, Briefcase, Code2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import serviceLandingImg from '@/assets/service-landing.png';
import servicePortfolioImg from '@/assets/service-portfolio.png';
import serviceFigmaImg from '@/assets/service-figma.png';

const services = [
  {
    id: 'landing',
    icon: Rocket,
    image: serviceLandingImg,
  },
  {
    id: 'portfolio',
    icon: Briefcase,
    image: servicePortfolioImg,
  },
  {
    id: 'figma',
    icon: Code2,
    image: serviceFigmaImg,
  },
];

const WHATSAPP_NUMBER = '201017238942';

export function ServicesSection() {
  const { t } = useTranslation();

  const handleServiceClick = (serviceId: string) => {
    const serviceName = t(`services.${serviceId}.title`);
    const message = encodeURIComponent(
      `Hello Karim, I am interested in your service: ${serviceName}.\n\nPlease provide more details about pricing and timeline.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <section id="services" className="py-20 sm:py-32 relative overflow-hidden">
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
            <span className="gradient-text">{t('services.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="group h-full glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={t(`services.${service.id}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  
                  {/* Icon overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                      <service.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {t(`services.${service.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {t(`services.${service.id}.description`)}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-lg font-bold gradient-text">
                      {t(`services.${service.id}.price`)}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleServiceClick(service.id)}
                    className="w-full group/btn bg-gradient-primary hover:opacity-90"
                  >
                    {t('services.cta')}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
