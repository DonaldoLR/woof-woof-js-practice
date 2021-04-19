// STEP 2: ADD PUPS TO DOG BAR
fetch(`http://localhost:3000/pups`)
.then(res => res.json())
.then(data => {
    displayDogNames(data);
    addListenerToDogSpans(data)
    
})

function displayDogNames(data){
    data.forEach(dog => {
        const dogName = dog.name;
        const createSpan = document.createElement('span');
        createSpan.innerText = dogName;

        document.getElementById('dog-bar').appendChild(createSpan);
    });
    
}

// STEP 3: SHOW MORE INFO ABOUT EACH PUP
function addListenerToDogSpans(data){
    const arrayOfDogSpans = Array.from(document.getElementsByTagName('span'));
   

    for (let i = 0; data.length > i; i++) {
        const dogInfoDiv = document.getElementById('dog-info');
        const dogName = data[i].name;
        const dogImg = data[i].image;
        let isDogGood = data[i].isGoodDog;
        const dogId = data[i].id;

        arrayOfDogSpans[i].addEventListener('click', (e) => {
            e.stopPropagation()
            e.preventDefault();
            dogInfoDiv.innerHTML = '';

            const createImg = document.createElement('img');
            createImg.setAttribute('src', dogImg)

            const createH2 = document.createElement('h2');
            createH2.innerText = dogName;

            const createButton = document.createElement('button');
            createButton.setAttribute('id', 'behaved-status')
            if (isDogGood === true){
                createButton.classList.add('good-dog');
                createButton.innerText = `Good Dog!`
            } else if (isDogGood === false){
                createButton.classList.add('bad-dog');
                createButton.innerText = `Bad Dog!`
            }
            
            dogInfoDiv.appendChild(createImg);
            dogInfoDiv.appendChild(createH2);
            dogInfoDiv.appendChild(createButton);
            
            changeStatus(dogId, dogName, dogImg, isDogGood)
            
        })
    }

   
}

//STEP 4: TOGGLE GOOD DOG
function changeStatus(dogId, dogName, dogImg, isDogGood){
    const dogButton = document.getElementById('behaved-status');
    dogButton.addEventListener('click', e => {
        e.preventDefault();
        if (isDogGood === true){
            dogButton.innerText = 'Bad Dog!'
            isDogGood = false;
        } else if (isDogGood === false){
            dogButton.innerText = 'Good Dog!'
            isDogGood = true;
        }
        
        fetch(`http://localhost:3000/pups/${dogId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: isDogGood
            }) 
        })
        
    })
}
