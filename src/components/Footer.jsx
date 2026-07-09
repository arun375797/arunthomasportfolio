import { Heart } from 'lucide-react';
import { HiOutlineMail } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-slate-500 text-sm">
          <span>Built with</span>
          <Heart size={14} className="text-purple-400 fill-purple-400 mx-0.5" />
          <span>by</span>
          <span className="text-purple-300 font-medium ml-1">Arun Thomas</span>
        </div>

        <div className="flex gap-4">
          {[
            { icon: <FaGithub size={18} />, href: 'https://github.com/arun375797' },
            { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/arun-t37579' },
            { icon: <HiOutlineMail size={18} />, href: 'mailto:arun37579@gmail.com' },
          ].map(({ icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-purple-400 transition-colors duration-200"
            >
              {icon}
            </a>
          ))}
        </div>

        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Arun Thomas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
