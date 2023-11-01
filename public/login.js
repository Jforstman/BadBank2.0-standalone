function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const [message, setMessage] = React.useState(""); 
  const [user, setUser] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const ctx = React.useContext(UserContext);
  return (
    <Card
      bgcolor="danger"
      header={<h3>Login</h3>}
      status={status}
      body={
        show ? (
          <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser} />
        ) : (
          <LoginMsg setShow={setShow} setStatus={setStatus} user={user} />
        )
      }
    />
  );

 function LoginForm() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    

    function handleLogin() {

      // validate fields
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;
      
      // Firebase auth
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(
        email,
        password
      );
      firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          console.log(firebaseUser);
          console.log(email, password);

          // get account info from MongoDB
          fetch(`/account/login/${email}/${password}`)
          .then(response => response.text())
          .then(text => {
            try{
              const data = JSON.parse(text);
              setShow(false);
              setUser(data.name);
              setLoaded(true);
              setSuccess(true);
              ctx.user = data.name;
              ctx.email = data.email;
            } catch {
              setMessage(text);
              setSuccess(false);
              setShow(false);
            }
          });
        } else {
          //error codes
          setStatus("unAuthorized User. Please create a new account.");   
          setTimeout(() => setStatus(""), 3000);
        }
      });
      promise.catch((e) => {
        setLoaded(false);
        console.log(e.message)});       
    }

    return (
      <>
        Email
        <br />
        <input
          type="input"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Password
        <br />
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        <div className="login-btn">
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleLogin}
            disabled={disabled}
            
          >Login</button>
        </div>
      </>
    );
  }

  function LoginMsg(props) {
    return success ? (
      <>
        <h5>Login Success</h5>
        <a href="#/balance/">
          <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
          >Go to Account</button>
        </a>
      </>
    ) : (
      <>
        <h5>{message}</h5>
        <button
          type="submit"
          className="btn btn-light"
          onClick={() => props.setShow(true)}
        >Retry</button>
      </>
    );
  }

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}

// function LoginMsg(props) {
//   return (
//     <>
//       <h5>Welcome: {props.user ? props.user.name : 'Guest'}</h5>
//       <button
//         type="submit"
//         className="btn btn-light"
//         onClick={() => props.setShow(true)}
//       >
//         Authenticate again
//       </button>
//     </>
//   );
// }
// function LoginForm(props) {
//     const [email, setEmail] = React.useState('');
//     const [password, setPassword] = React.useState('');
  
//     function handle() {
//       fetch(`/account/login/${email}/${password}`)
//         .then(response => response.text())
//         .then(text => {
//           try {
//             const data = JSON.parse(text);
//             // Assuming the server response includes user data like id, name, etc.
//             // Store user data in localStorage
//             localStorage.setItem('user', JSON.stringify(data));
//             console.log('Balance:', data.balance);
//             console.log('User:', data.name);
//             props.setStatus('');
//             props.setShow(false);
//             props.setUser(data); 
//             console.log('JSON:', data);
//           } catch(err) {
//             props.setStatus(text);
//             console.log('err:', text);
//           }
//         });
//     }
  
//     return (
//       <>
//         Email<br/>
//         <input type="input"
//           className="form-control"
//           placeholder="Enter email"
//           value={email}
//           onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
//         Password<br/>
//         <input type="password"
//           className="form-control"
//           placeholder="Enter password"
//           value={password}
//           onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
//         <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
//       </>
//     );
//   }
  

/*function LoginMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Authenticate again
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            props.setShow(false);
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

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);*/
