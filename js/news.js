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
        catagoryUl.innerHTML = `<li class="nav-item"> <button type="button" class="btn" onclick="loadNews()">${element.category_name}</button></li>`
        catagoryContainer.appendChild(catagoryUl);


    });
}

const loadNews = async id => {
    const url = `https://openapi.programming-hero.com/api/news/{news_id}`

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data[0]._id)
}

const displayNews = news => {
    const newsCard = document.getElementById('');
}


loadAllNewsCatargory();