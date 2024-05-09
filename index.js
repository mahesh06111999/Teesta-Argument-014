let arr;
async function fetchProducts(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    // array = [...data];
    // data.forEach((i) => {
    //   arr.push(i);
    // });
    arr = data;
    display(data);
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
console.log(arr);
// setTimeout(() => {
//   console.log(arr);
// }, 2000);

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
    let arr1 = arr.filter((ele) => {
      if (ele.val == true) {
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

  // arr.forEach((item) => {
  //   macardbox.append(cardCreater(item));
  // });
}
