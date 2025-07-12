import { ButtonPrimary } from "./Button";


const sitemap = [
  {
    label: 'Home',
    href: '#home'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Work',
    href: '#work'
  },
  {
    label: 'Reviews',
    href: '#reviews'
  },
  {
    label: 'Contact me',
    href: '#contact'
  }
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/munirajubr'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/munirajubr/'
  },
  {
    label: 'Twitter (X)',
    href: 'https://x.com/the_muniraj'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/the.muniraj_gowda/'
  },
];


const Footer = () => {
    return(
        <footer className="section">
            <div className="container">

                <div className="lg:grid lg:grid-cols-2">
                    <div className="mb-10">
                        <h2 className="mb-8 headline-1 lg:max-w-[12ch] reveal-up">
                          Let&apos;s work together today!</h2>

                        <ButtonPrimary
                        href="mailto:munirajgowdaraj@outlook.com"
                        label="Start Project"
                        icon="chevron_right"
                        classes="reveal-up"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:pl-20">
                        <div>
                            <p className="mb-2 reveal-up">Sitemap</p>

                            <ul>
                                {sitemap.map(({label, href}, key)=> (
                                    <li key={key}>
                                        <a href={href} className="block py-1 text-sm transition-colors text-zinc-400 hover:text-zinc-200 reveal-up">
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    

                        <div>
                            <p className="mb-2 reveal-up">Socials</p>

                            <ul>
                                {socials.map(({label, href}, key)=> (
                                    <li key={key}>
                                        <a href={href} target="_blank" className="block py-1 text-sm transition-colors reveal-up text-zinc-400 hover:text-zinc-200">
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>    
                </div>

                <div className="flex items-center justify-between pt-10 mb-8">
                    <a 
                        href="/" 
                        className="logo reveal-up"
                    >
                        <img 
                            src="/images/logo.svg" 
                            width={40}
                            height={40}
                            alt="Logo" 
                        />
                    </a>

                    <p className="text-sm text-zinc-500 reveal-up">
                        &copy; 2025 <span className="text-zinc-200">Muniraju B R</span>
                    </p>
                </div>

            </div>
        </footer>
    )
}

export default Footer;