document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const changeColorBtn = document.getElementById('changeColorBtn');
    const counterBtn = document.getElementById('counterBtn');
    const counterDisplay = document.getElementById('counter');
    
    // Contador
    let count = 0;
    
    // Alternar entre modo claro e escuro
    let darkMode = false;
    
    // Event listeners
    changeColorBtn.addEventListener('click', function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
        changeColorBtn.textContent = darkMode ? 'Modo Claro' : 'Mudar Cores';
    });
    
    // Contador
    counterBtn.addEventListener('click', function() {
        count++;
        counterDisplay.textContent = count;
        
        // Pequena animação quando o contador aumenta
        counterDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterDisplay.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Easter egg: duplo clique no título muda sua cor
    document.querySelector('h1').addEventListener('dblclick', function() {
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.style.color = randomColor;
    });
});
