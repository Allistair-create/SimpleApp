// Select DOM elements
const loadBtn = document.getElementById('loadBtn');
const userList = document.getElementById('userList');

// API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Function to create a user card HTML string
function createUserCard(user) {
  return `
    <div class="user-card">
      <h3>${user.name} (${user.username})</h3>
      <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
      <p>Company: ${user.company.name}</p>
      <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
      <p>City: ${user.address.city}</p>
    </div>
  `;
}

// Function to fetch and display users
async function fetchUsers() {
  userList.innerHTML = '<p class="loading">Loading users...</p>';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const users = await response.json();
    userList.innerHTML = users.map(createUserCard).join('');
  } catch (error) {
    userList.innerHTML = `<p class="error">Failed to load users: ${error.message}</p>`;
  }
}

// Event listener for the button
loadBtn.addEventListener('click', fetchUsers);
