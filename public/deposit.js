function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));


  function handleDeposit(amount) {
    fetch(`/account/update/${loggedInUser.email}/${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
         
          console.log('JSON:', data); // Log the entire data object for debugging
          setStatus(`${data.value.name}, your new balance is ${data.value.balance} dollars.`);
          setShow(false);
        } catch (err) {
          setStatus('Deposit failed');
          console.error('Error:', err); // Log the error for debugging
        }
      })
      .catch(error => {
        setStatus('Deposit failed');
        console.error('Fetch Error:', error); // Log fetch errors
      });
  }
  
  return (
    <>
    <div className="hi-msg"></div>
    <Card
      txtcolor="white "
      bgcolor="danger "
      header={<h3>Deposit</h3>}
      status={status}
      body={
        show ? (
          <DepositForm user={loggedInUser} handleDeposit={handleDeposit} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} user={loggedInUser} />
        )
      }/>
    </>
  );

  function DepositMsg(props) {
  return (
    <>
    <h5>Success</h5>
     
    {/* <h5>Success {props.user.name}, your new balance is {props.user.balance} dollars</h5> */}
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus('');
        }}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [amount, setAmount] = React.useState('');

  function handle() {
    props.handleDeposit(amount);
  }

  return (
    <>
     Welcome Back: {props.user.name} {/* Display the user's name */}
        <br />
      Amount<br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)}
      /><br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  );
 }
}
/*function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  //const ctx = React.useContext(UserContext);  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  function handleDeposit(amount) {
    fetch(`/account/update/${loggedInUser.email}/${amount}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
         
          console.log('JSON:', data); // Log the entire data object for debugging
          setStatus(`${data.value.name}, your new balance is ${data.value.balance} dollars.`);
          setShow(false);
        } catch (err) {
          setStatus('Deposit failed');
          console.error('Error:', err); // Log the error for debugging
        }
      })
      .catch(error => {
        setStatus('Deposit failed');
        console.error('Fetch Error:', error); // Log fetch errors
      });
  }
  return (
    <Card
      bgcolor="danger"
      header={<h3>Deposit</h3>}
      status={status}
      body={
        show ? (
          <DepositForm user={loggedInUser} handleDeposit={handleDeposit} />
        ) : (
          <DepositMsg setShow={setShow} setStatus={setStatus} user={loggedInUser} />
        )
      }
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 
function DepositForm(props) {
  const [amount, setAmount] = React.useState('');
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  function handle() {
    props.handleDeposit(amount);
  }

  return (
    <>
     Welcome Back: {loggedInUser} {/* Display the user's name *//*}
        <br />
      Amount<br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.currentTarget.value)}
      /><br />

      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  );
}
/*function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${email}/${amount}`)
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
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}*/