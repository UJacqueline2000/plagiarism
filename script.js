document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('loginForm');
    const uploadForm = document.getElementById('uploadForm');
    const userProfile = document.getElementById('userProfile');
    const logoutButton = document.getElementById('logoutButton');
    const staffPanel = document.getElementById('staffPanel');
    const reportsDiv = document.getElementById('reports');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');
    const viewProfile = document.getElementById('view-profile');
    const editProfile = document.getElementById('edit-profile');
    const changePassword = document.getElementById('change-password');
    
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Implement sign-up logic here
        
        alert('Sign up successful! Please sign in.');
        signupForm.style.display = 'none';
        signinForm.style.display = 'block';
    });
    
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loginForm.style.display = 'none';
                if (data.role === 'student') {
                    uploadForm.style.display = 'block';
                } else if (data.role === 'staff') {
                    staffPanel.style.display = 'block';
                    loadReports();
                }
            } else {
                alert(data.message);
            }
        });
    });
    
    uploadForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Implement file upload logic here
        
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        // Validate file type and size (e.g., maximum size 5MB)
        const allowedExtensions = ['pdf', 'doc', 'docx'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert('Invalid file type. Only PDF, DOC, and DOCX are allowed.');
            return;
        }

        if (file.size > maxSize) {
            alert('File size exceeds the maximum limit of 5MB.');
            return;
        }

        // Display loading message
        document.getElementById('result').innerHTML = 'Uploading...';

        // Send the file to the server using fetch API
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('result').innerHTML = 'File uploaded successfully!';
            } else {
                document.getElementById('result').innerHTML = 'File upload failed. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = 'An error occurred. Please try again.';
        });
    });
    function loadReports() {
        fetch('/reports')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const reports = data.reports;
                let reportsHtml = '';
                for (const [filename, report] of Object.entries(reports)) {
                    reportsHtml += `
                        <div class="report">
                            <h3>${filename}</h3>
                            <p>Similarity Score: ${report.similarity_score * 100}%</p>
                            <p>Matches:</p>
                            <ul>
                                ${report.matches.map(match => `<li>${match.matched_text} (Source: ${match.source})</li>`).join('')}
                            </ul>
                            <form class="feedbackForm" data-filename="${filename}">
                                <label for="feedback">Provide Feedback</label>
                                <textarea name="feedback" required></textarea>
                                <button type="submit">Submit Feedback</button>
                            </form>
                        </div>
                    `;
                }
                reportsDiv.innerHTML = reportsHtml;
                document.querySelectorAll('.feedbackForm').forEach(form => {
                    form.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const feedback = this.elements['feedback'].value;
                        const filename = this.getAttribute('data-filename');

                        fetch('/feedback', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ filename, feedback })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Feedback provided successfully.');
                            } else {
                                alert('Failed to provide feedback. Please try again.');
                            }
                        });
                    });
                });
            } else {
                reportsDiv.innerHTML = 'Failed to load reports. Please try again later.';
            }
        });
    }
    function loadReports() {
        fetch('/reports')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const reports = data.reports;
                let reportsHtml = '';
                for (const [filename, report] of Object.entries(reports)) {
                    reportsHtml += `
                        <div class="report">
                            <h3>${filename}</h3>
                            <p>Similarity Score: ${report.similarity_score * 100}%</p>
                            <p>Matches:</p>
                            <ul>
                                ${report.matches.map(match => `<li>${match.matched_text} (Source: ${match.source})</li>`).join('')}
                            </ul>
                            <form class="feedbackForm" data-filename="${filename}">
                                <label for="feedback">Provide Feedback</label>
                                <textarea name="feedback" required></textarea>
                                <button type="submit">Submit Feedback</button>
                            </form>
                        </div>
                    `;
                }
                reportsDiv.innerHTML = reportsHtml;
                document.querySelectorAll('.feedbackForm').forEach(form => {
                    form.addEventListener('submit', function (e) {
                        e.preventDefault();
                        const feedback = this.elements['feedback'].value;
                        const filename = this.getAttribute('data-filename');

                        fetch('/feedback', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ filename, feedback })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                alert('Feedback provided successfully.');
                            } else {
                                alert('Failed to provide feedback. Please try again.');
                            }
                        });
                    });
                });
            } else {
                reportsDiv.innerHTML = 'Failed to load reports. Please try again later.';
            }
        });
    }
    const recentActivities = [
        'Dissertation uploaded by Student A',
        'Feedback provided by Academic Staff B',
        'Dissertation resubmitted by Student C',
    ];

    const notifications = [
        'New feedback on your dissertation',
        'Your plagiarism report is ready',
        'Reminder: Submit your final dissertation by June 30',
    ];

    // Function to display recent activities
    const displayRecentActivities = () => {
        const activityList = document.getElementById('activity-list');
        recentActivities.forEach(activity => {
            const listItem = document.createElement('li');
            listItem.textContent = activity;
            activityList.appendChild(listItem);
        });
    };

    // Function to display notifications
    const displayNotifications = () => {
        const notificationList = document.getElementById('notification-list');
        notifications.forEach(notification => {
            const listItem = document.createElement('li');
            listItem.textContent = notification;
            notificationList.appendChild(listItem);
        });
    };

    // Call functions to display data
    displayRecentActivities();
    displayNotifications(); 
    editProfileBtn.addEventListener('click', function () {
        viewProfile.style.display = 'none';
        editProfile.style.display = 'block';
    });

    changePasswordBtn.addEventListener('click', function () {
        viewProfile.style.display = 'none';
        changePassword.style.display = 'block';
    });

    cancelEditBtn.addEventListener('click', function () {
        editProfile.style.display = 'none';
        viewProfile.style.display = 'block';
    });

    cancelPasswordBtn.addEventListener('click', function () {
        changePassword.style.display = 'none';
        viewProfile.style.display = 'block';
    });

    document.getElementById('edit-profile-form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Implement profile update logic here
        
        alert('Profile updated successfully!');
        editProfile.style.display = 'none';
        viewProfile.style.display = 'block';
    });

    document.getElementById('change-password-form').addEventListener('submit', function (e) {
        e.preventDefault();
        // Implement password change logic here
        
        alert('Password changed successfully!');
        changePassword.style.display = 'none';
        viewProfile.style.display = 'block';
    });
});

