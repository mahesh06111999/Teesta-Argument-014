let cart = JSON.parse(localStorage.getItem('user'));
let user = JSON.parse(localStorage.getItem('user')) || {};
if (user && user.isloggedin) {
  const status = document.querySelector('[href="signinup.html"]');
  status.textContent = 'Sign Out.';
} else {
  const status = document.querySelector('[href="signinup.html"]');
  status.textContent = 'Sign In.';
}
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
    let itemFoundInCart = false;

    cart.cart.forEach((item2, index) => {
      if (item.id === item2.id) {
        cart.wishlist.push(item);
        cart.cart.splice(index, 1);
        localStorage.setItem('user', JSON.stringify(cart));
        itemFoundInCart = true;
      }
    });

    if (!itemFoundInCart) {
      cart.wishlist.push(item);
      localStorage.setItem('user', JSON.stringify(cart));
    }

    updater(cart);
  });

  a2.addEventListener('click', () => {
    let newcart = cart.cart.filter((item1) => {
      if (item1.id != item.id) {
        return item;
      }
    });

    cart.cart = newcart;
    localStorage.setItem('user', JSON.stringify(cart));
    updater(cart);
  });
  return div;
}

let sum = 0;

cart.cart.forEach((element) => {
  sum += element.price;
  cartcontent.append(cartcard(element));
});

document.getElementById('subtotal').innerText = '₹ ' + sum;
document.getElementById('estimatedtotal').innerText = '₹ ' + sum;

let btncheckout = document.getElementById('btncheckout');
btncheckout.addEventListener('click', () => {
  alert('Order placed sucessfully');
  cart.cart = [];
  localStorage.setItem('user', JSON.stringify(cart));
  updater(cart);
});

async function updater(user1) {
  try {
    let res = await fetch(`http://localhost:3000/users/${user1.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user1),
    });
    let data = await res.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
