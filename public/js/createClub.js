
//Handles the button click to add a new club to the list
const createClubHandler = async (event) => {
  event.preventDefault();

  console.log("Creating club...");

  const clubName = document.querySelector('#clubName').value.trim();
  const description = document.querySelector('#clubDescription').value.trim();
  const typeOption = document.querySelector('#clubType');
  const type = typeOption.options[typeOption.selectedIndex].text;

  console.log(type);

  const response = await fetch("/api/clubs", {
    method: "POST",
    body: JSON.stringify({
      name: clubName,
      description: description,
      type: type,
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


document
  .querySelector("#createClub")
  .addEventListener("click", createClubHandler);
