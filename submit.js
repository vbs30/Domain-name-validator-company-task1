const back = document.querySelector('#backBtn')
let existingValues = JSON.parse(localStorage.getItem('Domain names')) || []

back.addEventListener('click', () => {
    localStorage.setItem("isVisited", "true")
    window.location.href = 'index.html'
})

function addValue(value) {
    let domainList = document.getElementById('list')
    existingValues.forEach(value => {
        let li = document.createElement('li');
        li.textContent = value
        li.className = 'display-list'
        domainList.appendChild(li)
    })
}

function displayValue() {
    const domainList = document.getElementById('list')
    domainList.innerHTML = ''
    addValue(existingValues)
}

window.onload = displayValue