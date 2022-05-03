import React from 'react';
import NavBar from '../components/navbar';
import Foot from '../components/footer';

function closeAccount() {
    return (
      
  <div>
      <header className="App-header">
         <h1> ATM SYSTEM PROJECT </h1>
         <NavBar />
      </header>
       

      <body  className="profilex" >
        <div class="container">
         <table class="table">
         <thead id="thead" style="background-color: #26a2af">
         <tr>
             <th scope="col">Account Number</th>
             <th scope="col">Balance</th>
             <th scope="col">Account Type</th>
             <th scope="col"> Action </th>
         </tr>
         </thead>
 
         <tr>
         /* Link to database and display account info here (account_id, balance, account_type) */
             <th>Account Number data</th>
             <th>Balance data</th>
             <th>Account Type data</th>
             <th>
                 <a href='#' type='button' class="btn btn-danger"> Close </a>

             </th>
            <br></br>
            /* Function for CLOSE button to ask to reenter password for verification before close account */
            /* If balance > 0, ask user if they want to get a check or transfer to another account */
         </tr>

        </table>
        </div>
      </body>
     <footer>
   <Foot />
 </footer> 

</div>



        
    )
}

export default closeAccount;
