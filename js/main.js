const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const popup = document.querySelector('.popup');

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class ProductItemBasket {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }

    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc-basket">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <p>Количество: ${this.quantity}</p>
                    <button class="add-basket">+</button>
                </div>
            </div>`
    }

    addCount(){
        let buttonAdd = document.querySelector('.add-basket');
        buttonAdd.addEventListener('click', () => parent.id+= 1 );
    }
}

class Basket{
    constructor(container = '.popup'){
        this.container = container;
        this.productFromBasket = [];
        this.allProductsFromBasket = [];
        this._getProductsFromBasket()
            .then(res => { //data - объект js
                console.log(res);
                this.productFromBasket = res.contents;
                console.log(this.productFromBasket)
                this.render()
            });
}


_getProductsFromBasket(){
  return fetch(`${API}/getBasket.json`)
 .then(res => res.json())
 .catch(err => console.log(err))
}

render(){
    const block = document.querySelector('.popup__body')
     for (let product of this.productFromBasket){
            const productObjBasket = new ProductItemBasket(product);
            this.allProductsFromBasket.push(productObjBasket);
            block.insertAdjacentHTML('beforeend', productObjBasket.render());
     }
}
}


let basketButton = document.querySelector('.btn-cart');
basketButton.addEventListener('click', () => {popup.classList.toggle('ds-none')});

// document.body.addEventListener('click', (event) => {
//     if(!event.target.classList.contains('popup') && !event.target.parent.contains('popup')){
//         popup.classList.toggle('ds-none')
//     }
// });

let btnClose = document.querySelector('.popup__close');
btnClose.addEventListener('click', () => popup.classList.toggle('ds-none'));


let list = new ProductsList();
let list2 = new Basket();

let b;

