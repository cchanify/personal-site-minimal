/**
 * Obsidian-style Navigation System
 * Handles sidebar navigation, search, and content switching
 */

class ObsidianNav {
  constructor() {
    this.currentSection = 'about';
    this.sections = {
      'about': {
        title: 'About Connor',
        icon: '👤',
        content: this.getAboutContent()
      },
      'security-resources': {
        title: 'Security Resources',
        icon: '🔐',
        content: this.getSecurityContent()
      },
      'security-talks': {
        title: 'Security Talks',
        icon: '🎤',
        content: this.getSecurityTalksContent()
      },
      'tech-links': {
        title: 'Technology Links',
        icon: '🔗',
        content: this.getTechLinksContent()
      },
      'web3': {
        title: 'Web3 / Crypto',
        icon: '⛓️',
        content: this.getWeb3Content()
      },
      'strava': {
        title: 'Fitness Stats',
        icon: '🏃',
        content: this.getStravaContent()
      },
      'blog': {
        title: 'Blog Posts',
        icon: '📝',
        content: this.getBlogContent()
      }
    };
    
    this.init();
  }

  init() {
    this.createLayout();
    this.setupEventListeners();
    this.showSection(this.currentSection);
  }

  createLayout() {
    const body = document.body;
    body.innerHTML = '';
    
    // Create main container
    const container = document.createElement('div');
    container.className = 'obsidian-container';
    
    // Create sidebar
    const sidebar = this.createSidebar();
    
    // Create main content area
    const mainContent = this.createMainContent();
    
    container.appendChild(sidebar);
    container.appendChild(mainContent);
    body.appendChild(container);
  }

  createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    
    // Sidebar header
    const header = document.createElement('div');
    header.className = 'sidebar-header';
    header.innerHTML = `
      <h1 class="sidebar-title">Connor Hanify</h1>
      <p class="sidebar-subtitle">Security Engineer</p>
    `;
    
    // Navigation
    const nav = document.createElement('nav');
    nav.className = 'sidebar-nav';
    
    // Core sections
    const coreSection = document.createElement('div');
    coreSection.className = 'nav-section';
    coreSection.innerHTML = `
      <h3 class="nav-section-title">Core</h3>
      <button class="nav-item" data-section="about">
        <span class="nav-item-icon">👤</span>About
      </button>
    `;
    
    // Resources sections
    const resourcesSection = document.createElement('div');
    resourcesSection.className = 'nav-section';
    resourcesSection.innerHTML = `
      <h3 class="nav-section-title">Resources</h3>
      <button class="nav-item" data-section="security-resources">
        <span class="nav-item-icon">🔐</span>Security Resources
      </button>
      <button class="nav-item" data-section="security-talks">
        <span class="nav-item-icon">🎤</span>Security Talks
      </button>
      <button class="nav-item" data-section="tech-links">
        <span class="nav-item-icon">🔗</span>Tech Links
      </button>
      <button class="nav-item" data-section="web3">
        <span class="nav-item-icon">⛓️</span>Web3 / Crypto
      </button>
    `;
    
    nav.appendChild(coreSection);
    nav.appendChild(resourcesSection);
    
    sidebar.appendChild(header);
    sidebar.appendChild(nav);
    
    return sidebar;
  }

  createMainContent() {
    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';
    
    // Content header
    const header = document.createElement('div');
    header.className = 'content-header';
    header.innerHTML = `
      <button class="mobile-toggle" id="mobile-toggle">☰</button>
      <h1 class="content-title" id="content-title">About Connor</h1>
      <div class="content-meta">
        <span class="breadcrumb" id="breadcrumb">Connor Hanify</span>
      </div>
    `;
    
    // Content body
    const body = document.createElement('div');
    body.className = 'content-body';
    body.id = 'content-body';
    
    mainContent.appendChild(header);
    mainContent.appendChild(body);
    
    // Mobile overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.id = 'mobile-overlay';
    mainContent.appendChild(overlay);
    
    return mainContent;
  }

  setupEventListeners() {
    // Navigation clicks
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-item')) {
        const section = e.target.getAttribute('data-section');
        this.showSection(section);
      }
    });

    // Mobile toggle
    document.getElementById('mobile-toggle').addEventListener('click', () => {
      this.toggleMobileSidebar();
    });

    // Mobile overlay
    document.getElementById('mobile-overlay').addEventListener('click', () => {
      this.closeMobileSidebar();
    });


    // Close mobile sidebar on section change
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-item') && window.innerWidth <= 768) {
        this.closeMobileSidebar();
      }
    });
  }

  showSection(sectionKey) {
    this.currentSection = sectionKey;
    const section = this.sections[sectionKey];
    
    if (!section) return;
    
    // Update active navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    document.querySelector(`[data-section="${sectionKey}"]`).classList.add('active');
    
    // Update content
    document.getElementById('content-title').textContent = section.title;
    document.getElementById('breadcrumb').textContent = `Connor Hanify > ${section.title}`;
    document.getElementById('content-body').innerHTML = section.content;
    
    // Load special content
    if (sectionKey === 'strava') {
      this.loadStravaStats();
    } else if (sectionKey === 'web3') {
      this.loadNFTDisplay();
    }
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }

  closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }


  // Content generators
  getAboutContent() {
    return `
      <div class="content-section">
        <p>I am currently a Security Engineer at Databricks, where I am part of the incident response team. Before this, I worked on the security team at Uber, and as a Cyber Security Consultant at Aon Cyber Solutions (formerly Stroz Friedberg). I graduated from Middlebury College in 2019 with a Computer Science degree and Political Philosophy minor. At Middlebury I captained the <a href="http://sites.middlebury.edu/ultimate/2018/06/18/middlebury-guy-pranksters-2018-season-recap/" target="_blank">Men's Ultimate Frisbee Team</a>, participated in our computer science club, MiddleEndian, and tutored CS students.</p>
        
        <p>I'm interested in technology, especially in products that help people live better. I am particularly curious about security, web3, biotech, and renewable energy, although I'm always ready to learn new things. I'm a fan of the <a href="https://www.dreamsongs.com/RiseOfWorseIsBetter.html" target="_blank"> Worse Is Better</a> UNIX philosophy and a lover of minimalism.</p>
        
        <p>I also like to <a href="https://www.strava.com/athletes/chanify" target="_blank">bike, swim, and run</a>.</p>

        <div style="margin-top: 2rem;">
          <h3>Connect</h3>
          <p>
            <a href="https://github.com/cchanify" target="_blank">Github</a> | 
            <a href="https://www.linkedin.com/in/connor-hanify-848063114/" target="_blank">LinkedIn</a>
          </p>
        </div>
      </div>
    `;
  }

  getSecurityContent() {
    return `
      <div class="content-section">
        <h2>Security Frameworks & Governance</h2>
        <ul>
          <li><a href="https://attack.mitre.org/" target="_blank">MITRE ATT&CK</a> - Comprehensive knowledge base of adversary tactics and techniques</li>
          <li><a href="https://www.cisecurity.org/controls" target="_blank">CIS Controls</a> - Prioritized set of actions for cyber defense</li>
          <li><a href="https://www.nist.gov/cyberframework" target="_blank">NIST Cybersecurity Framework</a> - Framework for improving critical infrastructure cybersecurity</li>
          <li><a href="https://owasp.org/www-project-top-ten/" target="_blank">OWASP Top 10</a> - Standard awareness document for developers and web application security</li>
          <li><a href="https://cheatsheetseries.owasp.org/" target="_blank">OWASP Cheat Sheet Series</a> - Concise collection of high value information on specific application security topics</li>
          <li><a href="https://csrc.nist.gov/Projects/risk-management/about-rmf" target="_blank">NIST Risk Management Framework</a> - Risk management process for federal information systems</li>
          <li><a href="https://www.iso.org/isoiec-27001-information-security.html" target="_blank">ISO 27001</a> - International standard for information security management systems</li>
        </ul>

        <h2>Security News & Research</h2>
        <ul>
          <li><a href="https://krebsonsecurity.com/" target="_blank">Krebs on Security</a> - In-depth security news and investigation</li>
          <li><a href="https://www.schneier.com/" target="_blank">Schneier on Security</a> - Influential blog on security and privacy</li>
          <li><a href="https://www.darkreading.com/" target="_blank">Dark Reading</a> - Cybersecurity news, analysis and insight</li>
          <li><a href="https://threatpost.com/" target="_blank">Threatpost</a> - Independent news site covering cybersecurity</li>
          <li><a href="https://www.bleepingcomputer.com/" target="_blank">BleepingComputer</a> - Computer help and security news</li>
        </ul>

        <h2>Incident Response & Digital Forensics</h2>
        <ul>
          <li><a href="https://www.sans.org/white-papers/33901/" target="_blank">SANS Incident Response Process</a> - Comprehensive IR methodology</li>
          <li><a href="https://github.com/meirwah/awesome-incident-response" target="_blank">Awesome Incident Response</a> - Curated list of IR tools and resources</li>
          <li><a href="https://www.volatilityfoundation.org/" target="_blank">Volatility Framework</a> - Advanced memory forensics framework</li>
          <li><a href="https://www.sleuthkit.org/" target="_blank">The Sleuth Kit</a> - Collection of command line digital forensics tools</li>
          <li><a href="https://www.autopsy.com/" target="_blank">Autopsy</a> - Digital forensics platform and graphical interface</li>
          <li><a href="https://github.com/google/grr" target="_blank">GRR Rapid Response</a> - Incident response framework for remote live forensics</li>
        </ul>

        <h2>Security Tools & Resources</h2>
        <ul>
          <li><a href="https://github.com/swisskyrepo/PayloadsAllTheThings" target="_blank">PayloadsAllTheThings</a> - Useful payloads and bypass for Web Application Security</li>
          <li><a href="https://gtfobins.github.io/" target="_blank">GTFOBins</a> - Unix binaries that can be exploited by an attacker</li>
          <li><a href="https://github.com/danielmiessler/SecLists" target="_blank">SecLists</a> - Collection of multiple types of lists used during security assessments</li>
          <li><a href="https://github.com/carlospolop/PEASS-ng" target="_blank">PEASS-ng</a> - Privilege Escalation Awesome Scripts SUITE</li>
          <li><a href="https://www.metasploit.com/" target="_blank">Metasploit</a> - Penetration testing framework</li>
          <li><a href="https://portswigger.net/burp" target="_blank">Burp Suite</a> - Web application security testing platform</li>
          <li><a href="https://nmap.org/" target="_blank">Nmap</a> - Network discovery and security auditing utility</li>
          <li><a href="https://www.wireshark.org/" target="_blank">Wireshark</a> - Network protocol analyzer</li>
        </ul>

        <h2>Cloud Security</h2>
        <ul>
          <li><a href="https://github.com/prowler-cloud/prowler" target="_blank">Prowler</a> - Open source security tool for AWS, Azure and GCP</li>
          <li><a href="https://github.com/nccgroup/ScoutSuite" target="_blank">ScoutSuite</a> - Multi-cloud security auditing tool</li>
          <li><a href="https://cloudsplaining.readthedocs.io/" target="_blank">Cloudsplaining</a> - AWS IAM security assessment tool</li>
          <li><a href="https://github.com/bridgecrewio/checkov" target="_blank">Checkov</a> - Static code analysis tool for infrastructure-as-code</li>
        </ul>

        <h2>Security Training & Certifications</h2>
        <ul>
          <li><a href="https://www.sans.org/" target="_blank">SANS Institute</a> - Information security training and certification</li>
          <li><a href="https://www.offensive-security.com/" target="_blank">Offensive Security</a> - Penetration testing training and certifications</li>
          <li><a href="https://tryhackme.com/" target="_blank">TryHackMe</a> - Learn cybersecurity through hands-on exercises</li>
          <li><a href="https://hackthebox.com/" target="_blank">Hack The Box</a> - Penetration testing labs</li>
          <li><a href="https://portswigger.net/web-security" target="_blank">PortSwigger Web Security Academy</a> - Free online web security training</li>
        </ul>
      </div>
    `;
  }

  getSecurityTalksContent() {
    return `
      <div class="content-section">
        <h2>Conference Talks & Presentations</h2>
        <ul>
          <li><a href="https://www.youtube.com/watch?v=x9va5ZQuAMI&list=PLO8_Yc4h5cIoDD_81sjgFFnRHG-pX_e_C&index=10">The impact of digital forensics in IR investigations</a> | Carly Battaile and Partha Alwar | MSSN CTRL (2024)</li>
          <li><a href="https://www.youtube.com/watch?v=cMkYrypg0_Y&list=PLO8_Yc4h5cIoDD_81sjgFFnRHG-pX_e_C&index=19">Using AI to reduce toil in detection writing</a> | Dylan Williams | MSSN CTRL (2024)</li>
          <li><a href="https://www.youtube.com/watch?v=BPh4Hc3TH74">A decade of defense: securing the largest US crypto exchange</a> | Philip Martin | MSSN CTRL 2024</li>
          <li><a href="https://www.youtube.com/watch?v=cB7RCAAS4ik&list=PLdh-RwQzDsaNWBex2I09OFLCph7l_KnQE">Kubernetes Security Fundamentals: API Security</a> - Part 1. Published 2024-02-13</li>
          <li>AppSecCali 2019 - <a href="https://www.youtube.com/watch?v=6iNpqTZrwjE">Startup security: Starting a security program at a startup</a> - Evan Johnson</li>
          <li>BSidesSF 2024 - <a href="https://www.youtube.com/watch?v=DyRxMmypt_g">Startup Security</a>, 2nd Edition, published 2024-07-08 Evan Johnson</li>
          <li>DEF CON 32 - <a href="https://www.youtube.com/watch?v=pTSEViCwAig&list=PL9fPq3eQfaaB2scbXRczwvjVH0ckX4bwt&index=9">On Your Ocean's 11 Team, I'm the AI Guy</a> (technically Girl) - Harriet Farlow</li>
        </ul>
      </div>
    `;
  }

  getTechLinksContent() {
    return `
      <div class="content-section">
        <h2>Technology & Industry Analysis</h2>
        <ul>
          <li><a href="https://www.wired.com/story/the-wired-guide-to-protecting-yourself-from-government-surveillance/">The WIRED Guide to Protecting Yourself From Government Surveillance</a>. Published 2024-11-12</li>
          <li><a href="https://freedom.press/digisec/blog/choosing-a-vpn/">An in-depth guide to choosing a VPN</a>. Published 2018-06-29 by David Huerta</li>
          <li><a href="https://motherduck.com/blog/big-data-is-dead/">Big Data is Dead</a>. Published 2023-02-07 by Jordan Tigani</li>
          <li><a href="https://a16z.com/its-time-to-build/">It's Time to Build</a>. Published 2020-04-18 by Marc Andressen</li>
          <li><a href="https://a16z.com/the-techno-optimist-manifesto/">The Techno-Optimist Manifesto</a>. Published 2023-10-16 by Marc Andressen</li>
          <li><a href="https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html">My techno-optimism</a>. Published 2023-11-27 by Vitalik Buterin</li>
          <li><a href="https://loeber.substack.com/p/11-approaches-to-software-engineering">Approaches to Software Engineering that Worked For Me</a>. Published 2023-08-21 by John Loeber</li>
          <li><a href="https://leighmariebraswell.substack.com/p/overview-and-applications-of-large">Overview & Applications of Large Language Models (LLMs)</a> from Leigh Marie Braswell</li>
          <li><a href="http://joschu.net/blog/opinionated-guide-ml-research.html">An Opinionated Guide to ML Research</a> John Schulman</li>
          <li><a href="https://paulgraham.com/greatwork.html?ref=thediff.co">How To Do Great Work</a> by Paul Graham</li>
          <li><a href="https://menlovc.com/perspective/ai-for-security-eight-areas-of-opportunity/">AI for Security: Eight Areas of Opportunity, from Menlo Ventures</a></li>
          <li><a href="https://www.rippling.com/blog/engineering-siem-part-1">Why did we need to build our own SIEM? from Rippling</a></li>
          <li><a href="https://www.datadoghq.com/blog/key-kubernetes-audit-logs-for-monitoring-cluster-security/">Key Kubernetes audit logs for monitoring cluster security, from Datadog</a></li>
        </ul>

        <h2>Research Papers & Technical Content</h2>
        <ul>
          <li><a href="https://defcon.org/images/defcon-26/DEF%20CON%2026%20voting%20village%20report.pdf">DEF CON 26 Voting Village</a></li>
          <li><a href="https://www.eff.org/files/2018/02/20/malicious_ai_report_final.pdf">Malicious AI Report</a></li>
          <li><a href="https://web.stanford.edu/~engler/BLOC-coverity.pdf">Using Static Analysis to Find Bugs in the Real World</a></li>
          <li><a href="https://www.youtube.com/watch?v=L0KuAx1COEk">MIT Pathway to Fusion Energy (IAP 2017) - Zach Hartwig</a></li>
        </ul>

        <h2>Philosophy & Methodology</h2>
        <ul>
          <li><a href="https://www.dreamsongs.com/RiseOfWorseIsBetter.html" target="_blank"> Worse Is Better</a> - UNIX philosophy and design principles</li>
        </ul>
      </div>
    `;
  }

  getWeb3Content() {
    return `
      <div class="content-section">
        <h2>Foundational Papers</h2>
        <ul>
          <li><a href="https://bitcoin.org/bitcoin.pdf" target="_blank">Bitcoin: A Peer-to-Peer Electronic Cash System</a> - Satoshi Nakamoto</li>
          <li><a href="https://ethereum.org/en/whitepaper/" target="_blank">Ethereum Whitepaper</a> - Vitalik Buterin</li>
        </ul>

        <h2>NFT Collection</h2>
        <p>This NFT was won as part of Chainlink's treasure hunt. NFTs follow the ERC721 standard for unique digital assets.</p>
        <div id="nft-container" style="margin-top: 1rem;"></div>
      </div>
    `;
  }

  getStravaContent() {
    return `
      <div class="content-section">
        <h2>2024 Fitness Statistics</h2>
        <p>Live stats from my <a href="https://www.strava.com/athletes/chanify" target="_blank">Strava profile</a>:</p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
          <div style="padding: 1.5rem; background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
            <h3 style="margin: 0 0 0.5rem 0; color: var(--text-secondary);">🏃 Running</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--text-primary);" id="running-distance">Loading...</div>
          </div>
          <div style="padding: 1.5rem; background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
            <h3 style="margin: 0 0 0.5rem 0; color: var(--text-secondary);">🏊 Swimming</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--text-primary);" id="swimming-distance">Loading...</div>
          </div>
          <div style="padding: 1.5rem; background: var(--secondary-bg); border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
            <h3 style="margin: 0 0 0.5rem 0; color: var(--text-secondary);">🚴 Cycling</h3>
            <div style="font-size: 2rem; font-weight: bold; color: var(--text-primary);" id="cycling-distance">Loading...</div>
          </div>
        </div>
      </div>
    `;
  }

  getBlogContent() {
    return `
      <div class="content-section">
        <h2>Recent Posts</h2>
        <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 1.5rem; margin: 1rem 0;">
          <h3 style="margin: 0 0 0.5rem 0;"><a href="posts/2022-11-17.html" target="_blank">First Post</a></h3>
          <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0 0 1rem 0;">November 17, 2022</p>
          <p style="margin: 0;">Welcome to my personal website. More content coming soon...</p>
        </div>
        
        <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
          <p>More blog posts coming soon! 📝</p>
        </div>
      </div>
    `;
  }

  // Special content loaders
  loadStravaStats() {
    if (typeof fetchStravaStats === 'function') {
      fetchStravaStats();
    } else {
      // Load the Strava stats script dynamically
      const script = document.createElement('script');
      script.src = 'strava-stats.js';
      document.head.appendChild(script);
    }
  }

  loadNFTDisplay() {
    // Trigger NFT display
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ObsidianNav();
});