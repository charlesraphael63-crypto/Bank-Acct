import React, { useState, useContext } from "react";
import "./Css/Hero.css";

const Hero = () => {
  return (
    <section class="bankHero">
      <div class="bankHeroLeft">
        <div class="bankTransferCard">
          <h2 class="bankTransferTitle">Transfer Funds</h2>

          <div class="bankFormGroup">
            <label class="bankLabel">From Account</label>
            <select class="bankSelect">
              <option value="">Select an account</option>
            </select>
          </div>

          <div class="bankFormGroup">
            <label class="bankLabel">Recipient Email</label>
            <input
              class="bankInput"
              type="email"
              placeholder="E.g., jane@gmail.com"
            />
          </div>

          <div class="bankFormGroup">
            <label class="bankLabel">Recipient Account Number</label>
            <input
              class="bankInput"
              type="text"
              placeholder="E.g., 987654321"
            />
          </div>

          <div class="bankFormGroup">
            <label class="bankLabel">Amount (₦)</label>
            <input class="bankInput" type="number" placeholder="₦ 0.00" />
          </div>

          <div class="bankFormGroup">
            <label class="bankLabel">Memo (Optional)</label>
            <textarea
              class="bankTextarea"
              placeholder="Rent, dinner, etc."
            ></textarea>
          </div>

          <button class="bankSendBtn">Send Transfer</button>
        </div>
      </div>

      <div class="bankHeroRight">
        <div class="bankBalanceCard">
          <p class="bankBalanceLabel">Available Balance</p>
          <h1 class="bankBalanceAmount">₦0.00</h1>
          <p class="bankBalanceAccounts">Account Holder</p>
        </div>

        <div class="bankTransactionCard">
          <h3 class="bankTransactionTitle">Transaction History</h3>
          <p class="bankNoTx">No transactions yet.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
