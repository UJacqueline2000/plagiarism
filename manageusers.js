document.addEventListener("DOMContentLoaded", function() {
    const userTable = document.getElementById("userTable").getElementsByTagName("tbody")[0];
    const userForm = document.getElementById("userForm");
    const form = document.getElementById("form");
    let editIndex = null;

    const users = [
        { username: "john_doe", email: "john@example.com", role: "student" },
        { username: "jane_doe", email: "jane@example.com", role: "academicStaff" }
    ];

    function renderUserTable() {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            const row = userTable.insertRow();
            row.insertCell(0).innerText = user.username;
            row.insertCell(1).innerText = user.email;
            row.insertCell(2).innerText = user.role;
            const actions = row.insertCell(3);
            actions.innerHTML = `
                <button onclick="editUser(${index})">Edit</button>
                <button onclick="deleteUser(${index})">Delete</button>
            `;
        });
    }

    window.showAddUserForm = function() {
        editIndex = null;
        form.reset();
        userForm.style.display = "flex";
    }

    window.closeForm = function() {
        userForm.style.display = "none";
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = form.username.value;
        const email = form.email.value;
        const role = form.role.value;
        if (editIndex !== null) {
            users[editIndex] = { username, email, role };
        } else {
            users.push({ username, email, role });
        }
        renderUserTable();
        closeForm();
    });

    window.editUser = function(index) {
        editIndex = index;
        form.username.value = users[index].username;
        form.email.value = users[index].email;
        form.role.value = users[index].role;
        userForm.style.display = "flex";
    }

    window.deleteUser = function(index) {
        users.splice(index, 1);
        renderUserTable();
    }

    renderUserTable();
});
