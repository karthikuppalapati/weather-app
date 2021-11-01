console.log('I am working')

const searchForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const msg1 = document.getElementById('msg-1')
const msg2 = document.getElementById('msg-2')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchTerm.value

    msg1.textContent = 'Loading...'
    msg2.textContent = ''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {

        if(data.error){
            msg1.textContent = data.error
            msg2.textContent = ''
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
        })
    })
    console.log('testing')
})