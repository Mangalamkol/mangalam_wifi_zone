import React, {useEffect, useState} from "react";
import api from "../api";
import TopBar from "../components/TopBar";
import SideNav from "../components/SideNav";

export default function Transactions(){
  const [txs,setTxs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(()=>load(),[]);
  async function load(){ setTxs((await api.get("/admin/transactions")).data || []); }

  const filteredTxs = txs.filter(t => 
    t.phone.includes(search) || 
    t.status.toLowerCase().includes(search.toLowerCase()) || 
    (t.coupon && t.coupon.toString().slice(0,8).includes(search))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTxs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="app">
      <SideNav/>
      <div className="content">
        <TopBar title="Transactions" search={search} onSearch={setSearch} />
        <div className="card">
          <table className="table">
            <thead><tr><th>Phone</th><th>Amount</th><th>Status</th><th>Coupon</th><th>Payment ID</th><th>Time</th></tr></thead>
            <tbody>
              {currentItems.map(t=>(
                <tr key={t._id}>
                  <td>{t.phone}</td>
                  <td>{t.amount}</td>
                  <td>{t.status}</td>
                  <td>{t.coupon? t.coupon.toString().slice(0,8):"-"}</td>
                  <td>{t.paymentId}</td>
                  <td>{new Date(t.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredTxs.length / itemsPerPage) }, (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}