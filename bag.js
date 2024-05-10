let cart = JSON.parse(localStorage.getItem('user'));

let cartcontent = document.getElementById('Rcontainer-1');

document.getElementById(
  'count'
).innerHTML = `<h5>SHOPPING BAG (${cart.cart.length})</h5>`;

function cartcard(item) {
  let div = document.createElement('div');
  div.className = 'divbox1';
  let image = document.createElement('img');
  image.className = 'images';
  let title = document.createElement('h4');
  let a1 = document.createElement('a');
  let a2 = document.createElement('a');
  let price = document.createElement('p');
  let div2 = document.createElement('div');
  div2.className = 'divbox2';

  image.setAttribute('src', item.image);
  title.innerText = item.title;
  a1.innerText = 'Move to Wish List';
  a1.setAttribute('id', 'mwl');
  a2.setAttribute('id', 'remove');
  a2.innerText = 'Remove';
  price.innerText = '₹' + item.price;
  div2.append(a1, a2);
  div.append(image, title, div2, price);

  a1.addEventListener('click', () => {
    console.log(item);
  });
  a2.addEventListener('click', () => {
    console.log(item);
  });
  return div;
}
let sum = 0;

cart.cart.forEach((element) => {
  sum += element.price;
  cartcontent.append(cartcard(element));
});

document.getElementById('subtotal').innerText = sum;
document.getElementById('estimatedtotal').innerText = sum;

let btncheckout = document.getElementById('btncheckout');
btncheckout.addEventListener('click', () => {});
