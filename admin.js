document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');
    const settingsForm = document.getElementById('settingsForm');

    userForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        // Add user to the list
        addUser(username, password, role);
    });

    function addUser(username, password, role) {
        const userList = document.getElementById('userList');
        const  renderUserTable = document.createElement(' renderUserTable');
        renderUserTable.textContent = `${username} (${role})`;
        userList.appendChild( renderUserTable);
    }

    function generateReport() {
        const reportContent = document.getElementById('reportContent');
        reportContent.innerHTML = '<p>Generating report...</p>';
        // Simulate report generation
        setTimeout(() => {
            reportContent.innerHTML = '<p>Report generated successfully. Click <a href="#">here</a> to download.</p>';
        }, 2000);
    }
});