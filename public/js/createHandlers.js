const createClubHandler = async (event) => {
  event.preventDefault();

  console.log("Creating club...");

  const admin_id = await fetchUserId();

  const { name, description, type, club_admin_id, current_book_id } = {
    name: "Your New Club",
    description: "This is your new club! Create a thoughtful description.",
    type: "Non-Fiction",
    club_admin_id: admin_id,
    current_book_id: 1,
  };

  const response = await fetch("/api/clubs", {
    method: "POST",
    body: JSON.stringify({
      name,
      description,
      type,
      club_admin_id,
      current_book_id,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const newClub = await response.json();
    document.location.replace("/getClub/" + newClub.id);
  } else {
    alert(response.statusText);
  }
};

async function fetchUserId() {
  const response = await fetch("/getUserId");
  if (!response.ok) {
    throw new Error("Could not fetch user ID");
  }
  const data = await response.json();
  return data.user_id;
}

document
  .querySelector("#createClub")
  .addEventListener("click", createClubHandler);
