const body = document.querySelector('body');
const posts = document.createElement('div');
body.appendChild(posts);


const getPosts = () => {


    return fetch('https://calm-wave-71314.herokuapp.com/api/posts', { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            response.forEach(post => {
                if (post.state === 'published') {
                    const postDisplay = document.createElement('div');
                    const postBody = document.createElement('div');
                    const postTitle = document.createElement('h2');
                    postTitle.textContent = post.title;
                    const postText = document.createElement('p');
                    postText.textContent = post.text;
                    const postTimestamp = document.createElement('p');
                    postTimestamp.textContent = post.timestamp;

                    const horizontalLine = document.createElement('hr');
                    
                    posts.appendChild(postDisplay);
                    postDisplay.appendChild(postBody);
                    postBody.appendChild(postTitle);
                    postBody.appendChild(postText);
                    postBody.appendChild(postTimestamp);
                    postBody.appendChild(horizontalLine);

                    
                    //get comments of posts
                    fetch(`https://calm-wave-71314.herokuapp.com/api/posts/${post._id}/comments`, { mode: 'cors' })
                        .then(function (response) {

                            return response.json();
                        })
                        .then(function (response) {
                            
                            const commentDisplay = document.createElement('div');
                            commentDisplay.classList.add('comment');

                            response.forEach(comment => {
                                const commentAuthor = document.createElement('h3');
                                commentAuthor.textContent = comment.name;
                                const commentText = document.createElement('p');
                                commentText.textContent = comment.text;
                                const commentTimestamp = document.createElement('p');
                                commentTimestamp.textContent = comment.timestamp;

                                postDisplay.appendChild(commentDisplay);
                                commentDisplay.appendChild(commentAuthor);
                                commentDisplay.appendChild(commentText);
                                commentDisplay.appendChild(commentTimestamp);
                            });
                            //applay horiontal line after all comments of a post
                            const horizontalLine = document.createElement('hr');
                            commentDisplay.appendChild(horizontalLine);

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    
                    const commentForm = document.createElement('form');
                    const commentFormCTA = document.createElement('h4');
                    commentFormCTA.textContent = 'Post a comment';
                    const commentLabelName = document.createElement('label');
                    commentLabelName.setAttribute('for', 'name');
                    commentLabelName.textContent = 'Name';
                    const commentInputName = document.createElement('input');
                    commentInputName.setAttribute('name', 'name');
                    commentInputName.setAttribute('type', 'text');
                    const commentLabelText = document.createElement('label');
                    commentLabelText.setAttribute('for', 'text');
                    commentLabelText.textContent = 'Text';
                    const commentInputText = document.createElement('input');
                    commentInputText.setAttribute('name', 'text');
                    commentInputText.setAttribute('type', 'text');
                    const commentFormSubmit = document.createElement('input');
                    commentFormSubmit.setAttribute('value', 'Send');
                    commentFormSubmit.setAttribute('type', 'submit');
                        
                    postDisplay.appendChild(commentForm);
                    commentForm.appendChild(commentFormCTA);
                    commentForm.appendChild(commentLabelName);
                    commentForm.appendChild(commentInputName);
                    commentForm.appendChild(commentLabelText);
                    commentForm.appendChild(commentInputText);
                    commentForm.appendChild(commentFormSubmit);

                    //Use fetch to make an HTTP POST request to server
                    const postComment = (e) => {
                        e.preventDefault();
                        const formData = new FormData(commentForm);
                       
                        //turn form data to JSON
                        const data = {};
                        formData.forEach((entry, key) => {
                            data[key] = entry
                        });
                        const dataJSON = JSON.stringify(data);
                            
                        
                        fetch(`https://calm-wave-71314.herokuapp.com/api/posts/${post._id}/comments`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: dataJSON
                        })
                            .then(response => response.json())
                            .then(result => {
                                console.log('Success:', result);
                                location.reload();
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    };

                    commentForm.addEventListener('submit', postComment);

                    
                }
            });
           

            return response;   
        })
        .catch(function (error) {
            console.log(error);
        });
};

getPosts();
