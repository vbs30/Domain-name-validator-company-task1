
let add = document.querySelector('#add')
let input = document.getElementById('domainInput')
let msgBox = document.getElementById('msgBox')
const domainList = document.getElementById('displayList')
let existingValues = JSON.parse(localStorage.getItem('Domain names')) || []


input.addEventListener('keyup', (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
        addElement()
    }
})

function addElement() {
    let input = document.getElementById('domainInput')
    let msgBox = document.getElementById('msgBox')
    let domainArray = input.value.split(',').map(value => value.trim())   //values will be stored in array form, spaces will be trimmed
    let pattern = /^[a-zA-z0-9]+\.[a-z]{2,3}$/
    duplicateValues = []
    invalidValue = []
    if (domainArray.length === 1 && domainArray[0] === "") {
        msgBox.innerText = 'Domain name is required'   ///when input value is blank and add button is called 
        msgBox.className = 'error-msg'
        return;
    }
    if (domainArray.length > 5) {
        msgBox.innerText = 'Exceeded maximum allowed domains (5)';      //when domain names values are inputed more than 5
        msgBox.className = 'error-msg';
        return;
    }
    domainArray.forEach(value => {
        //pattern.test() will return true if given value matches with the pattern
        if (pattern.test(value)) {
            //once true, check for conditions: 
            //1. Whether value already exists in localstorage (Duplicate value)
            //2. Whether value is unique
            //3. Whether value is invalid
            if (value && !existingValues.includes(value)) {
                existingValues.push(value)
                msgBox.className = 'msg-box'
                msgBox.innerText = ""
                input.value = ''
                input.className = ""
            }
            else if (value && existingValues.includes(value)) {
                duplicateValues.push(value)
            }
        }
        else {
            invalidValue.push(value)
        }
    })
    //Will check for showing message for input values which are duplicate or invalid or both
    if (duplicateValues.length > 0 && invalidValue.length > 0) {
        msgBox.innerText = 'Duplicate and invalid domain names'
        msgBox.className = 'duplicate-msg'
        input.value = duplicateValues.join(', ') + ', ' + invalidValue.join(', ')
        input.className = ""
    }
    else if (duplicateValues.length > 0) {
        msgBox.innerText = 'Duplicate domain names '
        msgBox.className = 'duplicate-msg'
        input.value = duplicateValues.join(', ')
        input.className = ""
    } else if (invalidValue.length > 0) {
        msgBox.innerText = 'Invalid domain names '
        msgBox.className = 'invalid-msg'
        input.value = invalidValue.join(', ')
        input.className = 'input-validation-error'
    } else {
        input.value = ''
        input.className = ""
    }
    displayValue(existingValues)
}

function addValue(existingValues) {
    let domainList = document.getElementById('displayList')

    existingValues.forEach(value => {
        let li = document.createElement('li');
        li.textContent = value
        let removeButton = document.createElement('button')
        removeButton.textContent = 'Remove'
        removeButton.onclick = () => {
            removeValue(value)
        }
        li.className = 'list-values'
        li.appendChild(removeButton)
        domainList.appendChild(li)
    })
}

//Will remove the element when it's remove button is clicked 
function removeValue(value) {
    existingValues = existingValues.filter(v => v !== value)
    displayValue(existingValues)
}

function displayValue(existingValues) {
    domainList.innerHTML = ''
    addValue(existingValues)
}

//On clear, value in the input field as well as message with it will be cleared
const clear = document.querySelector('#clear');
clear.addEventListener("click", () => {
    document.getElementById('domainInput').value = ""
    msgBox.className = "msg-box"
    input.className = ""
    document.getElementById('msgBox').innerText = ""
})

//On clicking reset, input field, storage will be deleted, new form will be visible
const reset = document.querySelector('#reset')
reset.addEventListener('click', () => {
    existingValues = []
    domainList.innerHTML = ''
    msgBox.className = "msg-box"
    input.className = ""
    document.getElementById('domainInput').value = ""
    document.getElementById('msgBox').innerText = ""
})

//On submit, check for input fields, if input fields empty and saving value also empty, then show error, same goes with input field having values but not added in the storage
function submit() {
    if (existingValues.length === 0 || input.value !== '') {
        msgBox.innerText = 'Add domain name before submitting '
        msgBox.className = 'invalid-msg'
    }
    else {
        localStorage.setItem('Domain names', JSON.stringify(existingValues))
        window.location.href = 'submit.html'
    }
}

//After clicking back button in next pg, isVisited becomes true meaning we haven't reloaded the pg, just clicked back to previous pg
//When changed to false, meaning now you are on the same page, so after reloading we understand that reload has happened and the else part runs

window.addEventListener('load', function () {
    if (localStorage.getItem('isVisited') === 'true') {
        localStorage.setItem('isVisited', 'false')
        this.localStorage.removeItem('Domain names')
        displayValue(existingValues)
    }
    else {
        localStorage.clear()
        existingValues = []
    }
})