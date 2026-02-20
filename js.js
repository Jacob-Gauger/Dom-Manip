function showFilter() {
    const filter = document.getElementById('filterContent');
    const form = document.getElementById('newContent');
   
    if (!filter || !form) return;

    if (filter.style.display == 'block' || getComputedStyle(filter).display == 'block') {
        filter.style.display = 'none';
    } 
    else {
        filter.style.display = 'block';
        form.style.display = 'none';
    }
}

function showAddNew() {
    const form = document.getElementById('newContent');
    const filter = document.getElementById('filterContent');

    if (!form || !filter) return;

    if (form.style.display == 'block' || getComputedStyle(form).display == 'block') {
        form.style.display = 'none';
    } 
    else {
        form.style.display = 'block';
        filter.style.display = 'none';
    }
}

function filterArticles() {
    const opinion = document.getElementById('opinionCheckbox')?.checked ?? true;
    const recipe = document.getElementById('recipeCheckbox')?.checked ?? true;
    const update = document.getElementById('updateCheckbox')?.checked ?? true;

    const articles = document.querySelectorAll('#articleList article');

    articles.forEach(a => {
        if (a.classList.contains('opinion')) a.style.display = opinion ? '' : 'none';
        if (a.classList.contains('recipe')) a.style.display = recipe ? '' : 'none';
        if (a.classList.contains('update')) a.style.display = update ? '' : 'none';
    });
}

function addNewArticle() {
    const titleEl = document.getElementById('inputHeader');
    const textEl = document.getElementById('inputArticle');
    
    if (!titleEl || !textEl) return;

    const title = titleEl.value.trim();
    const text = textEl.value.trim();

    let type = '';
    
    if (document.getElementById('opinionRadio')?.checked) type = 'opinion';
    else if (document.getElementById('recipeRadio')?.checked) type = 'recipe';
    else if (document.getElementById('lifeRadio')?.checked) type = 'update';

    if (!title || !text || !type) {
        alert('A required field is missing.');
        return;
    }

    const list = document.getElementById('articleList');
    if (!list) return;

    const count = list.querySelectorAll('article').length;
    const art = document.createElement('article');
    art.className = type;
    art.id = 'a' + (count + 1);

    const span = document.createElement('span');
    span.className = 'marker';
    span.textContent = type.charAt(0).toUpperCase() + type.slice(1);

    const h2 = document.createElement('h2');
    h2.textContent = title;

    const p = document.createElement('p');
    p.textContent = text;

    const p2 = document.createElement('p');
    const a = document.createElement('a');
    a.href = 'moreDetails.html';
    a.textContent = 'Read more...';
    p2.appendChild(a);

    art.appendChild(span);
    art.appendChild(h2);
    art.appendChild(p);
    art.appendChild(p2);

    list.appendChild(art);

    titleEl.value = '';
    textEl.value = '';
    const radios = document.querySelectorAll('input[name="articleType"]');
    radios.forEach(r => r.checked = false);

    filterArticles();
}

window.addEventListener('DOMContentLoaded', () => {
    const opinionCb = document.getElementById('opinionCheckbox');
    const recipeCb = document.getElementById('recipeCheckbox');
    const updateCb = document.getElementById('updateCheckbox');

    if (opinionCb) opinionCb.addEventListener('change', filterArticles);
    if (recipeCb) recipeCb.addEventListener('change', filterArticles);
    if (updateCb) updateCb.addEventListener('change', filterArticles);

    filterArticles();
});
