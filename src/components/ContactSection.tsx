import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const WHATSAPP_NUMBER = '201017238942';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address').max(255),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        variant: 'destructive',
        title: t('contact.form.error'),
        description: 'Please check the form for errors.',
      });
      return;
    }

    const serviceName = t(`contact.services_list.${formData.service}`);
    const message = encodeURIComponent(
      `Hello Karim, I am interested in your service: ${serviceName}.\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nDetails:\n${formData.message}`
    );
    
    toast({
      title: t('contact.form.success'),
      description: 'Redirecting to WhatsApp...',
    });

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t('contact.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('contact.form.name')} *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={t('contact.form.name_placeholder')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('contact.form.email')} *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t('contact.form.email_placeholder')}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('contact.form.service')} *
                </label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleInputChange('service', value)}
                >
                  <SelectTrigger className={errors.service ? 'border-destructive' : ''}>
                    <SelectValue placeholder={t('contact.form.service_placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landing">{t('contact.services_list.landing')}</SelectItem>
                    <SelectItem value="portfolio">{t('contact.services_list.portfolio')}</SelectItem>
                    <SelectItem value="figma">{t('contact.services_list.figma')}</SelectItem>
                    <SelectItem value="other">{t('contact.services_list.other')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.service && (
                  <p className="text-sm text-destructive mt-1">{errors.service}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('contact.form.message')} *
                </label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={t('contact.form.message_placeholder')}
                  rows={5}
                  className={errors.message ? 'border-destructive' : ''}
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
              >
                <Send className="mr-2 h-4 w-4" />
                {t('contact.form.submit')}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl font-semibold">{t('contact.info.title')}</h3>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 glass-card p-4 rounded-xl hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">{t('contact.info.whatsapp')}</p>
                  <p className="text-muted-foreground text-sm">+20 101 723 8942</p>
                </div>
              </a>

              <div className="flex items-center gap-4 glass-card p-4 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t('contact.info.email')}</p>
                  <p className="text-muted-foreground text-sm">contact@karimmohamady.dev</p>
                </div>
              </div>

              <div className="flex items-center gap-4 glass-card p-4 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">{t('contact.info.location')}</p>
                  <p className="text-muted-foreground text-sm">{t('contact.info.location_value')}</p>
                </div>
              </div>
            </div>

            {/* Decorative code block */}
            <div className="hidden lg:block code-block p-4 font-mono text-sm mt-auto">
              <div className="code-comment">// Ready to work together?</div>
              <div>
                <span className="code-keyword">await</span>{' '}
                <span className="code-function">sendMessage</span>
                {'('}
                <span className="code-string">"Let's build something amazing!"</span>
                {')'}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
