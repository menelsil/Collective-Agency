// Initialize all visualizations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initScrollProgress();
    initVantaBackground();
    initTrapVisualization();
    initNetworkVisualization();
    initMarkovVisualization();
    initSystemArchitecture();
    initSmoothScrolling();
    initNatureModals();
    initExpandableCards();
    initTooltips();
});

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Vanta.js background for hero section
function initVantaBackground() {
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x3b82f6,
            backgroundColor: 0x1a1b3a,
            points: 8.00,
            maxDistance: 25.00,
            spacing: 16.00
        });
    }
}

// Evolutionary trap visualization
function initTrapVisualization() {
    const container = document.getElementById('trap-visualization');
    if (!container) return;

    const data = [
        {
            x: ['Индивидуальная\nагентность', 'Коллективная\nагентность', 'Глобальные\nпроблемы', 'Решения'],
            y: [90, 30, 80, 20],
            type: 'bar',
            marker: {
                color: ['#ef4444', '#f59e0b', '#dc2626', '#10b981'],
                line: {
                    color: '#374151',
                    width: 2
                }
            },
            text: ['Высокая', 'Низкая', 'Критическая', 'Недостаточные'],
            textposition: 'auto',
        }
    ];

    const layout = {
        title: {
            text: 'Разрыв между агентностями',
            font: { size: 18, family: 'Inter' }
        },
        xaxis: { title: 'Уровни агентности' },
        yaxis: { title: 'Степень развития (%)', range: [0, 100] },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter' },
        margin: { t: 50, b: 80, l: 60, r: 40 }
    };

    Plotly.newPlot(container, data, layout, {responsive: true, displayModeBar: false});
}

// Network visualization for nature examples
function initNetworkVisualization() {
    const container = document.getElementById('network-visualization');
    if (!container) return;

    // Create network nodes
    const nodes = [
        {id: 'center', name: 'Коллектив', x: 0.5, y: 0.5, color: '#6366f1', size: 40},
        {id: 'node1', name: 'Агент 1', x: 0.2, y: 0.2, color: '#10b981', size: 25},
        {id: 'node2', name: 'Агент 2', x: 0.8, y: 0.2, color: '#10b981', size: 25},
        {id: 'node3', name: 'Агент 3', x: 0.2, y: 0.8, color: '#10b981', size: 25},
        {id: 'node4', name: 'Агент 4', x: 0.8, y: 0.8, color: '#10b981', size: 25},
        {id: 'node5', name: 'Агент 5', x: 0.5, y: 0.1, color: '#f59e0b', size: 25},
        {id: 'node6', name: 'Агент 6', x: 0.5, y: 0.9, color: '#f59e0b', size: 25}
    ];

    const edges = [
        {from: 'center', to: 'node1'},
        {from: 'center', to: 'node2'},
        {from: 'center', to: 'node3'},
        {from: 'center', to: 'node4'},
        {from: 'center', to: 'node5'},
        {from: 'center', to: 'node6'},
        {from: 'node1', to: 'node2'},
        {from: 'node2', to: 'node5'},
        {from: 'node3', to: 'node4'},
        {from: 'node4', to: 'node6'},
        {from: 'node1', to: 'node3'},
        {from: 'node2', to: 'node4'}
    ];

    // Create Plotly network graph
    const nodeTrace = {
        x: nodes.map(n => n.x),
        y: nodes.map(n => n.y),
        mode: 'markers+text',
        marker: {
            size: nodes.map(n => n.size),
            color: nodes.map(n => n.color),
            line: { width: 2, color: '#374151' }
        },
        text: nodes.map(n => n.name),
        textposition: 'middle center',
        textfont: { size: 10, color: 'white', family: 'Inter' },
        type: 'scatter',
        hoverinfo: 'text',
        hovertext: nodes.map(n => n.name)
    };

    const edgeTraces = edges.map(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        return {
            x: [fromNode.x, toNode.x, null],
            y: [fromNode.y, toNode.y, null],
            mode: 'lines',
            line: { width: 2, color: '#a5b4fc' },
            type: 'scatter',
            hoverinfo: 'none',
            showlegend: false
        };
    });

    const data = [...edgeTraces, nodeTrace];

    const layout = {
        title: {
            text: 'Сеть коллективной агентности',
            font: { size: 18, family: 'Inter' }
        },
        xaxis: { showgrid: false, zeroline: false, showticklabels: false, range: [-0.1, 1.1] },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false, range: [-0.1, 1.1] },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter' },
        margin: { t: 50, b: 20, l: 20, r: 20 },
        showlegend: false
    };

    Plotly.newPlot(container, data, layout, {responsive: true, displayModeBar: false});
}

// Markov chain visualization
function initMarkovVisualization() {
    const container = document.getElementById('markov-visualization');
    if (!container) return;

    // Create states for Markov chain
    const states = ['State A', 'State B', 'State C', 'State D'];
    const transitionMatrix = [
        [0.7, 0.2, 0.1, 0.0],
        [0.3, 0.4, 0.2, 0.1],
        [0.1, 0.3, 0.5, 0.1],
        [0.0, 0.1, 0.2, 0.7]
    ];

    // Create Sankey diagram for Markov chain
    const source = [];
    const target = [];
    const value = [];
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    for (let i = 0; i < states.length; i++) {
        for (let j = 0; j < states.length; j++) {
            if (transitionMatrix[i][j] > 0) {
                source.push(i);
                target.push(j);
                value.push(transitionMatrix[i][j]);
            }
        }
    }

    const data = [{
        type: "sankey",
        node: {
            pad: 15,
            thickness: 20,
            line: { color: "black", width: 0.5 },
            label: states,
            color: colors
        },
        link: {
            source: source,
            target: target,
            value: value,
            color: 'rgba(99, 102, 241, 0.3)'
        }
    }];

    const layout = {
        title: {
            text: 'Марковская цепь переходов',
            font: { size: 18, family: 'Inter' }
        },
        font: { size: 12, family: 'Inter' },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        margin: { t: 50, b: 20, l: 20, r: 20 }
    };

    Plotly.newPlot(container, data, layout, {responsive: true, displayModeBar: false});
}

// System architecture visualization
function initSystemArchitecture() {
    const container = document.getElementById('system-architecture');
    if (!container) return;

    // Create hierarchical architecture diagram
    const levels = [
        { name: 'Человек', y: 0.9, color: '#6366f1', size: 30 },
        { name: 'Роль', y: 0.75, color: '#10b981', size: 25 },
        { name: 'Команда', y: 0.6, color: '#f59e0b', size: 30 },
        { name: 'Проект', y: 0.45, color: '#ef4444', size: 35 },
        { name: 'Платформа', y: 0.3, color: '#8b5cf6', size: 40 },
        { name: 'Цивилизация', y: 0.15, color: '#374151', size: 45 }
    ];

    const connections = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5]
    ];

    // Create traces for each level
    const traces = levels.map((level, index) => ({
        x: [0.5],
        y: [level.y],
        mode: 'markers+text',
        marker: {
            size: level.size,
            color: level.color,
            line: { width: 3, color: '#ffffff' }
        },
        text: level.name,
        textposition: 'middle center',
        textfont: { size: 12, color: 'white', family: 'Inter' },
        type: 'scatter',
        name: level.name,
        hoverinfo: 'text',
        hovertext: level.name,
        showlegend: false
    }));

    // Add connection lines
    connections.forEach(conn => {
        const from = levels[conn[0]];
        const to = levels[conn[1]];
        traces.push({
            x: [0.5, 0.5],
            y: [from.y, to.y],
            mode: 'lines',
            line: { width: 3, color: '#a5b4fc', dash: 'dot' },
            type: 'scatter',
            hoverinfo: 'none',
            showlegend: false
        });
    });

    const layout = {
        title: {
            text: 'Фрактальная иерархия системы',
            font: { size: 18, family: 'Inter' }
        },
        xaxis: { showgrid: false, zeroline: false, showticklabels: false, range: [0, 1] },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false, range: [0, 1] },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        font: { family: 'Inter' },
        margin: { t: 50, b: 20, l: 20, r: 20 }
    };

    Plotly.newPlot(container, traces, layout, {responsive: true, displayModeBar: false});
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Modal functionality
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

// Nature details modal system
function initNatureModals() {
    // Add click handlers for nature examples
    document.querySelectorAll('.nature-example').forEach(example => {
        example.addEventListener('click', function() {
            const type = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showNatureDetails(type);
        });
    });
}

function showNatureDetails(type) {
    const details = {
        bees: {
            title: 'Пчелы и муравьи: Колония как суперорганизм',
            content: `
                <div class="space-y-4">
                    <p><strong>Принцип:</strong> Разделение труда и специализация</p>
                    <p><strong>Механизм:</strong> Феромоновые следы и танец пчёл</p>
                    <p><strong>Результат:</strong> Глобальная оптимизация без централизованного контроля</p>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <p class="text-sm"><strong>Интересный факт:</strong> Особи-резервисты почти никогда ничего не делают, но моментально включаются при чрезвычайных ситуациях.</p>
                    </div>
                </div>
            `,
            color: 'yellow'
        },
        mycorrhiza: {
            title: 'Микоризные сети: "Дерево жизни" леса',
            content: `
                <div class="space-y-4">
                    <p><strong>Принцип:</strong> Симбиоз и обмен ресурсами</p>
                    <p><strong>Механизм:</strong> Грибница соединяет корни растений</p>
                    <p><strong>Результат:</strong> Лес действует как единый организм</p>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <p class="text-sm"><strong>Научный факт:</strong> Растения передают друг другу химические сигналы об опасности через грибные сети.</p>
                    </div>
                </div>
            `,
            color: 'green'
        },
        birds: {
            title: 'Стая скворцов: Рой без лидера',
            content: `
                <div class="space-y-4">
                    <p><strong>Прinciple:</strong> Локальные правила → глобальное поведение</p>
                    <p><strong>Механизм:</strong> Каждая птица следует простым правилам:</p>
                    <ul class="list-disc list-inside ml-4 space-y-1 text-sm">
                        <li>Сохраняй дистанцию до соседей</li>
                        <li>Выравнивай направление с соседями</li>
                        <li>Избегай хищников</li>
                    </ul>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <p class="text-sm"><strong>Математика:</strong> Модель Бройда (Boids) - первый компьютерный симулятор стаи.</p>
                    </div>
                </div>
            `,
            color: 'blue'
        },
        cells: {
            title: 'Наши клетки: Симбиотическое сообщество',
            content: `
                <div class="space-y-4">
                    <p><strong>Принцип:</strong> Эндосимбиозная теория</p>
                    <p><strong>Механизм:</strong> Митохондрии и хлоропласты были когда-то свободными бактериями</p>
                    <p><strong>Результат:</strong> Комплексные многоклеточные организмы</p>
                    <div class="bg-red-50 p-4 rounded-lg">
                        <p class="text-sm"><strong>Эволюционный факт:</strong> Симбиоз стал мощным механизмом эволюции, позволивший создать сложные формы жизни.</p>
                    </div>
                </div>
            `,
            color: 'red'
        }
    };

    const detail = details[type];
    if (!detail) return;

    // Create modal if it doesn't exist
    let modal = document.getElementById('nature-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'nature-modal';
        modal.className = 'fixed inset-0 bg-black/80 z-50 hidden items-center justify-center p-6';
        modal.innerHTML = `
            <div class="max-w-2xl w-full bg-white rounded-3xl p-8 relative">
                <button onclick="closeModal('nature-modal')" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl">×</button>
                <div id="nature-modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Update content
    const contentDiv = document.getElementById('nature-modal-content');
    contentDiv.innerHTML = `
        <h2 class="serif text-3xl font-bold mb-6 text-gray-900">${detail.title}</h2>
        ${detail.content}
        <div class="mt-6 text-center">
            <button onclick="closeModal('nature-modal')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Закрыть
            </button>
        </div>
    `;

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

// Add intersection observer for animations
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

// Observe all concept cards and feature items
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.concept-card, .feature-item, .nature-example, .crisis-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const hoverElements = document.querySelectorAll('.card-hover');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        });
    });
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
        const modals = document.querySelectorAll('.fixed.inset-0:not(.hidden)');
        modals.forEach(modal => {
            if (modal.id) {
                closeModal(modal.id);
            }
        });
    }
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.fixed.inset-0:not(.hidden)');
        modals.forEach(modal => {
            if (modal.id) {
                closeModal(modal.id);
            }
        });
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#intro');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const title = entry.target.querySelector('h1');
            if (title && !title.classList.contains('typed')) {
                title.classList.add('typed');
                // Uncomment the line below to enable typing effect
                // typeWriter(title, title.textContent, 30);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('#intro');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});

// Add particle system for gear visualization (enhanced visual effect)
function createParticleSystem() {
    const gears = document.querySelectorAll('.gear');
    gears.forEach(gear => {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(99, 102, 241, 0.6);
                border-radius: 50%;
                pointer-events: none;
                animation: particle-float ${3 + Math.random() * 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${50 + (Math.random() - 0.5) * 100}%;
                top: ${50 + (Math.random() - 0.5) * 100}%;
            `;
            gear.appendChild(particle);
        }
    });
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.6; 
        }
        50% { 
            transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.5); 
            opacity: 1; 
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle system
document.addEventListener('DOMContentLoaded', createParticleSystem);

// Add progress indicators for sections
function updateSectionProgress() {
    const sections = ['intro', 'trap', 'agency', 'math', 'system'];
    const scrollTop = window.pageYOffset;
    
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollTop >= sectionTop - 100 && scrollTop < sectionBottom - 100) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateSectionProgress);

// Add active state styles for navigation
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #6366f1 !important;
        font-weight: 600;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(navStyle);

// Add loading animation for visualizations
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="flex items-center justify-center h-full">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        `;
    }
}

// Add error handling for visualizations
function handleVisualizationError(containerId, error) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="flex items-center justify-center h-full text-gray-500">
                <div class="text-center">
                    <div class="text-4xl mb-2">📊</div>
                    <p>Визуализация временно недоступна</p>
                </div>
            </div>
        `;
        console.error(`Visualization error for ${containerId}:`, error);
    }
}

// Enhanced error handling for Plotly
window.addEventListener('error', function(e) {
    if (e.error && e.error.message && e.error.message.includes('Plotly')) {
        console.warn('Plotly error detected, attempting fallback visualization');
        // Could implement fallback visualizations here
    }
});

// Expandable cards functionality
function initExpandableCards() {
    // Add click handlers for expandable cards
    document.querySelectorAll('.expandable-card').forEach(card => {
        // Don't add click handler if it already has one (from inline onclick)
        if (!card.hasAttribute('onclick')) {
            card.addEventListener('click', function() {
                toggleExpand(this);
            });
        }
    });
}

function toggleExpand(element) {
    const content = element.querySelector('.expandable-content');
    const button = element.querySelector('.expand-button');
    
    if (content && button) {
        if (content.classList.contains('expanded')) {
            content.classList.remove('expanded');
            button.textContent = 'Развернуть';
        } else {
            content.classList.add('expanded');
            button.textContent = 'Свернуть';
        }
    }
}

// Tooltip functionality
function initTooltips() {
    // Add tooltips to key terms
    const terms = [
        { selector: '.tooltip-agency', text: 'Способность действовать самостоятельно, влиять на мир и достигать целей' },
        { selector: '.tooltip-emergence', text: 'Появление сложных свойств системы из простых правил взаимодействия элементов' },
        { selector: '.tooltip-hypergraph', text: 'Обобщение графа, где ребра могут соединять более двух вершин' },
        { selector: '.tooltip-markov', text: 'Случайный процесс, где будущее состояние зависит только от текущего' },
        { selector: '.tooltip-synergy', text: 'Эффект, когда совместная работа даёт результат больший, чем сумма индивидуальных усилий' }
    ];
    
    terms.forEach(term => {
        document.querySelectorAll(term.selector).forEach(element => {
            element.classList.add('tooltip');
            element.setAttribute('data-tooltip', term.text);
        });
    });
}

// Citation modal functionality
function showCitation(citationId) {
    const citations = {
        'sweden-2023': {
            title: 'Шведская королевская академия наук (2023)',
            content: `
                <p class="mb-4">Исследование группы ученых из Шведской королевской академии наук, опубликованное в 2023 году, 
                выявило 14 ключевых эволюционных ловушек, в которых оказалось человечество.</p>
                <p class="mb-4"><strong>Ключевые выводы:</strong></p>
                <ul class="list-disc list-inside space-y-2 mb-4">
                    <li>12 из 14 ловушек находятся в критической стадии</li>
                    <li>Большинство проблем взаимосвязаны и усиливают друг друга</li>
                    <li>Необходима радикальная трансформация подходов к решению</li>
                </ul>
                <p>Это исследование стало основой для концепции "поликризиса" - системы переплетённых глобальных проблем.</p>
            `
        }
    };
    
    const citation = citations[citationId];
    if (!citation) return;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('citation-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'citation-modal';
        modal.className = 'fixed inset-0 bg-black/80 z-50 hidden items-center justify-center p-6';
        modal.innerHTML = `
            <div class="max-w-3xl w-full bg-white rounded-3xl p-8 relative">
                <button onclick="closeModal('citation-modal')" class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl">×</button>
                <div id="citation-modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update content
    const contentDiv = document.getElementById('citation-modal-content');
    contentDiv.innerHTML = `
        <h2 class="serif text-2xl font-bold mb-6 text-gray-900">${citation.title}</h2>
        <div class="text-gray-700 leading-relaxed">${citation.content}</div>
        <div class="mt-6 text-center">
            <button onclick="closeModal('citation-modal')" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Закрыть
            </button>
        </div>
    `;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

console.log('Mathematics of Collective Mind - Interactive visualization loaded successfully!');
