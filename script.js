let deepDesigner = document.getElementById('deepDesigner');

//display all the designer to the page on loading

async function fetchData(call) {
    if(call>1) return;
    let data = await fetch('http://localhost:3000/designers');
    let designers = await data.json();

    return designers;
}

async function display() {
    if(call > 1) return;
    let designers = await fetchData();
   
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let filteredDesigners = {};

    for (let letter of alphabet) {
        filteredDesigners[letter] = designers.filter(item => item.name && item.name[0].toUpperCase() === letter);

    }

    for(let letter in filteredDesigners) {
        let arr = filteredDesigners[letter];
        // console.log(arr);

        if(arr.length>0) {
            let div = document.createElement('div');
            let h2 = document.createElement('h2');
            h2.innerHTML = letter;
            div.appendChild(h2);

            let div2 = document.createElement('div');
            div2.classList.add('deepContainer');

            for(let i=0; i<arr.length; i++) {
                let p = document.createElement('p');
                let span = document.createElement('span');
                let newtext = document.createTextNode(`${arr[i].name}`);
                p.appendChild(span);
                let ic = document.createElement('i');
                ic.classList.add("fa-regular", "fa-heart");
                span.appendChild(ic);
                p.appendChild(newtext);

                //add eventlistener
                p.addEventListener('click', ()=> {
                    let user = JSON.parse(localStorage.getItem('user'));
                    if(!user.mydesigners.includes(`${arr[i].name}`)){
                        user.mydesigners.push(`${arr[i].name}`);
                        localStorage.setItem('user', JSON.stringify(user));
                        addDesigner(user);
                    }                   
                });
                div2.appendChild(p);
                div.appendChild( div2);
            }
            deepDesigner.appendChild(div);
        }
    }
    // console.log(deepDesigner);

}
let call = 1;


async function addDesigner(user1) {
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


display(1);


