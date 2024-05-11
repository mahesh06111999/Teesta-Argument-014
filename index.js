let finaldata = JSON.parse(localStorage.getItem('products')) || [];
let user = JSON.parse(localStorage.getItem('user')) || {};
let arr;
let filtervalue = localStorage.getItem('filtered');

if (user && user.isloggedin) {
  const status = document.querySelector('[href="signinup.html"]');
  status.textContent = 'Sign Out.';
  status.innerText === 'Sign Out.' &&
    status.addEventListener('click', () => {
      localStorage.removeItem('user');
      status.textContent = 'Sign In.';
    });
} else {
  const status = document.querySelector('[href="signinup.html"]');
  status.textContent = 'Sign In.';
}

async function fetchProducts(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    display(data);
    finaldata = data;
    arr = data;
    localStorage.setItem('products', JSON.stringify(data));
    if (filtervalue) {
      displayCards(filtervalue);
      localStorage.setItem('filtervalue', '');
    }
  } catch (error) {
    console.log(error);
  }
}

let matotalvalue = document.getElementById('matotalvalue');
function display(data) {
  matotalvalue.innerHTML = `<p>${data.length} Items</p>`;
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
  div.addEventListener('click', () => {
    localStorage.setItem('clickeditem', JSON.stringify(item));
    window.location.href = 'productdisplay.html';
  });
  return div;
}

function displayCards(val) {
  console.log('first');
  let arr1;
  if (val === 'new') {
    arr1 = arr.filter((ele) => {
      if (ele.new == 'true') {
        return true;
      }
    });
    console.log(arr1, val);
    display(arr1);
  } else {
    arr1 = arr.filter((ele) => {
      if (ele.category == val) {
        return true;
      }
    });
    console.log(arr1, val);
    display(arr1);
  }
  localStorage.setItem('pagearr', JSON.stringify(arr1));
}

let designers = finaldata.map((item) => {
  return item.designer;
});
let finaldesigners = [...new Set(designers)];

let selection = document.getElementById('selection');
finaldesigners.sort((a, b) => {
  return a - b;
});

finaldesigners.forEach((ele) => {
  let option = document.createElement('option');
  option.className = 'optionfont';
  option.value = ele;
  option.textContent = ele.toUpperCase();
  selection.appendChild(option);
});

selection.addEventListener('change', (e) => {
  console.log(e);
  console.log(selection.value);

  let ans1 = finaldata.filter((ele) => {
    return ele.designer == selection.value;
  });
  display(ans1);
});

let sorter1 = document.getElementById('sorter');

sorter1.addEventListener('change', () => {
  let pagearr = JSON.parse(localStorage.getItem('pagearr'));

  // pagearr = pagearr.map((item) => {
  //   let price = item.price.replace('₹', '').replace(',', '');
  //   return { ...item, price: parseInt(price) };
  // });
  if (sorter1.value == 'low') {
    pagearr.sort((a, b) => {
      return a.price - b.price;
    });
    display(pagearr);
  } else if (sorter1.value == 'high') {
    pagearr.sort((a, b) => {
      return b.price - a.price;
    });
    display(pagearr);
  } else if (sorter1.value == 'designer') {
    pagearr.sort((a, b) => {
      return a.designer.localeCompare(b.designer);
    });
    display(pagearr);
  }
});

let searchname = document.getElementById('searchname');
let searchbutton = document.getElementById('searchbutton');

searchbutton.addEventListener('click', (e) => {
  e.preventDefault();
  let value = searchname.value;
  console.log(value);
  let ans1 = finaldata.filter((ele) => {
    return ele.title.toLowerCase().includes(value);
  });
  display(ans1);
  searchname.value = '';
});
