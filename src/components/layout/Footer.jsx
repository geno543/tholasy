import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Programs: [
      { name: 'Blender Mastery', path: '/courses#blender' },
      { name: 'SolidWorks Pro', path: '/courses#solidworks' },
      { name: 'All Courses', path: '/courses' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Enrollment', path: '/enrollment' },
    ],
  }

  return (
    <footer className="bg-dark-900 text-dark-100">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-display font-bold text-white">
                THOLASY
              </span>
            </Link>
            <p className="text-dark-300 mb-6 max-w-sm">
              Online courses for learning 3D design with Blender and SolidWorks.
            </p>
            <div className="text-dark-300">
              <p className="mb-2">📞 0155 993 9054</p>
              <p>📍 Cairo, Egypt</p>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-dark-300 hover:text-primary-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800 mt-12 pt-8">
          <p className="text-dark-400 text-sm text-center">
            © {currentYear} THOLASY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
