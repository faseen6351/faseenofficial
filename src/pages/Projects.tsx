import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye, Filter } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Card from '../components/Card';
import Button from '../components/Button';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Apps' },
    { id: '3d', name: '3D Projects' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'ai', name: 'AI/ML' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Interactive 3D Portfolio',
      description: 'An immersive 3D portfolio website built with Three.js, featuring interactive elements and smooth animations that showcase projects in a unique spatial environment.',
      category: '3d',
      image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Three.js', 'React', 'TypeScript', 'GLSL'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'AI-Powered Analytics Dashboard',
      description: 'A comprehensive analytics platform that uses machine learning to provide actionable insights from complex datasets, featuring real-time data visualization.',
      category: 'ai',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
      demoUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Flutter E-Commerce App',
      description: 'A full-featured e-commerce mobile application with elegant UI/UX, secure payment integration, and real-time inventory management.',
      category: 'mobile',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Enterprise Web Application',
      description: 'A scalable enterprise solution for project management with advanced features like real-time collaboration, automated reporting, and role-based access control.',
      category: 'web',
      image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'AR Visualization Tool',
      description: 'An augmented reality application for architectural visualization, allowing users to view 3D models in real-world environments using their mobile devices.',
      category: '3d',
      image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['Unity', 'ARCore', 'C#', 'Blender'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Smart Home Dashboard',
      description: 'An IoT dashboard for smart home management with voice control, automated scheduling, and energy consumption monitoring.',
      category: 'web',
      image: 'https://images.pexels.com/photos/1329299/pexels-photo-1329299.jpeg?auto=compress&cs=tinysrgb&w=600',
      technologies: ['React', 'Node.js', 'MQTT', 'MongoDB'],
      demoUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  const ProjectCard: React.FC<{ project: any; index: number; featured?: boolean }> = ({ 
    project, 
    index, 
    featured = false 
  }) => (
    <Card delay={index * 0.1} className={`group ${featured ? 'md:col-span-2' : ''}`}>
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full object-cover transition-transform duration-300 group-hover:scale-110 ${
            featured ? 'h-64' : 'h-48'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            <Button size="sm" className="bg-white/20 hover:bg-white/30">
              <Eye className="w-4 h-4 mr-1" />
              Demo
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 hover:bg-white/10">
              <Github className="w-4 h-4 mr-1" />
              Code
            </Button>
          </div>
        </div>
      </div>
      
      <h3 className={`font-semibold text-white mb-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
        {project.title}
      </h3>
      
      <p className={`text-white/70 mb-4 ${featured ? 'text-base' : 'text-sm'}`}>
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech: string) => (
          <span
            key={tech}
            className="px-2 py-1 bg-white/10 text-white/80 rounded-md text-xs"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <a
            href={project.demoUrl}
            className="text-accent-400 hover:text-accent-300 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
          <a
            href={project.githubUrl}
            className="text-white/60 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
        <span className="text-xs text-white/40 capitalize">{project.category}</span>
      </div>
    </Card>
  );

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Featured{' '}
              <span className="bg-gradient-to-r from-accent-400 to-emerald-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              A showcase of my passion projects, professional work, and experimental creations
              that demonstrate my technical expertise and creative problem-solving
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-white/70">My most impactful and innovative projects</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Filter className="w-5 h-5 text-white/60 mr-2 mt-2" />
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {filter.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card>
            <h2 className="text-3xl font-bold text-white mb-6">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Have a project in mind? I'd love to hear about it and explore how we can
              bring your vision to life with cutting-edge technology and thoughtful design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Start a Project
              </Button>
              <Button variant="outline" size="lg">
                View More Work
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;