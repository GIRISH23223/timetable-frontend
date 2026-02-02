console.log("Frontend initialized");

const API_URL = "http://localhost:5000/api";

window.onload = () => {
    showStatus("Frontend loaded successfully (UI ready)", "info");
    checkServerStatus();
};

function showStatus(message, type) {
    const status = document.getElementById("status");
    status.innerText = message;
    status.className = `status ${type}`;
}

function checkServerStatus() {
    fetch("http://localhost:5000")
        .then(() => {
            showStatus("Backend connected ✅", "success");
        })
        .catch(() => {
            showStatus("Backend not available (Demo mode)", "info");
            document.getElementById("results").innerHTML = `
                <div class="status info">
                    <strong>Demo Mode Enabled</strong><br>
                    Frontend logic and visualization are working.<br>
                    Backend features will activate once server is running.
                </div>
            `;
        });
}

function generateTimetable() {
    showStatus("Generate action triggered (frontend)", "success");
    document.getElementById("results").innerHTML =
        "<div class='loading'>Generate button handled by frontend logic.</div>";
}

function viewTimetable() {
    showStatus("View timetable triggered", "info");
    document.getElementById("results").innerHTML =
        "<div class='loading'>Waiting for timetable data...</div>";
}

function viewData(type) {
    showStatus(`View ${type} triggered`, "info");
    document.getElementById("results").innerHTML =
        `<pre>Frontend ready to load ${type} data</pre>`;
}

function clearTimetable() {
    showStatus("Clear action triggered", "info");
    document.getElementById("results").innerText = "Timetable cleared (frontend)";
}

/* ---------- DEMO / MOCK DATA ---------- */
function loadMockTimetable() {
    showStatus("Displaying demo timetable", "success");

    const mockData = [
        {
            sectionId: { name: "CSE-A" },
            courseId: { name: "DBMS" },
            facultyId: { name: "Dr. Rao" },
            timeslotId: { day: "Monday", slot: "9:00 - 10:00" }
        },
        {
            sectionId: { name: "CSE-B" },
            courseId: { name: "OS" },
            facultyId: { name: "Dr. Mehta" },
            timeslotId: { day: "Tuesday", slot: "10:00 - 11:00" }
        }
    ];

    let html = "<table><tr><th>Section</th><th>Course</th><th>Faculty</th><th>Day</th><th>Slot</th></tr>";
    mockData.forEach(e => {
        html += `<tr>
            <td>${e.sectionId.name}</td>
            <td>${e.courseId.name}</td>
            <td>${e.facultyId.name}</td>
            <td>${e.timeslotId.day}</td>
            <td>${e.timeslotId.slot}</td>
        </tr>`;
    });
    html += "</table>";

    document.getElementById("results").innerHTML = html;
}
