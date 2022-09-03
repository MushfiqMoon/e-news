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
        <button onclick="getnews(${menu.category_id})" class="nav-link link-dark">${menu.category_name}</button>
        `
        allMenu.appendChild(menuItem)
    });

    menu.createElement
}


const getnews = id => {
    console.log('cntry id', id);
}


