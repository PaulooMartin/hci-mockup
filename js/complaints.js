const COLUMNS = [
  { label: "Date Raised", value: (complaint) => App.formatDate(complaint.dateRaised) },
  { label: "Refers to Payslip ID", value: (complaint) => complaint.payslipId },
  {
    label: "Status",
    value: (complaint) => complaint.status.toUpperCase(),
    className: (complaint) => (complaint.status === "Ongoing" ? "status-alert" : ""),
  },
];

const { employee, period } = App.initListPage();

if (employee && period) {
  const table = App.table("table-records", COLUMNS, App.complaintsFor(employee, period), {
    href: (complaint) => "complaint.html?id=" + complaint.id,
    emptyText: "No complaints for this pay period.",
  });
  document.getElementById("results").append(table);
}
