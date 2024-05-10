let wishlist = document.getElementById('wishlist');
let wishcontainer = document.getElementById('wishcontainer');
let user = JSON.parse(localStorage.getItem('user'));
let mydesigners = document.getElementById('mydesigners');

function cardCreater(item) {
  let div = document.createElement('div');
  div.className = 'cardstyle';
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
  div.append(image, designer, title, price);
  div.addEventListener('click', () => {
    localStorage.setItem('clickeditem', JSON.stringify(item));
    window.location.href = 'productdisplay.html';
  });
  return div;
}
console.log(user);
wishlist.addEventListener('click', () => {
  wishcontainer.innerHTML = '';
  user.wishlist.forEach((item) => {
    wishcontainer.append(cardCreater(item));
  });
});

let finaldata = JSON.parse(localStorage.getItem('products'));

mydesigners.addEventListener('click', () => {
  console.log('clicked');
  let ans = [];
  user.mydesigners.forEach((item) => {
    ans = ans.concat(
      finaldata.filter((ele) => {
        return ele.designer.toLowerCase().includes(item.toLowerCase());
      })
    );
  });
  wishcontainer.innerHTML = '';
  ans.forEach((item) => {
    wishcontainer.append(cardCreater(item));
  });
  console.log(ans);
});
