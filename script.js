// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(251, 251, 253, 0.95)';
    } else {
        navbar.style.background = 'rgba(251, 251, 253, 0.8)';
    }
});

// Terminal functionality for Experience section
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const cursor = document.getElementById('cursor');

// Portfolio data for terminal
const experienceData = {
    jobs: [
        {
            id: 1,
            company: "Tech Innovators Inc.",
            role: "Senior Full Stack Developer",
            period: "2023 - Present",
            location: "San Francisco, CA",
            description: "Leading a team of 5 developers in building scalable web applications using React, Node.js, and AWS. Implemented microservices architecture that improved system performance by 40%.",
            technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Docker"],
            achievements: [
                "Led migration to microservices, reducing deployment time by 60%",
                "Mentored 3 junior developers",
                "Implemented CI/CD pipeline using GitHub Actions"
            ]
        },
        {
            id: 2,
            company: "StartupXYZ",
            role: "Full Stack Developer",
            period: "2021 - 2023",
            location: "New York, NY",
            description: "Developed and maintained multiple client-facing applications serving over 100k users. Built RESTful APIs and responsive web interfaces.",
            technologies: ["JavaScript", "Python", "React", "Flask", "PostgreSQL", "Redis"],
            achievements: [
                "Increased user engagement by 35% through UI/UX improvements",
                "Optimized database queries, reducing load times by 50%",
                "Built real-time chat feature using WebSockets"
            ]
        },
        {
            id: 3,
            company: "WebDev Solutions",
            role: "Junior Developer",
            period: "2020 - 2021",
            location: "Austin, TX",
            description: "Started my professional journey building websites and learning full-stack development. Worked on various client projects and internal tools.",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "WordPress"],
            achievements: [
                "Delivered 15+ client websites on time",
                "Improved website loading speed by 45% on average",
                "Created custom WordPress plugins"
            ]
        }
    ]
};

const terminalCommands = {
    help: () => {
        return `
<span class="info">Experience Terminal - Available Commands:</span>

  <span class="success">list</span>          - Show all work experiences
  <span class="success">show &lt;id&gt;</span>      - View detailed info about a specific job (e.g., 'show 1')
  <span class="success">skills</span>        - Display all technologies I've worked with
  <span class="success">timeline</span>      - Show career timeline
  <span class="success">achievements</span>  - View key accomplishments
  <span class="success">current</span>       - Show current position details
  <span class="success">clear</span>         - Clear terminal output
  <span class="success">help</span>          - Show this help message

<span class="info">Navigation Tips:</span>
  • Use Tab for command completion
  • Use Up/Down arrows for command history
  • Commands are case-insensitive
        `;
    },

    list: () => {
        let output = '<span class="info">Work Experience Summary:</span>\n\n';
        experienceData.jobs.forEach(job => {
            output += `<span class="success">[${job.id}]</span> <span class="warning">${job.role}</span> at <span class="info">${job.company}</span>\n`;
            output += `    📅 ${job.period} • 📍 ${job.location}\n`;
            output += `    Use 'show ${job.id}' for detailed information\n\n`;
        });
        return output;
    },

    show: (args) => {
        if (!args || args.length === 0) {
            return '<span class="error">Please specify a job ID. Use "list" to see all jobs.</span>';
        }
        
        const jobId = parseInt(args[0]);
        const job = experienceData.jobs.find(j => j.id === jobId);
        
        if (!job) {
            return `<span class="error">Job with ID ${jobId} not found. Use "list" to see available jobs.</span>`;
        }
        
        let output = `<span class="info">📋 ${job.role} at ${job.company}</span>\n\n`;
        output += `<span class="warning">📅 Duration:</span> ${job.period}\n`;
        output += `<span class="warning">📍 Location:</span> ${job.location}\n\n`;
        output += `<span class="success">📝 Description:</span>\n${job.description}\n\n`;
        output += `<span class="success">🛠️ Technologies:</span>\n`;
        job.technologies.forEach(tech => {
            output += `  • ${tech}\n`;
        });
        output += `\n<span class="success">🏆 Key Achievements:</span>\n`;
        job.achievements.forEach(achievement => {
            output += `  ✓ ${achievement}\n`;
        });
        
        return output;
    },

    skills: () => {
        const allSkills = [...new Set(experienceData.jobs.flatMap(job => job.technologies))];
        const skillCategories = {
            'Frontend': ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
            'Backend': ['Node.js', 'Python', 'Flask', 'PHP'],
            'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
            'DevOps': ['AWS', 'Docker', 'GitHub Actions'],
            'Other': ['WordPress']
        };
        
        let output = '<span class="info">🛠️ Technologies & Skills:</span>\n\n';
        
        Object.entries(skillCategories).forEach(([category, categorySkills]) => {
            const relevantSkills = categorySkills.filter(skill => allSkills.includes(skill));
            if (relevantSkills.length > 0) {
                output += `<span class="warning">${category}:</span>\n`;
                relevantSkills.forEach(skill => {
                    output += `  • ${skill}\n`;
                });
                output += '\n';
            }
        });
        
        return output;
    },

    timeline: () => {
        let output = '<span class="info">📈 Career Timeline:</span>\n\n';
        const sortedJobs = [...experienceData.jobs].reverse();
        
        sortedJobs.forEach((job, index) => {
            const isLast = index === sortedJobs.length - 1;
            const connector = isLast ? '└─' : '├─';
            output += `<span class="success">${connector}</span> <span class="warning">${job.period}</span>\n`;
            output += `${isLast ? '   ' : '│  '} <span class="info">${job.role}</span>\n`;
            output += `${isLast ? '   ' : '│  '} <span class="success">${job.company}</span> • ${job.location}\n`;
            if (!isLast) output += '│\n';
        });
        
        return output;
    },

    achievements: () => {
        let output = '<span class="info">🏆 Key Career Achievements:</span>\n\n';
        let achievementCount = 1;
        
        experienceData.jobs.forEach(job => {
            job.achievements.forEach(achievement => {
                output += `<span class="success">${achievementCount}.</span> ${achievement}\n`;
                output += `   <span class="warning">@${job.company}</span> (${job.period})\n\n`;
                achievementCount++;
            });
        });
        
        return output;
    },

    current: () => {
        const currentJob = experienceData.jobs[0]; // Assuming first job is current
        let output = '<span class="info">💼 Current Position:</span>\n\n';
        output += `<span class="success">Role:</span> ${currentJob.role}\n`;
        output += `<span class="success">Company:</span> ${currentJob.company}\n`;
        output += `<span class="success">Since:</span> ${currentJob.period.split(' - ')[0]}\n`;
        output += `<span class="success">Location:</span> ${currentJob.location}\n\n`;
        output += `<span class="warning">Current Focus:</span>\n`;
        output += `${currentJob.description}\n\n`;
        output += '<span class="info">🚀 Always open to new opportunities and challenges!</span>';
        
        return output;
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    }
};

let terminalHistory = [];
let terminalHistoryIndex = -1;

function addToTerminalOutput(content, className = '') {
    const div = document.createElement('div');
    div.className = `line ${className}`;
    div.innerHTML = content;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function processTerminalCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    // Add command to history
    if (cmd.trim() && terminalHistory[terminalHistory.length - 1] !== cmd.trim()) {
        terminalHistory.push(cmd.trim());
    }
    terminalHistoryIndex = terminalHistory.length;

    // Display the command
    addToTerminalOutput(`<span class="prompt">visitor@experience:~$</span><span class="command">${cmd}</span>`);

    // Process the command
    if (terminalCommands[command]) {
        const result = terminalCommands[command](args);
        if (result) {
            addToTerminalOutput(result);
        }
    } else if (command === '') {
        // Do nothing for empty command
    } else {
        addToTerminalOutput(`<span class="error">Command not found: ${command}</span>`);
        addToTerminalOutput(`Type <span class="success">'help'</span> to see available commands.`);
        
        // Suggest similar commands
        const suggestions = Object.keys(terminalCommands).filter(cmd => 
            cmd.includes(command) || command.includes(cmd)
        );
        if (suggestions.length > 0) {
            addToTerminalOutput(`<span class="info">Did you mean:</span> <span class="warning">${suggestions.join(', ')}</span>?`);
        }
    }
}

// Terminal input handling
if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            processTerminalCommand(command);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (terminalHistoryIndex > 0) {
                terminalHistoryIndex--;
                terminalInput.value = terminalHistory[terminalHistoryIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (terminalHistoryIndex < terminalHistory.length - 1) {
                terminalHistoryIndex++;
                terminalInput.value = terminalHistory[terminalHistoryIndex];
            } else {
                terminalHistoryIndex = terminalHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = terminalInput.value.toLowerCase();
            const matches = Object.keys(terminalCommands).filter(cmd => cmd.startsWith(partial));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                addToTerminalOutput(`<span class="info">Multiple matches:</span> <span class="warning">${matches.join(', ')}</span>`);
            }
        }
    });

    // Keep terminal input focused when clicking in terminal area
    document.querySelector('.terminal').addEventListener('click', () => {
        terminalInput.focus();
    });
}

// Terminal control buttons
document.querySelectorAll('.terminal-container .control').forEach(control => {
    control.addEventListener('click', () => {
        if (control.classList.contains('close')) {
            addToTerminalOutput(`<span class="warning">Nice try! This terminal is persistent 😄</span>`);
        } else if (control.classList.contains('minimize')) {
            addToTerminalOutput(`<span class="info">Terminal minimized... just kidding! 📦</span>`);
        } else if (control.classList.contains('maximize')) {
            addToTerminalOutput(`<span class="success">Terminal is already optimized for the best experience! ⚡</span>`);
        }
        terminalInput.focus();
    });
});

// Initialize terminal with welcome message
document.addEventListener('DOMContentLoaded', () => {
    if (terminalOutput) {
        setTimeout(() => {
            addToTerminalOutput('<span class="success">Experience Terminal initialized successfully.</span>');
            addToTerminalOutput('<span class="info">Welcome to my professional journey!</span>');
            addToTerminalOutput('Type <span class="success">\'help\'</span> to explore available commands.');
            addToTerminalOutput('Try <span class="success">\'list\'</span> to see all my work experiences.');
        }, 1000);
    }
});

// Form submission handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! I\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .skill-category, .stat-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});