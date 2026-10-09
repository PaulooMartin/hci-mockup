const FILTERS = [
  { label: "All days", match: () => true },
  { label: "Attended", match: (row) => row.status === "Attended" },
  { label: "Overtime (OT)", match: (row) => row.status === "OT" },
  { label: "Vacation leave (VL)", match: (row) => row.status === "VL" },
  { label: "Rest days (RD)", match: (row) => row.status === "RD" },
  { label: "Absences", match: (row) => row.status === "Absent" },
];

const COLUMNS = [
  { label: "Date", value: (row) => App.formatDate(row.date) },
  { label: "Status", value: (row) => row.status },
  { label: "Clock In", value: (row) => row.clockIn || "N/A" },
  { label: "Clock Out", value: (row) => row.clockOut || "N/A" },
  { label: "Break", value: (row) => row.break || "N/A" },
  { label: "Lunch", value: (row) => row.lunch || "N/A" },
  { label: "Worked Hours", value: (row) => row.workedHours },
];

const { employee, period } = App.initListPage();

function render(filter) {
  const filterRow = document.createElement("div");
  filterRow.className = "filter-row";
  const filterDropdown = document.createElement("div");
  filterDropdown.className = "dropdown dropdown-filters";
  App.dropdown(filterDropdown, {
    label: filter === FILTERS[0] ? "Filters" : "Filters: " + filter.label,
    options: FILTERS.map((f) => ({ label: f.label, value: f, selected: f === filter })),
    onSelect: render,
  });
  filterRow.append(filterDropdown);

  const rows = App.attendanceFor(employee, period).filter(filter.match);
  const table = App.table("table-attendance", COLUMNS, rows, { emptyText: "No days match this filter." });
  document.getElementById("results").replaceChildren(filterRow, table);
}

if (employee && period) render(FILTERS[0]);
