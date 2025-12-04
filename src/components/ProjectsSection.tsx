import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import projectEcommerceImg from '@/assets/project-ecommerce.png';
import projectTaskappImg from '@/assets/project-taskapp.png';
import projectDashboardImg from '@/assets/project-dashboard.png';
import projectSocialImg from '@/assets/project-social.png';

interface Project {
  id: string;
  image: string;
  technologies: string[];
  demo: string;
  github: string;
}

const projects: Project[] = [
  {
    id: 'project1',
    image: projectEcommerceImg,
    technologies: ['React', 'Next.js', 'Stripe', 'Tailwind'],
    demo: '#',
    github: '#',
  },
  {
    id: 'project2',
    image: projectTaskappImg,
    technologies: ['React', 'TypeScript', 'DnD Kit', 'Supabase'],
    demo: '#',
    github: '#',
  },
  {
    id: 'project3',
    image: projectDashboardImg,
    technologies: ['React', 'D3.js', 'WebSocket', 'Node.js'],
    demo: '#',
    github: '#',
  },
  {
    id: 'project4',
    image: projectSocialImg,
    technologies: ['React', 'Firebase', 'Tailwind', 'Framer Motion'],
    demo: '#',
    github: '#',
  },
];

export function ProjectsSection() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-32 relative">
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
            <span className="gradient-text">{t('projects.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(`projects.${project.id}.title`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-primary font-medium bg-background/80 px-4 py-2 rounded-full">View Details</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {t(`projects.${project.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {t(`projects.${project.id}.description`)}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">
                  {t(`projects.${selectedProject.id}.title`)}
                </DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <img
                  src={selectedProject.image}
                  alt={t(`projects.${selectedProject.id}.title`)}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <p className="text-muted-foreground mb-6">
                  {t(`projects.${selectedProject.id}.full_description`)}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2">{t('projects.technologies')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button asChild className="flex-1 bg-gradient-primary hover:opacity-90">
                    <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('projects.view_demo')}
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="flex-1">
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {t('projects.view_code')}
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
