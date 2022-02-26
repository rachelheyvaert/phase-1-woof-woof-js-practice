const dogBar = document.querySelector('#dog-bar')
const dogInfo = document.querySelector('#dog-info')
const btn = document.createElement('button')
document.addEventListener('DOMContentLoaded', () => {
    fetchPupData()
})

function fetchPupData() {
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
        .then(pups => pups.map(pup => pupInfo(pup)))
}

function pupInfo(dog) {
    let span = document.createElement('span')
    span.innerText = dog.name
    dogBar.append(span)
    span.addEventListener('click', () => {
        const dogInfo = document.querySelector('#dog-info')
        dogInfo.innerText = ""
        let img = document.createElement('img')
        img.src = dog.image
        let h2 = document.createElement('h2')
        h2.innerText = dog.name
        dogInfo.append(img, h2, btn)
        handleButton(dog)
    })

}
function handleButton(dog) {
    if (dog.isGoodDog === true) {
        btn.innerText = "Good Dog!"
    } else { btn.textContent = "Bad Dog!" }
}


btn.addEventListener('click', onButtonClick)

function patchRequest(id, newString) {
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: newString
        })
    })
        .then(response => response.json())
}

function onButtonClick(e) {
    let newString;
    if (e.target.innerText.includes('Good')) {
        e.target.innerText = "Bad Dog!"
        newString = false
    } else if (e.target.innerText.includes('Bad')) {
        e.target.innerText = "Good Dog!"
        newString = true
    }
    patchRequest(newString)
}