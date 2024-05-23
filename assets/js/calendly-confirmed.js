const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const event_start_time = urlParams.get("event_start_time");
const event_end_time = urlParams.get("event_end_time");
const invitee_full_name = urlParams.get("invitee_full_name");
const invitee_email = urlParams.get("invitee_email");

// Convert ISO 8601 strings to Date objects
const startTime = new Date(event_start_time);
const endTime = new Date(event_end_time);

function formatDate(date) {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    });
}

const start = formatDate(startTime);
const end = formatDate(endTime);

document.getElementById("name").textContent = invitee_full_name;
document.getElementById("start-time").textContent = start;
document.getElementById("end-time").textContent = end;
document.getElementById("mail").textContent = invitee_email;

