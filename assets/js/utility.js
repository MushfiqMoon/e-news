console.log('utiliry js');

// // fetching category wise data
// function selectedCatagory(el) {

//     console.log(el);

//     const category = el.innerText



// }




// loadAllNews()
// const getNews = categorise => {


//     categorise.map(cat => {

//         const id = cat.category_id
//     })
// }
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
        console.log(menu);
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
    console.log(an.length);
    const allNews = document.getElementById('all-news')

    const nfAmount = document.getElementById('nf-amount')
    nfAmount.innerText = `${an.length}`

    an.map(news => {
        console.log(news);

    });

}

