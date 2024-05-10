let backpage = document.getElementById('backpage');

let page = document.getElementById('ppage');
let item = JSON.parse(localStorage.getItem('clickeditem'));
productPageCreater(item);

function productPageCreater(item) {
  let div = document.createElement('div');
  div.className = 'pcardstyle';
  let div22 = document.createElement('div');
  let image = document.createElement('img');
  let designer = document.createElement('p');
  designer.className = 'maptags';
  let title = document.createElement('p');
  let price = document.createElement('p');
  title.className = 'maptags';
  price.className = 'maptags';

  image.setAttribute('src', item.image);
  designer.innerText = item.designer;
  title.innerText = item.title;
  price.innerText = item.price;

  let div2 = document.createElement('div');
  let btn1 = document.createElement('button');
  btn1.className = 'btn1';
  let btn2 = document.createElement('button');
  btn2.className = 'btn2';
  btn1.innerText = 'ADD TO BAG';
  btn2.innerText = 'Add To Wish List';

  div22.append(designer, title, price, btn1, btn2);
  div.append(image, div22);
  div2.append(div);

  page.append(div2);
}

backpage.addEventListener('click', () => {
  window.location.href = 'new.html';
});
