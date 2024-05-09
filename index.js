let finaldata = JSON.parse(localStorage.getItem('products')) || [];

async function fetchProducts(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    display(data);
    finaldata = data;
    localStorage.setItem('products', JSON.stringify(finaldata));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function display(data) {
  macardbox.innerHTML = '';
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
  // div.addEventListener('click', productpage);
  return div;
}

function displayCards(val) {
  if (val === 'new') {
    let arr1 = arr.filter((ele) => {
      if (ele.new === 'true') {
        return true;
      }
    });
    display(arr1);
    console.log(arr1);
  } else {
    let arr1 = arr.filter((ele) => {
      if (ele.category == val) {
        return true;
      }
    });
    display(arr1);
    console.log(arr1);
  }
}

let designers = finaldata.map((item) => {
  return item.designer;
});
let finaldesigners = [...new Set(designers)];

let selection = document.getElementById('selection');
finaldesigners.forEach((ele) => {
  let option = document.createElement('option');
  option.value = ele;
  option.textContent = ele;
  selection.appendChild(option);
});
