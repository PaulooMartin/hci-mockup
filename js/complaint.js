const id = new URLSearchParams(location.search).get("id");
const complaint = DATA.complaints.find((r) => r.id === id);
const title = document.getElementById("title");

function summary(entries) {
  const list = document.createElement("dl");
  list.className = "summary";
  entries.forEach(([term, text]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = text;
    list.append(dt, dd);
  });
  return list;
}

if (complaint) {
  // Every complaint refers to a payslip, which gives the employee and pay period.
  const payslip = DATA.payslips.find((p) => p.id === complaint.payslipId);
  App.initDetailPage(App.employee(payslip.employeeId), App.period(payslip.periodId), "complaints.html");
  title.textContent = "Employee Complaint " + App.recordNumber(complaint.id);

  const status = document.getElementById("status");
  status.textContent = complaint.status;
  status.hidden = false;

  const related = document.getElementById("related");
  related.href = "payslip.html?id=" + payslip.id;
  related.hidden = false;

  // The amounts are left out on purpose: they are on the payslip, behind "Show Payslip".
  document.getElementById("details").append(summary([
    ["Date raised", App.formatDate(complaint.dateRaised)],
    ["Reported item", App.PAY_ITEMS[complaint.item]],
    ["Problem", complaint.description],
  ]));
} else {
  App.initDetailPage(null, null, "complaints.html");
  title.textContent = "Complaint not found";
}
