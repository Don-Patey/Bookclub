const joinFormHandler = async (event) => { 
    event.preventDefault();

    // collecting values from the join request form
    const clubId = document.querySelector('#join').getAttribute('data-club-id');
    
    // the object with the join request data
    const joinRequestData = {   
        club_id: clubId,
    };

    //send a POST request to the API endpoint
    const response = await fetch('/api/memberships', {
        method: 'POST',
        body: JSON.stringify(joinRequestData),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        // if successful, redirect the browser to the dashboard page
        document.location.replace(`/getClub/${clubId}`);
    } else {
        alert(response.statusText);
    }
};

//attatchiong the join form submission handler to join form
document.querySelector('#join').addEventListener('click', joinFormHandler);