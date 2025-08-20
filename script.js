const output = document.getElementById('output');
const input = document.getElementById('terminal-input');
const cursor = document.getElementById('cursor');

// Portfolio data - customize this section
const portfolio = {
    name: "Ketaki Shintre",
    title: "Software Developer",
    email: "kshintre95@gmail.com",
    github: "https://github.com/ketaki09",
    linkedin: "https://linkedin.com/in/ketakishintre95",
    skills: {
        "Python": 90,
        "JavaScript": 90,
        "React": 88,
        "Node.js": 82,
        "HTML/CSS": 95,
        "Git": 87,
        "SQL": 80,
        "Docker": 75
    },
    projects: [
        {
            name: "Project One",
            description: "A full-stack web application built with React and Node.js",
            tech: "React, Node.js, MongoDB",
            url: "https://github.com/yourusername/project-one"
        },
        {
            name: "Project Two", 
            description: "Mobile-first responsive website with modern UI/UX",
            tech: "HTML, CSS, JavaScript",
            url: "https://github.com/yourusername/project-two"
        },
        {
            name: "Project Three",
            description: "RESTful API with authentication and database integration",
            tech: "Python, Flask, PostgreSQL",
            url: "https://github.com/yourusername/project-three"
        }
    ],
    experience: [
        {
            role: "Senior Software Developer",
            company: "Iquest Solutions",
            period: "2021 - Present",
            description: "Developing web applications and maintaining backend services"
        },
        {
            role: "Software Developer",
            company: "Iquest Solutions",
            period: "2019 - 2021",
            description: "Built responsive websites"
        }
    ]
};

const commands = {
    help: () => {
        return `
<span class="info">Available commands:</span>

  <span class="success">about</span>      - Learn more about me
  <span class="success">skills</span>     - View my technical skills  
  <span class="success">projects</span>   - See my recent projects
  <span class="success">experience</span> - View my work experience
  <span class="success">contact</span>    - Get my contact information
  <span class="success">resume</span>     - Download my resume
  <span class="success">clear</span>      - Clear the terminal
  <span class="success">help</span>       - Show this help message

<span class="info">Navigation tips:</span>
  - Use Tab for command completion
  - Use Up/Down arrows for command history
  - Commands are case-insensitive
        `;
    },

    about: () => {
        return `
<span class="info">About ${portfolio.name}</span>

Hello! I'm ${portfolio.name}, a passionate ${portfolio.title} with a love for creating 
innovative web solutions. I enjoy working with modern technologies and solving 
complex problems through clean, efficient code.

I specialize in full-stack development with experience in both frontend and 
backend technologies. I'm always eager to learn new technologies and take on 
challenging projects.

When I'm not coding, you can find me exploring new tech trends, contributing to 
open-source projects, or enjoying outdoor activities.
        `;
    },

    skills: () => {
        let skillsHtml = '<span class="info">Technical Skills</span>\n\n';
        
        Object.entries(portfolio.skills).forEach(([skill, level]) => {
            const barLength = Math.floor(level / 5);
            const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
            skillsHtml += `<div class="skill-bar">`;
            skillsHtml += `<span class="skill-name">${skill}</span>`;
            skillsHtml += `<span class="success">[${bar}]</span>`;
            skillsHtml += `<span class="skill-percent">${level}%</span>`;
            skillsHtml += `</div>`;
        });

        return skillsHtml;
    },

    projects: () => {
        let projectsHtml = '<span class="info">Recent Projects</span>\n\n';
        
        portfolio.projects.forEach((project, index) => {
            projectsHtml += `<span class="success">${index + 1}. ${project.name}</span>\n`;
            projectsHtml += `   ${project.description}\n`;
            projectsHtml += `   <span class="warning">Tech Stack:</span> ${project.tech}\n`;
            projectsHtml += `   <span class="info">URL:</span> ${project.url}\n\n`;
        });

        return projectsHtml;
    },

    experience: () => {
        let expHtml = '<span class="info">Work Experience</span>\n\n';
        
        portfolio.experience.forEach((job) => {
            expHtml += `<span class="success">${job.role}</span> at <span class="info">${job.company}</span>\n`;
            expHtml += `<span class="warning">${job.period}</span>\n`;
            expHtml += `${job.description}\n\n`;
        });

        return expHtml;
    },

    contact: () => {
        return `
<span class="info">Contact Information</span>

<span class="success">Email:</span>    ${portfolio.email}
<span class="success">GitHub:</span>   ${portfolio.github}  
<span class="success">LinkedIn:</span> ${portfolio.linkedin}

<span class="info">Feel free to reach out for collaborations or opportunities!</span>
        `;
    },

    resume: () => {
        return `
<span class="info">Resume Download</span>

<span class="warning">Note:</span> To add a resume download link, upload your resume to your 
GitHub repository and update the URL below.

<span class="success">Resume URL:</span> https://github.com/yourusername/portfolio/blob/main/resume.pdf

<span class="info">You can also generate a PDF of this terminal portfolio by printing this page!</span>
        `;
    },

    clear: () => {
        output.innerHTML = '';
        return '';
    }
};

let commandHistory = [];
let historyIndex = -1;

function addToOutput(content, className = '') {
    const div = document.createElement('div');
    div.className = `line ${className}`;
    div.innerHTML = content;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function processCommand(cmd) {
    const command = cmd.toLowerCase().trim();
    
    // Add command to history
    if (command && commandHistory[commandHistory.length - 1] !== command) {
        commandHistory.push(command);
    }
    historyIndex = commandHistory.length;

    // Display the command
    addToOutput(`<span class="prompt">visitor@portfolio:~$</span><span class="command">${cmd}</span>`);

    // Process the command
    if (commands[command]) {
        const result = commands[command]();
        if (result) {
            addToOutput(result);
        }
    } else if (command === '') {
        // Do nothing for empty command
    } else {
        addToOutput(`<span class="error">Command not found: ${command}</span>`);
        addToOutput(`Type <span class="success">'help'</span> to see available commands.`);
    }
}

// Handle input
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = input.value;
        processCommand(command);
        input.value = '';
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            input.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            input.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            input.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
        if (matches.length === 1) {
            input.value = matches[0];
        }
    }
});

// Keep input focused
document.addEventListener('click', () => {
    input.focus();
});

// Initial welcome message
setTimeout(() => {
    addToOutput(`<span class="success">System initialized successfully.</span>`);
    addToOutput(`<span class="info">Welcome to ${portfolio.name}'s portfolio terminal!</span>`);
    addToOutput(`Type <span class="success">'help'</span> to see available commands.`);
}, 500);