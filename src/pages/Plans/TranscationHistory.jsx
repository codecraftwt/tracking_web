import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";

const TransactionHistory = () => {
  const transactions = [
    { date: "2023-10-01", description: "For new 1-10 Users", amount: "-$50.00", status: "Completed" },
    { date: "2023-10-02", description: "Recharge the plan", amount: "+$2000.00", status: "Completed" },
    { date: "2023-10-03", description: "For new 10-20 Users", amount: "-$120.00", status: "Pending" },
    { date: "2023-10-04", description: "Recharge the plan", amount: "-$75.00", status: "Completed" },
    { date: "2023-10-05", description: "Recharge the plan", amount: "+$500.00", status: "Completed" },
  ];

  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <Navbar pageTitle="Transaction History" />
      <main className="container py-4">
        <div className="card shadow-sm border-0 m-4">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Transaction History</h5>
          </div>
          <div className="card-body p-4">
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-end">Amount</th>
                    <th scope="col" className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td 
                        className="text-end fw-bold"
                        style={{ color: transaction.amount.startsWith("+") ? "green" : "red" }}
                      >
                        {transaction.amount}
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge px-3 py-2 ${
                            transaction.status === "Completed" ? "bg-success" : "bg-warning text-dark"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
