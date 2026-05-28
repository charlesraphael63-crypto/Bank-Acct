import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Css/Hero.css";

const Hero = () => {
  const BaseURL = import.meta.env.VITE_BASE_URL;
  const [totalBalance, setTotalBalance] = useState(0.0);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${BaseURL}totalBalance`);
      setTotalBalance(res.data.totalBalance || 0);
      console.log(res);
    } catch (err) {
      console.log("Error fetching balance:", err);
    } finally {
    }
  };
  useEffect(() => {
    fetchBalance();
  }, [BaseURL]);

  return (
    <section className="bankHero">
      <div className="bankHeroLeft">
        <div className="bankTransferCard">
          <h2 className="bankTransferTitle">Transfer Funds</h2>

          <div className="bankFormGroup">
            <label className="bankLabel">From Account</label>
            <select className="bankSelect">
              <option value="">Select an account</option>
            </select>
          </div>

          <div className="bankFormGroup">
            <label className="bankLabel">Recipient Email</label>
            <input
              className="bankInput"
              type="email"
              placeholder="E.g., jane@gmail.com"
            />
          </div>

          <div className="bankFormGroup">
            <label className="bankLabel">Recipient Account Number</label>
            <input
              className="bankInput"
              type="text"
              placeholder="E.g., 987654321"
            />
          </div>

          <div className="bankFormGroup">
            <label className="bankLabel">Amount (₦)</label>
            <input className="bankInput" type="number" placeholder="₦ 0.00" />
          </div>

          <div className="bankFormGroup">
            <label className="bankLabel">Memo (Optional)</label>
            <textarea
              className="bankTextarea"
              placeholder="Rent, dinner, etc."
            ></textarea>
          </div>

          <button className="bankSendBtn">Send Transfer</button>
        </div>
      </div>

      <div className="bankHeroRight">
        <div className="bankBalanceCard">
          <p className="bankBalanceLabel">Available Balance</p>
          <h1 className="bankBalanceAmount">{`₦${totalBalance.toFixed(2)}`}</h1>
          <p className="bankBalanceAccounts">Account Holder</p>
        </div>

        <div className="bankTransactionCard">
          <h3 className="bankTransactionTitle">Transaction History</h3>
          <p className="bankNoTx">No transactions yet.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
