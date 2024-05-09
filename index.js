async function fetchProducts(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    display(data);
  } catch (error) {
    console.log(error);
  }
}

function display(data) {
  data.forEach((item) => {
    macardbox.append(cardCreater(item));
  });
}

fetchProducts('http://localhost:3000/data');

let macardbox = document.getElementById('macardbox');

function cardCreater(item) {
  let div = document.createElement('div');
  div.className = 'cardstyle';
  let image = document.createElement('img');
  let designer = document.createElement('p');
  let title = document.createElement('p');
  let price = document.createElement('p');

  image.setAttribute('src', item.image);
  designer.innerText = item.designer;
  title.innerText = item.title;
  price.innerText = item.price;
  div.append(image, designer, title, price);
  // div.addEventListener('click', productpage);
  return div;
}

function displayCards(val) {
  console.log('clicked');

  if (val == 'new') {
    arr = data.filter((ele) => {
      if (ele.val == true) {
        return true;
      }
    });
  } else {
    arr = data.filter((ele) => {
      if (ele.category == val) {
        return true;
      }
    });
  }
  console.log(arr);
  macardbox.innerHTML = '';
  arr.forEach((item) => {
    macardbox.append(cardCreater(item));
  });
}
