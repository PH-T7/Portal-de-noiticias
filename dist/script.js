"use strict";
document.addEventListener('DOMContentLoaded', function () {
    // Elementos DOM
    const changeColorBtn = document.getElementById('changeColorBtn');
    const newsContainer = document.getElementById('newsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const counterDisplay = document.getElementById('counter');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const breakingText = document.getElementById('breaking-text');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');
    const categoryItems = document.querySelectorAll('.nav-menu li');
    // Estado da aplicação
    let darkMode = false;
    let currentPage = 1;
    let newsPerPage = 6;
    let currentCategory = 'all';
    let newsDisplayed = 0;
    let breakingNewsIndex = 0;
    // Array de notícias de exemplo
    const mockNews = [
        {
            id: 1,
            title: 'Nova pesquisa identifica componente que pode retardar envelhecimento celular',
            excerpt: 'Cientistas da Universidade Federal descobriram um composto que mostrou resultados promissores em testes laboratoriais.',
            category: 'science',
            author: 'Carlos Mendes',
            date: '22 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Ciência',
            favorite: false
        },
        {
            id: 2,
            title: 'Empresa lança smartphone com bateria que dura uma semana',
            excerpt: 'Nova tecnologia de bateria promete revolucionar a duração dos dispositivos móveis com uma única carga.',
            category: 'tech',
            author: 'Ana Soares',
            date: '21 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Tecnologia',
            favorite: false
        },
        {
            id: 3,
            title: 'Estudo revela benefícios da meditação para pacientes com ansiedade',
            excerpt: 'Pesquisa acompanhou 200 pessoas por seis meses e mostrou redução significativa nos sintomas.',
            category: 'health',
            author: 'Paulo Andrade',
            date: '20 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Saúde',
            favorite: false
        },
        {
            id: 4,
            title: 'Congresso aprova nova lei de proteção ambiental',
            excerpt: 'Legislação prevê multas mais severas para crimes ambientais e incentivos para empresas sustentáveis.',
            category: 'politics',
            author: 'Marina Costa',
            date: '19 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Política',
            favorite: false
        },
        {
            id: 5,
            title: 'Brasil conquista três medalhas em competição internacional de natação',
            excerpt: 'Atletas brasileiros se destacaram nas provas de 100m livre, revezamento e borboleta.',
            category: 'sports',
            author: 'Roberto Alves',
            date: '18 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Esportes',
            favorite: false
        },
        {
            id: 6,
            title: 'Pesquisadores desenvolvem tecido inteligente que regula temperatura corporal',
            excerpt: 'Material revolucionário pode ser usado em roupas que se adaptam ao clima automaticamente.',
            category: 'science',
            author: 'Julia Menezes',
            date: '17 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Ciência',
            favorite: false
        },
        {
            id: 7,
            title: 'Nova plataforma de streaming focada em documentários chega ao Brasil',
            excerpt: 'Serviço oferece mais de 5.000 títulos com foco em ciência, história e natureza.',
            category: 'tech',
            author: 'Fernando Castro',
            date: '16 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Tecnologia',
            favorite: false
        },
        {
            id: 8,
            title: 'Descoberta permite diagnóstico precoce de doença cardíaca',
            excerpt: 'Novo método de exame consegue identificar problemas até cinco anos antes dos sintomas aparecerem.',
            category: 'health',
            author: 'Camila Ferreira',
            date: '15 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Saúde',
            favorite: false
        },
        {
            id: 9,
            title: 'Governador anuncia programa de incentivo para pequenas empresas',
            excerpt: 'Iniciativa vai oferecer crédito com juros reduzidos e consultoria gratuita para empreendedores.',
            category: 'politics',
            author: 'Ricardo Gomes',
            date: '14 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Política',
            favorite: false
        },
        {
            id: 10,
            title: 'Time brasileiro de e-sports se classifica para mundial',
            excerpt: 'Equipe superou adversários asiáticos e europeus e agora disputa título inédito para o país.',
            category: 'sports',
            author: 'Luiza Martins',
            date: '13 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Esportes',
            favorite: false
        },
        {
            id: 11,
            title: 'Cientistas brasileiros criam método sustentável para tratamento de água',
            excerpt: 'Tecnologia de baixo custo pode ser implementada em regiões com poucos recursos.',
            category: 'science',
            author: 'Eduardo Lima',
            date: '12 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Ciência',
            favorite: false
        },
        {
            id: 12,
            title: 'Inteligência artificial já é capaz de criar músicas originais',
            excerpt: 'Algoritmos avançados compõem melodias indistinguíveis das criadas por humanos.',
            category: 'tech',
            author: 'Carolina Santos',
            date: '11 Nov 2023',
            image: 'https://via.placeholder.com/300x200?text=Tecnologia',
            favorite: false
        }
    ];
    // Array de notícias de última hora
    const breakingNewsArray = [
        { text: "Cientistas descobrem nova espécie de planta com propriedades medicinais" },
        { text: "Bolsa de valores bate recorde histórico nesta manhã", isImportant: true },
        { text: "Novo tratamento contra câncer mostra 85% de eficácia em testes" },
        { text: "Ministro anuncia pacote de investimentos em infraestrutura" },
        { text: "Tempestade tropical se aproxima da costa; autoridades em alerta", isImportant: true }
    ];
    // Inicialização
    init();
    function init() {
        setDarkModeFromPreference();
        loadNews();
        setupEventListeners();
        startBreakingNewsRotation();
        updateNewsCounter();
    }
    // Controle de modo claro/escuro
    function setDarkModeFromPreference() {
        // Verifica se o usuário já tem uma preferência salva
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode) {
            darkMode = savedDarkMode === 'true';
            updateDarkModeUI();
        }
        else {
            // Verifica a preferência do sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                darkMode = true;
                updateDarkModeUI();
            }
        }
    }
    function updateDarkModeUI() {
        document.body.classList.toggle('dark-mode', darkMode);
        const icon = changeColorBtn.querySelector('i');
        if (icon) {
            icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    function toggleDarkMode() {
        darkMode = !darkMode;
        localStorage.setItem('darkMode', darkMode.toString());
        updateDarkModeUI();
    }
    // Carregamento de notícias
    function loadNews() {
        const startIndex = (currentPage - 1) * newsPerPage;
        const endIndex = startIndex + newsPerPage;
        const filteredNews = currentCategory === 'all'
            ? mockNews
            : mockNews.filter(news => news.category === currentCategory);
        const newsToDisplay = filteredNews.slice(startIndex, endIndex);
        if (newsToDisplay.length === 0 && startIndex === 0) {
            newsContainer.innerHTML = '<p class="no-results">Nenhuma notícia encontrada para esta categoria.</p>';
            loadMoreBtn.style.display = 'none';
            return;
        }
        if (startIndex === 0) {
            newsContainer.innerHTML = '';
        }
        newsToDisplay.forEach(news => {
            const newsCard = createNewsCard(news);
            newsContainer.appendChild(newsCard);
        });
        newsDisplayed += newsToDisplay.length;
        updateNewsCounter();
        // Esconde botão de carregar mais se chegamos ao fim
        if (endIndex >= filteredNews.length) {
            loadMoreBtn.style.display = 'none';
        }
        else {
            loadMoreBtn.style.display = 'block';
        }
    }
    function createNewsCard(news) {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        const bookmarkClass = news.favorite ? 'fas fa-bookmark' : 'far fa-bookmark';
        newsCard.innerHTML = `
            <div class="news-card-image" style="background-image: url('${news.image}')"></div>
            <div class="news-card-content">
                <span class="category ${news.category}">${getCategoryName(news.category)}</span>
                <h3>${news.title}</h3>
                <p class="news-card-meta">Por ${news.author} • ${news.date}</p>
                <p>${news.excerpt}</p>
                <button class="read-more-sm">Leia mais</button>
                <button class="favorite" data-id="${news.id}"><i class="${bookmarkClass}"></i></button>
            </div>
        `;
        // Adicionar event listeners para os botões
        const favoriteBtn = newsCard.querySelector('.favorite');
        favoriteBtn.addEventListener('click', function () {
            toggleFavorite(parseInt(this.dataset.id));
        });
        const readMoreBtn = newsCard.querySelector('.read-more-sm');
        readMoreBtn.addEventListener('click', function () {
            // Simulação de abertura de notícia completa
            alert(`Lendo notícia completa: ${news.title}`);
        });
        return newsCard;
    }
    function getCategoryName(category) {
        const categories = {
            'tech': 'Tecnologia',
            'science': 'Ciência',
            'health': 'Saúde',
            'politics': 'Política',
            'sports': 'Esportes'
        };
        return categories[category] || 'Geral';
    }
    // Favoritos
    function toggleFavorite(newsId) {
        const index = mockNews.findIndex(news => news.id === newsId);
        if (index !== -1) {
            mockNews[index].favorite = !mockNews[index].favorite;
            // Atualiza ícone no DOM
            const favoriteBtn = document.querySelector(`.favorite[data-id="${newsId}"]`);
            if (favoriteBtn) {
                const icon = favoriteBtn.querySelector('i');
                if (mockNews[index].favorite) {
                    icon.className = 'fas fa-bookmark';
                    showToast('Notícia adicionada aos favoritos!');
                }
                else {
                    icon.className = 'far fa-bookmark';
                    showToast('Notícia removida dos favoritos!');
                }
            }
            // Salva favoritos no localStorage
            saveFavorites();
        }
    }
    function saveFavorites() {
        const favorites = mockNews.filter(news => news.favorite).map(news => news.id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    function loadFavorites() {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites);
            favorites.forEach(id => {
                const index = mockNews.findIndex(news => news.id === id);
                if (index !== -1) {
                    mockNews[index].favorite = true;
                }
            });
        }
    }
    // Notícias de última hora
    function startBreakingNewsRotation() {
        // Configura rotação a cada 8 segundos
        setInterval(() => {
            breakingNewsIndex = (breakingNewsIndex + 1) % breakingNewsArray.length;
            updateBreakingNews();
        }, 8000);
        // Configura a primeira notícia
        updateBreakingNews();
    }
    function updateBreakingNews() {
        const news = breakingNewsArray[breakingNewsIndex];
        breakingText.textContent = news.text;
        // Adiciona efeito visual para notícias importantes
        if (news.isImportant) {
            breakingText.classList.add('important');
            // Pisca duas vezes para chamar atenção
            flashBreakingNews();
        }
        else {
            breakingText.classList.remove('important');
        }
    }
    function flashBreakingNews() {
        const container = breakingText.parentElement;
        let count = 0;
        const flash = setInterval(() => {
            container.style.backgroundColor = count % 2 === 0 ? '#ff0000' : '#e74c3c';
            count++;
            if (count > 4) {
                clearInterval(flash);
                container.style.backgroundColor = '';
            }
        }, 200);
    }
    // Pesquisa
    function searchNews(query) {
        if (!query.trim()) {
            // Se a busca estiver vazia, restaura a exibição normal
            currentCategory = 'all';
            currentPage = 1;
            newsDisplayed = 0;
            updateCategorySelection();
            loadNews();
            return;
        }
        const searchResults = mockNews.filter(news => {
            // Busca no título, resumo e autor
            const searchable = `${news.title} ${news.excerpt} ${news.author}`.toLowerCase();
            return searchable.includes(query.toLowerCase());
        });
        newsContainer.innerHTML = '';
        if (searchResults.length === 0) {
            newsContainer.innerHTML = `<p class="no-results">Nenhum resultado encontrado para "${query}"</p>`;
            loadMoreBtn.style.display = 'none';
            newsDisplayed = 0;
            updateNewsCounter();
            return;
        }
        searchResults.slice(0, newsPerPage).forEach(news => {
            const newsCard = createNewsCard(news);
            newsContainer.appendChild(newsCard);
        });
        newsDisplayed = Math.min(searchResults.length, newsPerPage);
        updateNewsCounter();
        if (searchResults.length > newsPerPage) {
            loadMoreBtn.style.display = 'block';
        }
        else {
            loadMoreBtn.style.display = 'none';
        }
        // Mostra uma mensagem com o número de resultados
        showToast(`${searchResults.length} resultados encontrados para "${query}"`);
    }
    // Newsletter
    function subscribeToNewsletter(email) {
        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Por favor, insira um email válido', 'error');
            return;
        }
        // Simulação de inscrição (em um caso real, enviaria para o servidor)
        showToast(`Email ${email} inscrito com sucesso na newsletter!`, 'success');
        // Limpa o campo e salva no localStorage para lembrar o usuário
        newsletterEmail.value = '';
        localStorage.setItem('newsletter_email', email);
    }
    // Utilitários
    function showToast(message, type = 'info') {
        // Cria o elemento toast se ainda não existir
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
            // Adiciona CSS inline para o container de toast
            toastContainer.style.position = 'fixed';
            toastContainer.style.bottom = '20px';
            toastContainer.style.right = '20px';
            toastContainer.style.zIndex = '1000';
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        // Estilo básico para o toast
        toast.style.padding = '12px 20px';
        toast.style.backgroundColor = type === 'success' ? '#2ecc71' :
            type === 'error' ? '#e74c3c' : '#3498db';
        toast.style.color = 'white';
        toast.style.borderRadius = '4px';
        toast.style.marginTop = '10px';
        toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        toast.style.transition = 'transform 0.3s, opacity 0.3s';
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        toastContainer.appendChild(toast);
        // Executa após um pequeno atraso para permitir a animação
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 50);
        // Remove o toast após 4 segundos
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            toast.style.opacity = '0';
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 300);
        }, 4000);
    }
    function updateNewsCounter() {
        counterDisplay.textContent = newsDisplayed.toString();
    }
    function updateCategorySelection() {
        categoryItems.forEach(item => {
            const li = item;
            li.classList.toggle('active', li.dataset.category === currentCategory);
        });
    }
    function setupEventListeners() {
        // Event listener para alternar entre modo claro e escuro
        changeColorBtn.addEventListener('click', toggleDarkMode);
        // Event listener para carregar mais notícias
        loadMoreBtn.addEventListener('click', function () {
            currentPage++;
            loadNews();
        });
        // Event listeners para categorias
        categoryItems.forEach(item => {
            item.addEventListener('click', function (e) {
                const clickedItem = e.currentTarget;
                const category = clickedItem.dataset.category || 'all';
                if (category !== currentCategory) {
                    currentCategory = category;
                    currentPage = 1;
                    newsDisplayed = 0;
                    updateCategorySelection();
                    loadNews();
                }
            });
        });
        // Event listener para busca
        searchBtn.addEventListener('click', function () {
            searchNews(searchInput.value);
        });
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchNews(searchInput.value);
            }
        });
        // Event listener para inscrição na newsletter
        subscribeBtn.addEventListener('click', function () {
            subscribeToNewsletter(newsletterEmail.value);
        });
        // Event listener para o botão de ler mais no artigo principal
        const mainReadMore = document.querySelector('.read-more');
        if (mainReadMore) {
            mainReadMore.addEventListener('click', function () {
                // Simulação de abertura de notícia completa
                alert('Abrindo notícia principal completa');
            });
        }
        // Event listener para o botão favorito no artigo principal
        const mainFavorite = document.querySelector('.favorite[data-id="1"]');
        if (mainFavorite) {
            mainFavorite.addEventListener('click', function () {
                toggleFavorite(parseInt(this.dataset.id));
            });
        }
        // Easter egg: duplo clique no título muda sua cor
        const heading = document.querySelector('h1');
        if (heading) {
            heading.addEventListener('dblclick', function () {
                const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                this.style.color = randomColor;
                showToast('Você descobriu um easter egg!', 'success');
            });
        }
    }
});
//# sourceMappingURL=script.js.map