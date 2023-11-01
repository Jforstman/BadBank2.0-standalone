function Balance(){
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true)
  const [status, setStatus] = React.useState('')
  const [balance, setBalance] = React.useState('')
  const[loaded, setLoaded] = React.useState(false);
  
  React.useEffect(() => {


   // Get Logged in user from MongoDB
    fetch(`/account/findOne/${ctx.email}`)
    .then(response => response.text())
    .then(text => {
      try {
        const data = JSON.parse(text)
        setBalance(data.balance)
        if(data.message){
        console.log(data.message)
        }
        console.log('JSON:', JSON.stringify(data))
      } catch (err) {
        console.log('err:', text)
      }
    })
    setLoaded(true);
  },[])
  return (
  <div class="card text-white bg-danger mb-3" style="max-width: 36rem;">
  <div class="card-header">Account Balance</div>
  <div class="card-body">
    Email address<br/>
  <input type="input" class="form-control" id="email" placeholder="Enter email" /><br/>
  <button type="submit" id="submit" class="btn btn-light" onClick={balance}>Show Balance</button>
  <div id="balanceStatus"></div>
  </div>
</div>

)};

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
// }

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

  