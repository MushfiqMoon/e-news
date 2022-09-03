const loadNewsCat = () => {

    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => displayNewsMenu(data.data.news_category))
        .catch(error => console.log(error))
}

loadNewsCat()

const displayNewsMenu = newsCat => {

    const allMenu = document.getElementById('main-menu')

    newsCat.forEach(menu => {
        // console.log(menu);
        const menuItem = document.createElement('li')
        menuItem.classList.add('nav-item')
        menuItem.innerHTML = `
        <button onclick="loadNews(${menu.category_id},'${menu.category_name}')" class="nav-link link-dark">${menu.category_name}</button>
        `
        allMenu.appendChild(menuItem)

    });

}


const loadNews = (id, name) => {
    toggolLoader(true)
    console.log('cntry id', id);

    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`

    const nfCat = document.getElementById('nf-cat')
    nfCat.innerText = `${name}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))

}

const displayNews = (an) => {
    // console.log(an.length);
    const nfAmount = document.getElementById('nf-amount')
    nfAmount.innerText = `${an.length}`

    const allNews = document.getElementById('all-news')
    allNews.innerHTML = ""

    console.log('niside news', an.length);
    if (an.length > 0) {
        an.map(news => {
            console.log(news?.author?.published_date);




            const article = document.createElement('div')
            article.classList.add('card')
            article.classList.add('my-3')

            article.innerHTML = `

                <div class="row g-0">
                    <div class="col-md-3 p-3">
                        <img src="${news?.thumbnail_url ? news?.thumbnail_url : "No Image Found"}" alt="${news.title}">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body p-5 ps-1">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 300)}...</p>                           
                            
                            <div class="d-flex justify-content-between align-items-center mt-5">
                                <div class="d-flex">
                                    <img src="${news?.author ? news?.author?.img : "https://avatars.githubusercontent.com/u/28301945?s=40&v=4"}" alt=""
                                        class="rounded-circle border border-5 mt-2" width="50" height="50">
                                    <div class="ps-3 mt-2">
                                        <p class="ps-1">${(news?.author?.name !== null && news?.author?.name !== '') ? news?.author?.name : '<span class="text-danger"> No author Found </span>'}
                                            <br>
                                           ${(news?.author?.published_date !== null) ? news?.author?.published_date.split(" ")[0] : '<span class="text-danger"> No Date Found </span>'}
                                        </p>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center"><i class="fa-regular fa-eye pe-2"></i>${news?.total_view ? news?.total_view : '<span class="text-danger">No View Yet</span>'}</div>
                                <div>Rating</div>
                                <div class="pe-5"><button class="no-style-btn" onclick="loadSingleNews('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button> </div>
                            </div>
                        </div>
                    </div>
                </div>

            `

            allNews.appendChild(article)
            toggolLoader(false)
        });
    } else {
        const article = document.createElement('div')
        article.innerHTML = `

            <div class="alert alert-danger" role="alert">
                No News Found iside this catagory
            </div>
        `
        allNews.appendChild(article)
    }

}


const loadSingleNews = newId => {

    const url = `https://openapi.programming-hero.com/api/news/${newId}`
    // const url = `https://openapi.programming-hero.com/api/news/2e78e5e0310c2e9adbb6efb1a263e745`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleNews(data.data[0]))
        .catch(error => console.log(error))

}

const displaySingleNews = newsData => {
    console.log('cntry id', newsData);

    const modalContent = document.getElementById('modal-body')

    modalContent.innerHTML = `
    <button type="button" class="btn-close float-end" data-bs-dismiss="modal"
        aria-label="Close"></button>
    <br>
    <img src="${newsData?.image_url}" alt="" class="img-fluid">
    <h2 class="mt-3">${newsData?.title}</h2>
    <p>${newsData?.details}</p>

    <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
            <img src="${newsData?.author ? newsData?.author?.img : "https://avatars.githubusercontent.com/u/28301945?s=40&v=4"}" alt=""
                class="rounded-circle border border-5 mt-2" width="50" height="50">
            <div class="ps-3 mt-2">
                <p class="ps-1">
                ${(newsData?.author?.name !== null && newsData?.author?.name !== '') ? newsData?.author?.name : '<span class="text-danger"> No author Found </span>'}
                    <br>
                    ${(newsData?.author?.published_date !== null) ? newsData?.author?.published_date.split(" ")[0] : '<span class="text-danger"> No Date Found </span>'}
                </p>
            </div>
        </div>
        <div class="d-flex align-items-center"><i class="fa-regular fa-eye pe-2"></i>${newsData?.total_view ? newsData?.total_view : '<span class="text-danger">No View Yet</span>'}</div>
        <div class="pe-5">Rating</div>
    </div>
                    
    `

}

// Loader JS

const toggolLoader = isLoading => {
    const loader = document.getElementById('loader')
    if (isLoading) {
        loader.classList.remove('d-none')
    }else{
        loader.classList.add('d-none')
    }
}


// ${newsData?.author.name ? newsData?.author?.name : 'No author Found'}

// ${(newsData?.author?.name.length === 0) ? 'true' : 'felse' }
// ${(newsData?.author?.name === null ) ? 'true' : 'felse' }

// ${newsData?.author?.published_date ? newsData?.author?.published_date : '<span> No published date Found </span>' }


// ${dateonly ? dateonly[0] : 'No Date Found'}

// Tucker Carlson: Putin Winning in Ukraine, Biden Hurting West