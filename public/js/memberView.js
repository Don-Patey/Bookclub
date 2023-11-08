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

document.querySelector('#addMessage').addEventListener('click', addMessageHandler);