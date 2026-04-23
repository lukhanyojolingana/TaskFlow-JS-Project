async function loadjoke() {
    let display = document.getElementById('joke-display');
    let status = document.getElementById('status');
    let btn = document.getElementById('joke-btn');

    //update ui to show loading state
    btn.disabled = true;
    btn.textContent = 'Loading...';
    status.textContent = '';

    //fetch joke from API
    try {
        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Server returned ' + response.status);
        }
        
        const data = await response.json();
        display.textContent = data.joke;
        status.textContent = 'ID: ' + data.id;
        } catch (error) {
        display.textContent = 'Could not fetch a joke. Check your connection and try again.';
        console.error(error);   
        }
    }
     

loadjoke();