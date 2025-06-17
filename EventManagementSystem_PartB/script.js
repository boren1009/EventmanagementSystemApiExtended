const apiUrl = "https://localhost:5001/api/events";
document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const event = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value,
        location: document.getElementById("location").value,
        ticketPrice: parseFloat(document.getElementById("ticketPrice").value),
        expectedParticipants: parseInt(document.getElementById("expectedParticipants").value),
        numSessions: parseInt(document.getElementById("numSessions").value)
    };
    const id = document.getElementById("eventId").value;
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(id ? { ...event, id: parseInt(id) } : event)
    });
    if (res.ok) {
        showMessage("Event saved successfully!");
        document.getElementById("eventForm").reset();
        loadEvents();
    } else {
        showMessage("Error saving event.", true);
    }
});
async function loadEvents() {
    const res = await fetch(apiUrl);
    const events = await res.json();
    const list = document.getElementById("eventsList");
    list.innerHTML = "";
    events.forEach(ev => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${ev.title}</strong> (${new Date(ev.date).toLocaleDateString()})<br>
            ${ev.description}<br>
            Location: ${ev.location} 
            <a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.location)}" target="_blank">View on Map</a><br>
            Ticket: $${ev.ticketPrice} x ${ev.expectedParticipants} → Revenue: $${ev.ticketPrice * ev.expectedParticipants}<br>
            Sessions: ${ev.numSessions}<br>
            <button onclick="editEvent(${ev.id})">Edit</button>
            <button onclick="deleteEvent(${ev.id})">Delete</button>
        `;
        list.appendChild(li);
    });
}
async function deleteEvent(id) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (res.ok) {
        showMessage("Event deleted.");
        loadEvents();
    }
}
async function editEvent(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const ev = await res.json();
    document.getElementById("eventId").value = ev.id;
    document.getElementById("title").value = ev.title;
    document.getElementById("description").value = ev.description;
    document.getElementById("date").value = ev.date.substring(0, 10);
    document.getElementById("location").value = ev.location;
    document.getElementById("ticketPrice").value = ev.ticketPrice;
    document.getElementById("expectedParticipants").value = ev.expectedParticipants;
    document.getElementById("numSessions").value = ev.numSessions;
}
function showMessage(msg, isError = false) {
    const el = document.getElementById("message");
    el.textContent = msg;
    el.style.color = isError ? "red" : "green";
    setTimeout(() => (el.textContent = ""), 3000);
}
loadEvents();