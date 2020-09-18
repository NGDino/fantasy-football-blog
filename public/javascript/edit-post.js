
async function editFormHandler(event) {
    event.preventDefault();

    //grab post id with URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      const title = document.querySelector('.post-title').value;
      const post_text = document.querySelector('.post-text').value;
      console.log('posttext', post_text)

      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          post_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(response.ok){
        document.location.replace('/dashboard');
      }else{
        alert(respons.statusText);
    };
  
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);