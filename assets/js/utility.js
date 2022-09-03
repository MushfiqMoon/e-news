console.log('utiliry js');

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
                            <p class="card-text">${news.details}</p>
                            <div class="d-flex justify-content-between">
                                <div>Author</div>
                                <div><i class="fa-regular fa-eye"></i> ${news?.total_view ? news?.total_view : 'No View Yet'}</div>
                                <div>Rating</div>
                                <div><button onclick="loadSingleNews('${news._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button> </div>
                            </div>
                        </div>
                    </div>
                </div>

            `
            allNews.appendChild(article)
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
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleNews(data.data[0]))
        .catch(error => console.log(error))

}

const displaySingleNews = newsData => {
    console.log('cntry id', newsData);

    const modalContent = document.getElementById('modal-body')
}
