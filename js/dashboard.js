const { employee, period } = App.initListPage();

function setStat(name, text, alert) {
  const stat = document.querySelector(`[data-stat="${name}"]`);
  stat.textContent = text;
  stat.classList.toggle("alert", Boolean(alert));
}

if (employee && period) {
  const attendance = App.attendanceFor(employee, period);
  const count = (status) => attendance.filter((a) => a.status === status).length;
  const overtime = App.overtimeHours(attendance);

  setStat("overtime", `Overtime Hours: ${overtime} ${overtime === 1 ? "hour" : "hours"}`);
  setStat("leaves", `Approved Leaves: ${count("VL")}`);
  setStat("absences", `Absences: ${count("Absent")}`);

  const payslips = App.payslipsFor(employee, period);
  const needsCorrections = payslips.some((p) => App.complaintForPayslip(p.id));
  setStat("payslip", payslips.length
    ? "Status: " + (needsCorrections ? "Needs Corrections" : "No Issues")
    : "No payslip yet", needsCorrections);

  const active = App.complaintsFor(employee, period).filter((c) => c.status === "Ongoing").length;
  setStat("complaints", `${active} Active ${active === 1 ? "Complaint" : "Complaints"}`, active > 0);
}
