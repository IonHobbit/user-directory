let usersContainer = document.querySelector(".users-container");
let userTemplate = document.querySelector("#user-template");

const users = [
  {
    image: "https://randomuser.me/api/portraits/med/men/1.jpg",
    name: "John Doe",
    email: "john@doe.com",
    age: 0,
    info: "A passionate wildlife enthusiast with a knack for capturing the beauty of nature through his lens.",
  },
  {
    image: "https://randomuser.me/api/portraits/med/women/1.jpg",
    name: "Jane Smith",
    email: "jane@smith.com",
    info: "A creative mind with a passion for design and a love for the arts. She is a great artist. ",
  },
  {
    image: "https://imagewitherror.com/image.jpg",
    name: "Michael Brown",
    age: 1,
    info: "A tech enthusiast with a knack for building innovative solutions to everyday problems.",
  },
  {
    image: "https://randomuser.me/api/portraits/med/women/2.jpg",
    name: "Emily White",
    age: 28,
    info: "A foodie with a passion for exploring new flavors and cuisines.",
  },
  {
    image: "https://randomuser.me/api/portraits/med/men/3.jpg",
    name: "David Green",
    email: "david@green.com",
    age: "ah",
    info: "A tech enthusiast with a knack for building innovative solutions to everyday problems.",
  },
];

function removeUser(index) {
  // find the user container
  const user = document.getElementById(`user-${index}`);
  // add remove class to user container
  user.classList.add("remove");
  // add transitionend event listener to user container
  user.addEventListener("transitionend", () => {
    setTimeout(() => {
      user.remove();
      // if there is no child at the end of transition, then add empty state
      if (usersContainer.children.length === 0) {
        usersContainer.classList.add("no-users");
        let emptyState = document.createElement("p");
        emptyState.textContent = "No users found";
        usersContainer.appendChild(emptyState);
      }
    }, 200);
  });
}

function renderUsers() {
  users.forEach((user, index) => {
    let userClone = userTemplate.content.cloneNode(true);
    // add image to user clone
    let userImage = userClone.querySelector(".user-image");
    if (user.image === "") userImage.classList.add("bad-image");
    // add error event listener to user image to add bad-image class
    userImage.addEventListener("error", () => {
      userImage.classList.add("bad-image");
    });
    userImage.src = user.image;

    // add name to user clone
    let userName = userClone.querySelector(".user-name");
    userName.textContent = user.name;

    // add email to user clone
    let userEmail = userClone.querySelector(".user-email");
    userEmail.textContent = user.email;

    // add age to user clone
    let userAge = userClone.querySelector(".user-age");
    // check if age is an integer, then append "year old" or "years old" to the age
    if (Number.isInteger(user.age)) {
      const additionalInfo = user.age === 1 ? "year old" : "years old";
      userAge.textContent = `${user.age} ${additionalInfo}`;
    } else {
      userAge.remove();
    }

    // add info to user clone
    let userInfo = userClone.querySelector(".user-info");
    userInfo.textContent = user.info;

    // add close button to user clone with event listener to remove user
    let btnClose = userClone.querySelector(".btn-close");
    btnClose.addEventListener("click", () => removeUser(index + 1));

    usersContainer.appendChild(userClone);
  });

  // add id to each user container
  let userContainers = usersContainer.getElementsByClassName("user-container");
  Array.from(userContainers).forEach((container, index) => {
    container.id = `user-${index + 1}`;
  });
}

renderUsers();
