const form = document.querySelector('.editArticle');

form.addEventListener('submit', event => {
    event.preventDefault();
    let option = {
        cache : 'no-cache', 
        headers : {
            'content-type' : 'application/json'
        },
        method : 'PATCH',
        mode : 'cors',
        redirect : 'follow',
        referrer : 'no-referrer',
        body : JSON.stringify({
            heading : form.heading.value,
            description : form.description.value,
            content : form.content.value
        })
    };
    const id = window.location.pathname.split('/').pop();
    const url = `/rediger_artikel/${id}`;

    fetch(url, option)
    .then(response => {
        if(response.status === 200){
            console.log('yes we can');
            window.location.href = `http://localhost:4040/`
        }else{
            console.log('nej');
        }
    }); 
});