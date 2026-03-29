/**
 * How It Works Page Logic
 */

const contexts = {
    'Smart Cities': {
        icon: 'building-2',
        title: "Urban Integration",
        benefit: "Reduces collection costs by 40% through optimized routing based on real-time bin capacity data."
    },
    'Industries': {
        icon: 'factory',
        title: "Industrial Efficiency",
        benefit: "Ensures hazardous waste is detected and separated immediately, maintaining strict safety compliance."
    },
    'Hospitals': {
        icon: 'hospital',
        title: "Medical Safety",
        benefit: "Automates the sorting of non-infectious waste, reducing human exposure to potentially contaminated materials."
    },
    'Rural Areas': {
        icon: 'tree-pine',
        title: "Rural Sustainability",
        benefit: "Low-power design allows for solar-powered operation in remote areas with minimal infrastructure."
    },
    'Campuses': {
        icon: 'graduation-cap',
        title: "Educational Hubs",
        benefit: "Promotes environmental awareness among students while keeping large campus grounds clean and organized."
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const params = getUrlParams();
    const context = params.context || 'Smart Cities';
    
    updateContext(context);
});

function updateContext(contextName) {
    const context = contexts[contextName] || contexts['Smart Cities'];
    
    // Update context name
    document.getElementById('context-name').textContent = contextName;
    
    // Update highlight box
    const highlight = document.getElementById('context-highlight');
    const iconEl = highlight.querySelector('i');
    iconEl.setAttribute('data-lucide', context.icon);
    
    document.getElementById('context-title').textContent = context.title;
    document.getElementById('context-benefit').textContent = context.benefit;
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}
