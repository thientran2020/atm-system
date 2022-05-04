import React from 'react';

export default function MobileDeposit() {
  return (
    <div className="div-container">
      <h1>Mobile Deposit</h1>
    </div>
  )
}

//import React from 'react';
//import NavBar from '../components/navbar';
//import Foot from '../components/footer';
//function mobileDeposit() {

//    return (

//        <div>
//            <header className="App-header">
//                <h1> ATM SYSTEM PROJECT </h1>
//                <NavBar />
//            </header>

//            <body className="profilexFontsAdded" >
//                <h1>Mobile Deposit Page</h1>
//                <br></br>

//                {/* the line below is experimental for accessing the database*/}
//                <form action="/" method="POST">
//                    <label>Upload a photo of your check: </label>
//                    <input type="file" id="checkImage" name="checkImage" accept="image/*" />
//                    <br></br>
//                    <br></br>
//                    <br></br>

//                    <label>Enter check amount: </label>
//                    <label for="checkAmount"> $ </label>
//                    <input type="number" id="checkAmount" name="checkAmount" min="0.00" step="0.01"
//                        max="999999.99" placeholder="0.00" />
//                    <br></br>
//                    <br></br>

//                    <label>Deposit into: </label>
//                    <select id="accounts" name="accounts">
//                        <option selected="true" value="accountSelect">Select account...</option>
//                        <option value="Checking">Checking-0543</option>
//                        <option value="Savings">Savings-0544</option>
//                    </select>
//                    <br></br>

//                    <input type="submit" />
//                </form>
//            </body>
//            <footer>
//                <Foot />
//            </footer>
//        </div>

//    )
//}
//export default mobileDeposit;