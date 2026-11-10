var assets = [
    { id: "AST-101", name: "Kiosk 01 - Main Hall" },
    { id: "AST-102", name: "Kiosk 02 - Entrance" },
    { id: "AST-205", name: "Core Switch Cisco 2960" },
    { id: "AST-206", name: "Branch Router 05" },
    { id: "AST-301", name: "Teller PC #04" }
];

var tickets = [
    { id: "TCK-8921", asset: "Branch Router 05", priority: "P1", status: "Open", date: "2026-11-10" },
    { id: "TCK-8842", asset: "Kiosk 02 - Entrance", priority: "P2", status: "In Progress", date: "2026-11-09" },
    { id: "TCK-8710", asset: "Teller PC #04", priority: "P3", status: "Resolved", date: "2026-11-08" }
];

var modal = document.getElementById("ticketModal");
var openBtn = document.getElementById("openModalBtn");
var closeBtn = document.getElementById("closeModalBtn");
var ticketForm = document.getElementById("newTicketForm");
var assetSelect = document.getElementById("assetSelect");
var tableBody = document.getElementById("ticketsList");

for (var i = 0; i < assets.length; i++) {
    var option = document.createElement("option");
    option.value = assets[i].id;
    option.text = assets[i].id + " - " + assets[i].name;
    assetSelect.appendChild(option);
}

function showTickets() {
    tableBody.innerHTML = "";
    var active = 0;
    var resolved = 0;

    for (var i = 0; i < tickets.length; i++) {
        var t = tickets[i];
        
        if (t.status === "Open" || t.status === "In Progress") {
            active++;
        }
        if (t.status === "Resolved") {
            resolved++;
        }

        var priorityBadge = "bg-slate-500/10 text-slate-400 border-slate-500/20";
        if (t.priority === "P1") priorityBadge = "bg-red-500/10 text-red-400 border-red-500/20";
        if (t.priority === "P2") priorityBadge = "bg-amber-500/10 text-amber-400 border-amber-500/20";

        var statusBadge = "text-blue-400";
        if (t.status === "In Progress") statusBadge = "text-amber-400";
        if (t.status === "Resolved") statusBadge = "text-emerald-400";

        var row = document.createElement("tr");
        row.className = "hover:bg-slate-800/30 transition";
        row.innerHTML = "<td class='px-6 py-4 font-mono font-semibold text-slate-300'>" + t.id + "</td>" +
                        "<td class='px-6 py-4 font-medium text-white'>" + t.asset + "</td>" +
                        "<td class='px-6 py-4'><span class='px-2.5 py-1 rounded-md text-xs font-semibold border " + priorityBadge + "'>" + t.priority + "</span></td>" +
                        "<td class='px-6 py-4 font-medium " + statusBadge + "'>" + t.status + "</td>" +
                        "<td class='px-6 py-4 text-slate-400 text-xs'>" + t.date + "</td>";
        tableBody.appendChild(row);
    }

    document.getElementById("statActive").innerText = active;
    document.getElementById("statResolved").innerText = resolved;
}

openBtn.onclick = function() {
    modal.classList.remove("hidden");
};

closeBtn.onclick = function() {
    modal.classList.add("hidden");
};

window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
};

ticketForm.onsubmit = function(event) {
    event.preventDefault();

    var selectedAssetId = assetSelect.value;
    var assetName = selectedAssetId;

    for (var i = 0; i < assets.length; i++) {
        if (assets[i].id === selectedAssetId) {
            assetName = assets[i].name;
            break;
        }
    }

    var selectedPriority = ticketForm.elements["priority"].value;
    var randomId = "TCK-" + Math.floor(1000 + Math.random() * 9000);

    tickets.unshift({
        id: randomId,
        asset: assetName,
        priority: selectedPriority,
        status: "Open",
        date: "2026-11-10"
    });

    showTickets();
    modal.classList.add("hidden");
    ticketForm.reset();
};

showTickets();