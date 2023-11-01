function Deposit() {
  const[balance, setBalance] = React.useState("");
  const[loaded, setLoaded] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);

  React.useEffect(() => {
    // get logged in user from MongoDB
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        console.log('JSON:', data)
      } catch (err) {
        console.log('err:', text)
      }
    })
    setLoaded(true);
  },[loaded])
  
  return (
    <>
    <div className="hi-msg">Welcome {ctx.user}</div>
    <Card
      txtcolor=" "
      bgcolor=" "
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMessage setShow={setShow} setStatus={setStatus}/>
        )
      }/>
    </>
  );

  function DepositForm(props) {
    const [deposit, setDeposit] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);

    function handleDeposit() {
      // validate amount entered into input field
      if (!validate(Number(deposit))) return;

      // update balance in MongoDB
      fetch(`/account/update/${ctx.email}/${deposit}`)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          props.setStatus(JSON.stringify(data.amount));
          props.setShow(false);
          console.log('JSON:', data);
        } catch(err) {
          props.setStatus('Deposit failed')
          console.log('err:', text);
        }
      });
      setBalance(balance + Number(deposit));
      setShow(false);
    }

    return (
      <>
        <span className="balance-information">Account Balance
         ${balance} 
         </span>
        <br />
        <br />
        Deposit Amount
        <input
          type="input"
          className="form-control"
          id="deposit"
          placeholder="Deposit Amount"
          value={deposit}
          onChange={(e) => {
            setDeposit(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleDeposit}
          disabled={disabled}
        >Deposit</button>
      </>
    );
  }

  function DepositMessage(props) {
    return (
      <>
        <span className="balance-information">Account Balance ${balance}</span>
        <br />
        <br />
        <h5>Successful Deposit</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => {props.setShow(true); props.setStatus('');}}
        >Deposit Again</button>
      </>
    );
  }

  function validate(deposit) {
    if (isNaN(deposit)) {
      setStatus("Error: did not enter a valid number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (deposit < 1) {
      setStatus("Error: Lowest deposit amount is $1");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
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