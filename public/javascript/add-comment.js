const showForm = (event) => {
    event.preventDefault();
    var form = document.querySelector('.new-comment');
    form.classList.remove('hide')
}

async function addCommentHandler(event) {

    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const comment_text = document.querySelector('#comment-words').value;
    console.log('buttonnalknjfolk', post_id, comment_text)
    //

    if (comment_text){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text,
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
    
}

document.querySelector('#add-comment').addEventListener('click', showForm);

document.querySelector('.new-comment').addEventListener('submit', addCommentHandler);