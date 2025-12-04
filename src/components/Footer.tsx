import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/karimmohamady', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/karimmohamady', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/karimmohamady', label: 'Twitter' },
];

const navLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'services', href: '#services' },
  { key: 'contact', href: '#contact' },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#home" className="inline-block mb-4">
              <span className="text-2xl font-bold font-mono gradient-text">
                &lt;KM /&gt;
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.social')}</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Code decoration */}
          <div className="hidden lg:block">
            <div className="code-block p-3 font-mono text-xs">
              <div className="code-comment">// Let's connect</div>
              <div>
                <span className="code-keyword">export</span>{' '}
                <span className="code-keyword">default</span>{' '}
                <span className="code-function">karim</span>;
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            {t('footer.copyright')}
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            {t('footer.made_with')}
            <Heart className="h-4 w-4 text-destructive fill-destructive" />
            & React
          </p>
        </div>
      </div>
    </footer>
  );
}
