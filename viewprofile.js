document.addEventListener('DOMContentLoaded', function () {
    // Assume profile data is available (replace with actual data retrieval)
    const profileData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'Computer Science'
    };

    // Display profile information
    document.getElementById('name').textContent = profileData.name;
    document.getElementById('email').textContent = profileData.email;
    document.getElementById('department').textContent = profileData.department;
});

function editProfile() {
    // Redirect or navigate to edit profile page
    // Example: window.location.href = 'edit-profile.html';
    console.log('Redirecting to edit profile page');
}
