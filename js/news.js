const loadAllNewsCatargory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    displayAllNewsCatargory(data.data.news_category);
}
const displayAllNewsCatargory = catagories => {
    const catagoryContainer = document.getElementById('catagory-container');
    catagories.forEach(element => {
        const catagoryUl = document.createElement('ul');
        catagoryUl.classList.add('nav');
        catagoryUl.innerHTML = `<li class="nav-item"> <button type="button" class="btn">${element.category_name}</button></li>`
        catagoryContainer.appendChild(catagoryUl);


    });
}

loadAllNewsCatargory();