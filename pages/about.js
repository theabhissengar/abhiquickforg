import { FiShield, FiLock, FiClock, FiEye, FiUsers } from 'react-icons/fi';

const features = [
  {
    icon: <FiShield className="w-8 h-8" />,
    title: 'End-to-End Encryption',
    description: 'Your secrets are encrypted before they leave your browser and remain encrypted until they are viewed by the intended recipient.',
  },
  {
    icon: <FiLock className="w-8 h-8" />,
    title: 'Password Protection',
    description: 'Add an extra layer of security with password protection for your most sensitive secrets.',
  },
  {
    icon: <FiClock className="w-8 h-8" />,
    title: 'Self-Destructing Messages',
    description: 'Set expiration times for your secrets, ensuring they are automatically deleted after a specified period.',
  },
  {
    icon: <FiEye className="w-8 h-8" />,
    title: 'View Count Control',
    description: 'Control how many times your secret can be viewed before it self-destructs.',
  },
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: 'Team Collaboration',
    description: 'Share secrets securely with your team members and manage access permissions.',
  },
];

const team = [
  {
    name: 'John Doe',
    role: 'Founder & CEO',
    bio: 'Security enthusiast with over 10 years of experience in cybersecurity.',
    image: '/team/john.jpg',
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    bio: 'Expert in encryption technologies and secure data transmission.',
    image: '/team/jane.jpg',
  },
  {
    name: 'Mike Johnson',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in secure web applications.',
    image: '/team/mike.jpg',
  },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              About QuickForget
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              We're on a mission to make secure secret sharing simple and accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  {/* Image would go here */}
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card">
            <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
            <div className="prose max-w-3xl mx-auto">
              <p className="text-gray-600 mb-4">
                At QuickForget, we believe that everyone deserves to share sensitive information securely and with confidence. Our platform was built with privacy and security as the top priorities.
              </p>
              <p className="text-gray-600 mb-4">
                We understand that in today's digital world, sharing sensitive information is often necessary, but it shouldn't come at the cost of security. That's why we've created a simple, yet powerful solution that puts you in control of your data.
              </p>
              <p className="text-gray-600">
                Whether you're sharing passwords, confidential documents, or personal information, QuickForget ensures that your secrets remain secure and are automatically deleted after they've served their purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">
            Join thousands of users who trust QuickForget for their secure secret sharing needs.
          </p>
          <a
            href="/create"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-medium hover:bg-gray-100"
          >
            Create Your First Secret
          </a>
        </div>
      </section>
    </div>
  );
} 