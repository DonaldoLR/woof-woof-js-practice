// STEP 2: ADD PUPS TO DOG BAR
fetch(`http://localhost:3000/pups`)
.then(res => res.json())
.then(data => displayDogNames(data))

function displayDogNames(data){
    data.forEach(dog => {
        const dogName = dog.name;
        const createSpan = document.createElement('span');
        createSpan.innerText = dogName;

        document.getElementById('dog-bar').appendChild(createSpan);
    });
    
}