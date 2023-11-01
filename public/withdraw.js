function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const[balance, setBalance] = React.useState("");
  const [status, setStatus] = React.useState('');  
  const ctx = React.useContext(UserContext);

  
    //const updateUserBalance = (newBalance) => {
      //setLoggedInUser(prevUser => ({ ...prevUser, balance: newBalance }));
    //};
  return (
    <Card
      bgcolor="danger"
      header={<h3>Withdrawal</h3>}
      status={status}
      body={show ? (
            <WithdrawForm
              setShow={setShow}
              setStatus={setStatus}
              user={loggedInUser}
              updateUserBalance={updateUserBalance}
            />
          ) : (
            <WithdrawMsg user={loggedInUser} setShow={setShow} setStatus={setStatus} />
          )
        }
    />
  );
function WithdrawForm() {
    const [withdraw, setWithdraw] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleWithdraw() {
      //validate input from user
      if (!validate(Number(withdraw), balance)) return;

      // update user balance in MongoDB 
      fetch(`/account/update/${ctx.email}/-${Number(withdraw)}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setShow(false);
          setAmount(data.amount);
          console.log('JSON:', data);
        } catch(err) {
          console.log('err:', text);
        }
      });
      setBalance(balance - withdraw);
    }

    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        Withdraw Amount
        <input
          type="input"
          className="form-control"
          id="withdraw"
          placeholder="Withdraw Amount"
          value={withdraw}
          onChange={(e) => {
            setWithdraw(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleWithdraw}
          disabled={disabled}
        >Withdraw</button>
      </>
    );
  }

  function WithdrawMsg(props) {
    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Withdrawl</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >Withdraw Again</button>
      </>
    );
  }

  function validate(withdraw, balance) {
    if (isNaN(withdraw)) {
      setStatus("Error: did not enter a valid number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw > balance) {
      setStatus("Error: Insuffienct funds");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (withdraw < 1) {
      setStatus("Error: Lowest withdrawl amount is $1");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}


// function WithdrawMsg(props){
//   return(<>
//     <h5>Success {props.user.name}, your new balance is {props.updateUserBalance} dollars</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => {
//         props.setShow(true);
//         props.setStatus('');
//       }}>
//         Withdraw again
//     </button>
//   </>);
// }

// function WithdrawForm(props){
//   //const [email, setEmail]   = React.useState('');
//   const [amount, setAmount] = React.useState('');
//   const loggedInUser = JSON.parse(localStorage.getItem('user'));

//   function handle() {
//       fetch(`/account/update/${props.user.email}/-${amount}`)
//         .then(response => response.text())
//         .then(text => {
//           try {
//             const data = JSON.parse(text);
//             props.setStatus(JSON.stringify(data.value));
//             props.setShow(false);
//             props.updateUserBalance(data.newBalance); // Update user balance after successful withdrawal
//             console.log('JSON:', data);
//           } catch (err) {
//             props.setStatus('Withdrawal failed');
//             console.log('err:', text);
//           }
//         });
//     }

//   return (
//       <>
//         Welcome Back: {loggedInUser} <br />
//         Amount<br />
//         <input
//           type="number"
//           className="form-control"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={e => setAmount(e.currentTarget.value)}
//         />
//         <br />
  
//         <button type="submit" className="btn btn-light" onClick={handle}>
//           Withdraw
//         </button>
//       </>
//     );
  /*function handle(){
    fetch(`/account/update/${email}/-${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }*/


  /*return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);*/

