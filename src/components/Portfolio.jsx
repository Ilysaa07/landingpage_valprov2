import React from 'react';

const Portfolio = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with payment integration and inventory management.",
      image: "https://via.placeholder.com/400x300",
      category: "Web Development"
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and real-time transactions.",
      image: "https://via.placeholder.com/400x300",
      category: "Mobile Development"
    },
    {
      title: "Cloud Migration",
      description: "Successfully migrated enterprise systems to cloud infrastructure with 99.9% uptime.",
      image: "https://via.placeholder.com/400x300",
      category: "Cloud Solutions"
    },
    {
      title: "AI Chatbot",
      description: "Intelligent customer service chatbot with natural language processing capabilities.",
      image: "https://via.placeholder.com/400x300",
      category: "AI Solutions"
    },
    {
      title: "Data Analytics Dashboard",
      description: "Real-time business intelligence dashboard with interactive data visualization.",
      image: "https://via.placeholder.com/400x300",
      category: "Data Analytics"
    },
    {
      title: "IoT Monitoring System",
      description: "Internet of Things solution for industrial equipment monitoring and predictive maintenance.",
      image: "https://via.placeholder.com/400x300",
      category: "IoT Solutions"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore some of our recent projects and see how we've helped businesses achieve their goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 font-semibold mb-2">{project.category}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
