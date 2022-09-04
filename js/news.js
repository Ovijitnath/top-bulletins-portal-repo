const loadAllNewsCatargory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayAllNewsCatargory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

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

const loadNews = async (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`
    toggleSpinners(true);
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = async news => {
    const sorting = news.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    const newsCardContainer = document.getElementById('cards-container');
    newsCardContainer.innerHTML = ``;
    const foundItemNumber = document.getElementById('found-items');
    foundItemNumber.innerText = news.length + `  Items Found!`;

    const noNewsFound = document.getElementById('no-news-found');

    if (news.length === 0) {
        noNewsFound.classList.remove('d-none')
    }
    else {
        noNewsFound.classList.add('d-none')
    }

    for (const info of news) {

        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.classList.add('mb-3');
        newsCard.innerHTML = `
        <div class="row g-0 shadow p-3 mb-5 bg-body rounded" onclick="loadNewsDetails('${info._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                         <div class="px-1">
                           <p> ${info.author.name ? info.author.name : "No Name"}</p>
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
                          
                          <p><i class="fa-solid fa-star-half-stroke"></i></p>

                         </div>
                         <div>
                         
                         <button onclick="loadNewsDetails('${info._id}')" type="button" class="btn  text-info fw-semibold" data-bs-toggle="modal" data-bs-target="#exampleModal">More<i class="fa-solid fa-arrow-right-long"></i></button>
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

const loadNewsDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNewsDetails = newsdetails => {

    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = newsdetails.title;
    const newsModalDetails = document.getElementById('newsdetailsModal');
    newsModalDetails.innerHTML = `
    <img src="${newsdetails.image_url ? newsdetails.image_url : "No Data Avilable"}" class="img-fluid rounded-start pb-2" alt="...">
     <p>Details : ${newsdetails.details}</p>
     <p class="fw-bold">Author-Name : ${newsdetails.author.name ? newsdetails.author.name : "No Name"}</p>
     <p class="fw-bold">Total-View : ${newsdetails.total_view ? newsdetails.total_view : "No views!"} <i class="fa-solid fa-eye"></i></p>
    `;

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

loadAllNewsCatargory();
loadNews('1')
