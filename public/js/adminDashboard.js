const updateClub = document.querySelector('#updateClub');
const addMessage = document.querySelector('#addMessage');

// Handles the button to update a club from the admin page
const handleClubUpdate = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#clubName').value.trim();
    const description = document.querySelector('#clubDescription').value.trim();
    const typeOption = document.querySelector('#clubType')
    const type = typeOption.options[typeOption.selectedIndex].text;
    const clubId = document.querySelector('#clubId').value.trim();

    console.log(type);

    const response = await fetch(`/api/clubs/${clubId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: name,
            description: description,
            type: type,
        }),
        headers: { "Content-Type" : "application/json"},
    });

    if (response.ok) {
        document.location.replace("/getClub/" + clubId);
    } else {
        alert(response.statusText);
    }
};

// Handles the button click to add a message to the discussion board
const handleAddMessage = async (event) => {
    event.preventDefault();

    const clubId = document.querySelector('#clubId').value.trim();
    const message = document.querySelector('#message').value.trim();
    const bookId = document.querySelector('#bookID').value.trim();

    const discussionPost = {
        text: message,
        club_id: clubId,
        book_id: bookId,
    }

    const response = await fetch('/api/discussions', {
        method: 'POST',
        body: JSON.stringify(discussionPost),
        headers: { 'Content-Type' : 'application/json '},
    });

    if (response.ok) {
        document.location.replace(`/getClub/${clubId}`);
    } else {
        alert(response.statusText);
    }
};

updateClub.addEventListener('click', handleClubUpdate);
addMessage.addEventListener('click', handleAddMessage);