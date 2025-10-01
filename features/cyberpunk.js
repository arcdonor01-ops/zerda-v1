// Cyberpunk Bug Bounty Website JavaScript

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initGlitchEffects();
    initTerminal();
    initProgressBars();
    initCharts();
    initInteractiveComponents();
    initScrollAnimations();
});

// Typewriter Effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, 50);
    });
}

// Glitch Effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
    });
}

// Terminal Simulation
function initTerminal() {
    const terminals = document.querySelectorAll('.terminal');
    
    terminals.forEach(terminal => {
        const output = terminal.querySelector('.terminal-output');
        if (output) {
            simulateTerminal(output);
        }
    });
}

function simulateTerminal(outputElement) {
    const commands = [
        'nmap -sV target.com',
        'subfinder -d target.com -all',
        'httpx -l subdomains.txt',
        'nuclei -l targets.txt',
        'sqlmap -u "http://target.com/login" --dbs'
    ];
    
    let commandIndex = 0;
    
    function executeCommand() {
        if (commandIndex < commands.length) {
            const command = commands[commandIndex];
            outputElement.innerHTML += `<div class="command-line">$ ${command}</div>`;
            
            // Simulate command execution delay
            setTimeout(() => {
                outputElement.innerHTML += `<div class="command-output">Executing ${command}...</div>`;
                outputElement.scrollTop = outputElement.scrollHeight;
                commandIndex++;
                
                setTimeout(executeCommand, 2000);
            }, 1000);
        }
    }
    
    executeCommand();
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.cyber-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || '70%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Charts and Data Visualization
function initCharts() {
    // Bug Bounty Success Rate Chart
    const successChart = document.getElementById('successChart');
    if (successChart) {
        const ctx = successChart.getContext('2d');
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#00ffff');
        gradient.addColorStop(1, '#ff00ff');
        
        // Mock data for bug bounty success rates
        const data = {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            datasets: [{
                label: 'Success Rate (%)',
                data: [5, 12, 25, 35, 45, 60],
                backgroundColor: gradient,
                borderColor: '#00ffff',
                borderWidth: 2,
                fill: true
            }]
        };
        
        // Simple bar chart rendering
        renderBarChart(ctx, data);
    }
    
    // Platform Comparison Chart
    const platformChart = document.getElementById('platformChart');
    if (platformChart) {
        const ctx = platformChart.getContext('2d');
        
        const data = {
            labels: ['HackerOne', 'Bugcrowd', 'Intigriti', 'YesWeHack'],
            datasets: [{
                label: 'Average Bounty ($)',
                data: [450, 380, 320, 280],
                backgroundColor: ['#00ffff', '#ff00ff', '#00ff00', '#ff6600'],
                borderWidth: 0
            }]
        };
        
        renderPieChart(ctx, data);
    }
}

function renderBarChart(ctx, data) {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const barWidth = width / data.labels.length * 0.6;
    const maxValue = Math.max(...data.datasets[0].data);
    
    data.labels.forEach((label, index) => {
        const barHeight = (data.datasets[0].data[index] / maxValue) * height * 0.8;
        const x = (index * (width / data.labels.length)) + (width / data.labels.length - barWidth) / 2;
        const y = height - barHeight - 20;
        
        // Draw bar
        ctx.fillStyle = data.datasets[0].backgroundColor;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, height - 5);
        
        // Draw value
        ctx.fillText(data.datasets[0].data[index] + '%', x + barWidth / 2, y - 5);
    });
}

function renderPieChart(ctx, data) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let currentAngle = -Math.PI / 2;
    const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
    
    data.datasets[0].data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        
        ctx.fillStyle = data.datasets[0].backgroundColor[index];
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText(data.labels[index], labelX, labelY);
        ctx.fillText('$' + value, labelX, labelY + 15);
        
        currentAngle += sliceAngle;
    });
}

// Interactive Components
function initInteractiveComponents() {
    // Bug Bounty Calculator
    const calculator = document.getElementById('bountyCalculator');
    if (calculator) {
        initBountyCalculator(calculator);
    }
    
    // Learning Path Generator
    const pathGenerator = document.getElementById('learningPathGenerator');
    if (pathGenerator) {
        initLearningPathGenerator(pathGenerator);
    }
    
    // Vulnerability Scanner
    const scanner = document.getElementById('vulnerabilityScanner');
    if (scanner) {
        initVulnerabilityScanner(scanner);
    }
}

function initBountyCalculator(container) {
    const form = container.querySelector('form');
    const result = container.querySelector('.result');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const skillLevel = form.querySelector('[name="skill"]').value;
            const timeCommitment = form.querySelector('[name="time"]').value;
            const targetType = form.querySelector('[name="target"]').value;
            
            // Simple calculation logic
            let baseEarnings = 0;
            let successRate = 0;
            
            switch(skillLevel) {
                case 'beginner':
                    baseEarnings = 200;
                    successRate = 15;
                    break;
                case 'intermediate':
                    baseEarnings = 800;
                    successRate = 35;
                    break;
                case 'advanced':
                    baseEarnings = 2000;
                    successRate = 60;
                    break;
            }
            
            const timeMultiplier = parseInt(timeCommitment) / 10;
            const targetMultiplier = targetType === 'web' ? 1.2 : 1.5;
            
            const estimatedEarnings = Math.round(baseEarnings * timeMultiplier * targetMultiplier);
            const estimatedSuccess = Math.round(successRate * timeMultiplier);
            
            result.innerHTML = `
                <div class="cyber-card">
                    <h3 class="text-cyan">Estimated Results</h3>
                    <p><strong>Monthly Earnings:</strong> <span class="text-green">$${estimatedEarnings}</span></p>
                    <p><strong>Success Rate:</strong> <span class="text-magenta">${estimatedSuccess}%</span></p>
                    <p><strong>Recommendation:</strong> ${getRecommendation(skillLevel, estimatedSuccess)}</p>
                </div>
            `;
        });
    }
}

function getRecommendation(skill, success) {
    if (success < 20) {
        return 'Focus on learning basic vulnerabilities and practice on VDP programs first.';
    } else if (success < 40) {
        return 'Good progress! Consider joining HackerOne or Bugcrowd for better opportunities.';
    } else {
        return 'Excellent! You\'re ready for advanced bug bounty programs and private invites.';
    }
}

function initLearningPathGenerator(container) {
    const form = container.querySelector('form');
    const pathDisplay = container.querySelector('.learning-path');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentLevel = form.querySelector('[name="level"]').value;
            const goals = form.querySelector('[name="goals"]').value;
            const timeAvailable = form.querySelector('[name="time"]').value;
            
            const path = generateLearningPath(currentLevel, goals, timeAvailable);
            
            pathDisplay.innerHTML = `
                <div class="cyber-card">
                    <h3 class="text-cyan">Your Personalized Learning Path</h3>
                    ${path.map((step, index) => `
                        <div class="path-step">
                            <h4>Step ${index + 1}: ${step.title}</h4>
                            <p>${step.description}</p>
                            <div class="step-duration">Duration: ${step.duration}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        });
    }
}

function generateLearningPath(level, goals, time) {
    const paths = {
        beginner: [
            {
                title: 'Web Security Fundamentals',
                description: 'Learn HTTP/HTTPS, HTML, JavaScript basics and OWASP Top 10',
                duration: '2-3 weeks'
            },
            {
                title: 'Tools Setup & Practice',
                description: 'Install and configure Burp Suite, Nmap, and practice labs',
                duration: '1-2 weeks'
            },
            {
                title: 'First Bug Bounty Program',
                description: 'Start with VDP programs or beginner-friendly platforms',
                duration: '2-4 weeks'
            }
        ],
        intermediate: [
            {
                title: 'Advanced Vulnerabilities',
                description: 'Deep dive into business logic flaws, SSRF, and advanced XSS',
                duration: '3-4 weeks'
            },
            {
                title: 'Automation & Scripting',
                description: 'Learn Python for custom tools and automation',
                duration: '2-3 weeks'
            },
            {
                title: 'Platform Strategy',
                description: 'Optimize your approach for HackerOne and Bugcrowd',
                duration: '2-3 weeks'
            }
        ],
        advanced: [
            {
                title: 'Zero-Day Research',
                description: 'Focus on finding novel vulnerabilities and techniques',
                duration: '4-6 weeks'
            },
            {
                title: 'Private Programs',
                description: 'Build reputation for exclusive private bug bounty invites',
                duration: '3-4 weeks'
            },
            {
                title: 'Mentoring & Community',
                description: 'Give back to community and build your brand',
                duration: 'Ongoing'
            }
        ]
    };
    
    return paths[level] || paths.beginner;
}

function initVulnerabilityScanner(container) {
    const form = container.querySelector('form');
    const results = container.querySelector('.scan-results');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const url = form.querySelector('[name="url"]').value;
            
            // Simulate scanning process
            results.innerHTML = `
                <div class="cyber-card">
                    <h3 class="text-cyan">Scanning ${url}...</h3>
                    <div class="terminal">
                        <div class="terminal-output">
                            <div>Starting security assessment...</div>
                            <div>Checking for common vulnerabilities...</div>
                        </div>
                    </div>
                </div>
            `;
            
            setTimeout(() => {
                const mockResults = generateMockScanResults(url);
                results.innerHTML = mockResults;
            }, 3000);
        });
    }
}

function generateMockScanResults(url) {
    const vulnerabilities = [
        { name: 'Missing Security Headers', severity: 'low', description: 'X-Frame-Options and CSP headers not set' },
        { name: 'Directory Listing Enabled', severity: 'medium', description: 'Sensitive directories may be exposed' },
        { name: 'Outdated JavaScript Libraries', severity: 'high', description: 'jQuery version with known vulnerabilities' }
    ];
    
    return `
        <div class="cyber-card">
            <h3 class="text-cyan">Scan Results for ${url}</h3>
            ${vulnerabilities.map(vuln => `
                <div class="vulnerability-item">
                    <h4 class="text-${vuln.severity === 'high' ? 'magenta' : vuln.severity === 'medium' ? 'orange' : 'green'}">
                        ${vuln.name}
                    </h4>
                    <p>${vuln.description}</p>
                    <div class="severity-badge severity-${vuln.severity}">${vuln.severity.toUpperCase()}</div>
                </div>
            `).join('')}
            <p class="scan-note">Note: This is a demonstration scanner. Use professional tools for real assessments.</p>
        </div>
    `;
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => observer.observe(element));
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-info {
        background: #00ffff;
        color: #000;
    }
    
    .notification-success {
        background: #00ff00;
        color: #000;
    }
    
    .notification-error {
        background: #ff00ff;
        color: #fff;
    }
    
    .path-step {
        margin: 20px 0;
        padding: 15px;
        border-left: 3px solid #00ffff;
        background: rgba(0, 255, 255, 0.1);
    }
    
    .step-duration {
        color: #ff00ff;
        font-size: 0.9em;
        font-weight: bold;
    }
    
    .vulnerability-item {
        margin: 15px 0;
        padding: 10px;
        border: 1px solid #333;
        border-radius: 5px;
    }
    
    .severity-badge {
        display: inline-block;
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 0.8em;
        font-weight: bold;
        margin-top: 5px;
    }
    
    .severity-low {
        background: #00ff00;
        color: #000;
    }
    
    .severity-medium {
        background: #ff6600;
        color: #fff;
    }
    
    .severity-high {
        background: #ff00ff;
        color: #fff;
    }
    
    .scan-note {
        margin-top: 20px;
        padding: 10px;
        background: rgba(255, 0, 255, 0.1);
        border: 1px solid #ff00ff;
        border-radius: 5px;
        font-style: italic;
    }
`;

document.head.appendChild(style);