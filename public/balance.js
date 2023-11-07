function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  return (
    <Card
      bgcolor="danger"
      header={<h5>Balance Inquiry</h5>}
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  function handle(){
    fetch(`/account/findOne/${loggedInUser.email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(text);
            props.setShow(false);
            setBalance(user.balance);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}


// function Balance(){
//   const ctx = React.useContext(UserContext);
//   const [show, setShow] = React.useState(true)
//   const [status, setStatus] = React.useState('')
//   const [balance, setBalance] = React.useState('')
  
//   React.useEffect(() => {


// function BalanceMsg(){
//   return(<>
//     <h5>Success</h5>
//     <button type="submit" 
//       className="btn btn-light" 
//       onClick={() => {
//         setShow(true);
//         setStatus('');
//       }}>
//         Check balance again
//     </button>
//   </>);
//   }
// })

// function BalanceForm(){
//   const [email, setEmail]   = React.useState('');
//   const [balance, setBalance] = React.useState('');  
//   const ctx = React.useContext(UserContext);
//   function handle(){
//     fetch(`/account/findOne/${ctx.email}`)
//     .then(response => response.text())
//     .then(text => {
//         try {
//         const data = JSON.parse(text)
//         setBalance(data.balance)
//         if(data?.message){
//         console.log(data.message)
//         }
//         console.log('JSON:', JSON.stringify(data))
//       } catch (err) {
//         console.log('err:', text)
//         }
//     });
//   }
//   return (
//   <div className="card text-white bg-danger mb-3" style="max-width: 36rem;">
//   <div className="card-header">Account Balance</div>
//   <div className="card-body">
//     Email address<br/>
//   <input type="input" className="form-control" id="email" placeholder="Enter email" /><br/>
//   <button type="submit" id="submit" className="btn btn-light" onClick={handle}>Show Balance</button>
//   <div id="balanceStatus"></div>
//   </div>
// </div>

// );
// }  
// }

  // Get Logged in user from MongoDB
//     fetch(`/account/findOne/${ctx.email}`)
//     .then(response => response.text())
//     .then(text => {
//       try {
//         const data = JSON.parse(text)
//         setBalance(data.balance)
//         if(data.message){
//         console.log(data.message)
//         }
//         console.log('JSON:', JSON.stringify(data))
//       } catch (err) {
//         console.log('err:', text)
//       }
//     })},[])
//   };

  