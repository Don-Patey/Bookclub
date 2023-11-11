// Handles the button click to add a book to the library
document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;

  try {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, author }),
    });

    if (response.ok) {
      const data = await response.json();
      document.getElementById("responseMessage").textContent =
        "Book added successfully!";
      // You can clear the form or perform other actions as needed.
    } else {
      document.getElementById("responseMessage").textContent =
        "Failed to add book";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("responseMessage").textContent =
      "An error occurred while adding the book.";
  }
});
