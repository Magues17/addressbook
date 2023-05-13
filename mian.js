// Fetch a single user and store in array
async function fetchUser() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    return data.results[0];
  }

  const addressBook = [];

  // Fetch multiple users and store in array...
  async function fetchUsers(numUsers) {
    const responses = await Promise.all(
      Array(numUsers).fill().map(fetchUser)
    );
    const users = responses.map(response => ({
      name: `${response.name.first} ${response.name.last}`,
      picture: response.picture.thumbnail,
      ...response // Include all other fields in user object
    }));
    addressBook.push(...users);
  }


  // Fetch 5 users on window load...

  window.addEventListener('load', async () => {
    await fetchUsers(5);
    renderAddressBook();
  });



  // Render address book to the DOM...

  function renderAddressBook() {
    const container = document.getElementById('address-book');
    container.innerHTML = '';
    addressBook.forEach(user => {
      const userEl = document.createElement('div');
      const nameEl = document.createElement('h2');
      const picEl = document.createElement('img');
      const detailsEl = document.createElement('div');
      const detailsBtn = document.createElement('button');
      detailsBtn.innerText = 'Show details';
      nameEl.innerText = user.name;
      picEl.src = user.picture;
      detailsEl.style.display = 'none';
      detailsBtn.addEventListener('click', () => {
        detailsEl.style.display = detailsEl.style.display === 'none' ? 'block' : 'none';
      });
      detailsEl.innerHTML = `
        <p>DOB: ${new Date(user.dob.date).toLocaleDateString()}</p>
        <p>Address: ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
        <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
        <p>Phone: ${user.phone}</p>
      `;
      userEl.appendChild(nameEl);
      userEl.appendChild(picEl);
      userEl.appendChild(detailsBtn);
      userEl.appendChild(detailsEl);
      container.appendChild(userEl);
    });
  }