import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";

const Reports = () => {
  const paidUsers = [
    { name: "John Doe", date: "2025-03-01", amount: "$100" },
    { name: "Jane Smith", date: "2025-03-02", amount: "$200" },
    { name: "Mike Johnson", date: "2025-03-03", amount: "$150" },
  ];

  const totalRevenue = "$450";

  return (
    <div>
      <Navbar pageTitle="Revenue Details" />
      <main className="container my-4">
        <section className="mb-5">
          {/* <h2 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>
            Revenue Details
          </h2> */}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Paid Users</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col" style={{ color: "#34495e" }}>Name</th>
                      <th scope="col" style={{ color: "#34495e" }}>Date</th>
                      <th scope="col" style={{ color: "#34495e" }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paidUsers.map((user, index) => (
                      <tr key={index}>
                        <td style={{ color: "#2c3e50" }}>{user.name}</td>
                        <td style={{ color: "#2c3e50" }}>{user.date}</td>
                        <td style={{ color: "#27ae60", fontWeight: "bold" }}>{user.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="card-title mb-0">Total Revenue</h5>
            </div>
            <div className="card-body">
              <p className="lead" style={{ color: "#27ae60", fontSize: "1.5rem", fontWeight: "bold" }}>
                {totalRevenue}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Reports;