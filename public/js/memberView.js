//Handles the button click to add a message to the discussion board
const addMessageHandler = async (event) => {
    event.preventDefault();

    const clubId = document.querySelector('#clubId').value.trim();
    const message = document.querySelector('#message').value.trim();
    const bookId = document.querySelector('#book_id').value.trim();

    const discussionPost = {
        text: message,
        club_id: clubId,
        book_id: bookId,
    }

    const response = await fetch('/api/discussions', {
        method: 'POST',
        body: JSON.stringify(discussionPost),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/getClub/${clubId}`);
    } else {
        alert(response.statusText);
    }
};

//Handles the button click to leave the club
const handleLeaveClub = async (event) => {
    event.preventDefault();

    const clubId = document.querySelector('#clubId').value.trim();

    const response = await fetch('/api/memberships/' + clubId, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace(`/getClub/${clubId}`);
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#addMessage').addEventListener('click', addMessageHandler);
document.querySelector('#leaveClub').addEventListener('click', handleLeaveClub);