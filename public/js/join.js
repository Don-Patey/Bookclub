const joinFormHandler = async (event) => { 
    event.preventDefault();

    // collecting values from the join request form
    const id = document.querySelector('#join-request-id').value.trim();
    const userId = document.querySelector('#user-id').value.trim();
    const clubId = document.querySelector('#club-id').value.trim();
    
    // the object with the join request data
    const joinRequestData = {   
        id: id,
        user_id: userId,
        club_id: clubId,
    };

    //send a POST request to the API endpoint
    const response = await fetch('/api/joinrequests', {
        method: 'POST',
        body: JSON.stringify(joinRequestData),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        // if successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

//attatchiong the join form submission handler to join form
document.querySelector('.join-form').addEventListener('submit', joinFormHandler);