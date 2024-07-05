document.addEventListener("DOMContentLoaded", function() {
    const submissionTable = document.getElementById("submissionTable").getElementsByTagName("tbody")[0];
    const submissions = [
        { studentName: "John Doe", title: "Dissertation on AI", date: "2024-05-01", status: "Pending" },
        { studentName: "Jane Smith", title: "Dissertation on ML", date: "2024-06-01", status: "Reviewed" }
    ];

    function renderSubmissionTable() {
        submissionTable.innerHTML = "";
        submissions.forEach((submission, index) => {
            const row = submissionTable.insertRow();
            row.insertCell(0).innerText = submission.studentName;
            row.insertCell(1).innerText = submission.title;
            row.insertCell(2).innerText = submission.date;
            row.insertCell(3).innerText = submission.status;
            const actions = row.insertCell(4);
            actions.innerHTML = `
                <button onclick="viewSubmission(${index})">View</button>
                <button onclick="markAsReviewed(${index})">Mark as Reviewed</button>
            `;
        });
    }

    window.viewSubmission = function(index) {
        alert(`Viewing submission: ${submissions[index].title} by ${submissions[index].studentName}`);
        // Implement view logic here
    }

    window.markAsReviewed = function(index) {
        submissions[index].status = "Reviewed";
        renderSubmissionTable();
    }

    renderSubmissionTable();
});
