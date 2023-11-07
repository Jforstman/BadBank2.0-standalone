function Withdraw() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [loggedInUser, setLoggedInUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  
    const updateUserBalance = (newBalance) => {
      setLoggedInUser(prevUser => ({ ...prevUser, balance: newBalance }));
    };
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
function WithdrawMsg(props) {
    return (
      <>
        <h5>Success {props.user.name}, your new balance is {props.updateUserBalance} dollars</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => {
            props.setShow(true);
            props.setStatus('');
          }}>
          Withdraw again
        </button>
      </>
    );
  }
  
  function WithdrawForm(props) {
    const [amount, setAmount] = React.useState('');
  
    function handle() {
      fetch(`/account/update/${props.user.email}/-${amount}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text);
            props.setStatus(JSON.stringify(data.value));
            props.setShow(false);
            props.updateUserBalance(data.newBalance); // Update user balance after successful withdrawal
            console.log('JSON:', data);
          } catch (err) {
            props.setStatus('Withdrawal failed');
            console.log('err:', text);
          }
        });
    }
  
    return (
      <>
        Welcome Back: {props.user.name} <br />
        Amount<br />
        <input
          type="number"
          className="form-control"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.currentTarget.value)}
        />
        <br />
  
        <button type="submit" className="btn btn-light" onClick={handle}>
          Withdraw
        </button>
      </>
    );
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

