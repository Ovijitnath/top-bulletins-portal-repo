const loadAllNewsCatargory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    displayAllNewsCatargory(data.data.news_category);
}
const displayAllNewsCatargory = catagories => {
    const catagoryContainer = document.getElementById('catagory-container');
    catagoryContainer.innerHTML = ``;
    catagories.forEach(element => {
        const catagoryUl = document.createElement('ul');
        catagoryUl.classList.add('nav');
        catagoryUl.innerHTML = `
        <li class="nav-item"> <a onclick="loadNews(${element.category_id})" type="button" class="btn fw-bold">${element.category_name}</a></li>`;

        catagoryContainer.appendChild(catagoryUl);
    });

}
// loadAllNewsCatargory();

const loadNews = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    toggleSpinners(true);
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
    // console.log(data.data);

}


const displayNews = async news => {
    const newsCardContainer = document.getElementById('cards-container');
    newsCardContainer.innerHTML = ``;
    const noNewsFound = document.getElementById('no-news-found');
    if (news.length === 0) {
        noNewsFound.classList.remove('d-none')
        alert('On process!Please visit this section later.')
    }
    else {
        noNewsFound.classList.add('d-none')
    }
    for (const info of news) {
        // console.log(info);

        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('mb-3');
        newsCard.innerHTML = `
        <div class="row g-0 shadow p-3 mb-5 bg-body rounded">
                <div class="col-md-4">
                    <img src="${info.image_url}" class="img-fluid rounded-start p-1" alt="...">
                </div>
                 <div class="col-md-8">
                     <div class="card-body">
                        <h5 class="card-title">${info.title}</h5>
                         <p class="card-text">${info.details.slice(0, 270)}...</p>
                        <div class="d-flex justify-content-between">
                        <div class="d-flex justify-content-between">
                         <div>
                          <img src="${info.author.img}" class="rounded-circle" alt="..." style="height: 50px;">
                         </div>
                         <div class="px-2">
                           <p> ${info.author.name ? info.author.name : "No names found!"}</p>
                           <p>${info.author.published_date ? info.author.published_date.slice(0, 10) : "Not Publised yet!"}</p>
                         </div>
                        </div>
                         <div>
                         <p><i class="fa-solid fa-eye"></i> ${info.total_view ? info.total_view : "No views!"}</p>
                         </div>
                         <div class="d-flex justify-content-between">
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star"></i></p>
                         <p><i class="fa-solid fa-star-half-stroke"></i></p>

                         </div>
                         <div>
                         <a class="text-info"><i class="fa-solid fa-arrow-right-long"></i></a>
                         </div>

                         </div>
                      </div>
                 </div>
                 </div>
        `;
        newsCardContainer.appendChild(newsCard);
    }
    toggleSpinners(false);
}

const toggleSpinners = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// loadNews();
loadAllNewsCatargory();
