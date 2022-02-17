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
                    postDisplay = document.createElement('div');
                    posts.appendChild(postDisplay);
                    postTitle = document.createElement('h2');
                    postTitle.textContent = post.title;
                    postText = document.createElement('p');
                    postText.textContent = post.text;
                    postTimestamp = document.createElement('p');
                    postTimestamp.textContent = post.timestamp;

                    posts.appendChild(postDisplay);
                    postDisplay.appendChild(postTitle);
                    postDisplay.appendChild(postText);
                    postDisplay.appendChild(postTimestamp);
                    
                }
            });
           

            return response;   
        })
        .catch(function (error) {
            console.log(error);
        });
};

getPosts();

/*
form.addEventListener('submit', (e) => {
    const searchTerm = form.elements['search'].value;
    const checkedUnit = document.querySelector('input[name="unit"]:checked').value;
    let temperatureUnit;
    switch (checkedUnit) {
        case 'celsius':
            temperatureUnit = celsius;
            break;
        case 'fahrenheit':
            temperatureUnit = fahrenheit;
            break;
    };

    const concatUrl = url.concat(searchTerm, temperatureUnit, apiKey);
    console.log(concatUrl);

    getData(concatUrl).then((data) => {
        console.log(data);

        switch (checkedUnit) {
        case 'celsius':
            temperatureDisplay.textContent = data.temperature + "°C";
            break;
        case 'fahrenheit':
            temperatureDisplay.textContent = data.temperature + "F";
            break;
        };
        
        weatherDisplay.setAttribute('id', 'weather-display')
        weatherDisplay.textContent = data.weatherDescription;

        weatherIcon.src = iconUrl.concat(data.weatherIconId, "@2x.png");


    })
        .catch(function (error) {
            console.log(error);
            temperatureDisplay.textContent = "Error, not found.";
        });
});
*/