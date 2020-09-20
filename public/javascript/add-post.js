const showForm =(event)  => {
    event.preventDefault();
    var form = document.querySelector('.new-post');
    form.classList.remove('hide')
}

async function newPostHandler(event){
    console.log('button pressed')
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const post_text = document.querySelector('#post-text').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if(response.ok){
        document.location.reload();
    }else{
        alert(response.statusText);
    }
};

document.querySelector('.new-post').addEventListener('submit',( newPostHandler)
)
document.querySelector('#create-new').addEventListener('click', showForm);