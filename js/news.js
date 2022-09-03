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
        catagoryUl.innerHTML = `
        <li class="nav-item"> <button onclick="loadNews(${element.category_id.category_id})" type="button" class="btn fw-bold">${element.category_name}</button></li>`;
        catagoryContainer.appendChild(catagoryUl);
    });
}
loadAllNewsCatargory();

const loadNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/category/01`

    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    // console.log(data);

}


const displayNews = news => {
    const newsCardContainer = document.getElementById('cards-container');
    // news.forEach(info => {
    //     console.log(info);
    for (const info of news) {
        // console.log(info);
        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('mb-3');
        newsCard.innerHTML = `
        <div class="row g-0">
                <div class="col-md-4">
                    <img src="${info.image_url}" class="img-fluid rounded-start p-1" alt="...">
                </div>
                 <div class="col-md-8">
                     <div class="card-body">
                        <h5 class="card-title">${info.title}</h5>
                         <p class="card-text">${info.details.slice(0, 220)}...</p>
                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-between">
                         <div>
                          <img src="${info.author.img}" class="rounded-start" alt="..." style="height: 50px;">
                         </div>
                         <div class="px-3">
                           <p> ${info.author.name}</p>
                           <p>${info.author.published_date}</p>
                         </div>
                        </div>
                         <div>
                         <p><i class="fa-solid fa-eye"></i> ${info.total_view}</p>
                         </div>
                         <div class="d-flex justify-content-between">
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star-half-stroke"></i></p>

                         </div>
                         <div>
                         <button><i class="fa-solid fa-arrow-right"></i></button>
                         </div>

                         </div>
                      </div>
                 </div>
                 </div>
        `;
        newsCardContainer.appendChild(newsCard);
    }
}

loadNews();
// loadAllNewsCatargory();