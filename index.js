const body = document.querySelector('body');
const posts = document.createElement('div');
body.appendChild(posts);


const getPosts = () => {


    return fetch('https://calm-wave-71314.herokuapp.com/api/posts', { mode: 'cors' })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
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
                                console.log(comment.text);
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
                    commentForm.setAttribute('action', `https://calm-wave-71314.herokuapp.com/api/posts/${post._id}/comments`)
                    commentForm.setAttribute('method', 'POST');
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
                    commentFormSubmit.setAttribute('value', 'OK');
                    commentFormSubmit.setAttribute('type', 'submit');
                        
                    postDisplay.appendChild(commentForm);
                    commentForm.appendChild(commentFormCTA);
                    commentForm.appendChild(commentLabelName);
                    commentForm.appendChild(commentInputName);
                    commentForm.appendChild(commentLabelText);
                    commentForm.appendChild(commentInputText);
                    commentForm.appendChild(commentFormSubmit);
                }
            });
           

            return response;   
        })
        .catch(function (error) {
            console.log(error);
        });
};

getPosts();
