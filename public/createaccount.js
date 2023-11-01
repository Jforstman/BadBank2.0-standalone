function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const ctx = React.useContext(UserContext);
  
  return (
    <div className='CreateAccountPage'>
    <div id='user-info'><h1 className='user-info'></h1></div>
      <Card
        txtcolor="white"
        bgcolor="danger"
        header={<h5>Create Account</h5>}
        status={status}
        body={
          show ? (
            <CreateAccountForm setShow={setShow} />
          ) : (
            <CreateMessage setShow={setShow} />
          )
        }
      />
    </div>
  );

  function CreateAccountForm(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(true);
    

    function handleCreate() {
      
      // validate field requirements are met
      if (!validate(name, "name")) return;
      if (!validate(email, "email")) return;
      if (!validate(password, "password")) return;
      
      // OAuth with Google Firebase
      const auth = firebase.auth();
      const promise = auth.createUserWithEmailAndPassword(
      email,
      password
      );
      promise.then(()=> {
        //create user in MongoDB
        const url = `/account/create/${name}/${email}/${password}`;
        (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
        })();
      })
      promise.catch((e) => console.log(e.message));
        props.setShow(false);
    }

    return (
      <>
        Name
        <br />
        <input
          type="input"
          className="form-control"
          id="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            setDisabled(false);
          }}
        />
        <br />
        Email address
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
        <button
          type="submit"
          className="btn btn-light"
          onClick={handleCreate}
          disabled={disabled}
        >Create Account</button>
      </>
    );
  }

  function CreateMessage() {
    return (
      <>
        <h5 id="status">Account created, please Login.</h5>
        <a href="#/login/">
          <button
            type="submit"
            className="btn btn-light"
            id="status-btn"
          >Login to Account</button>
        </a>
      </>
    );
  }


  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " is required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "password" && field.length < 8) {
      setStatus("Error: " + label + " must be at least 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
}
/*
function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  //const ctx = React.useContext(UserContext);*/

  /*function validate(field, label){
      if (!field) {
        setStatus('Error: ' + label);
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      if (password.length < 8) {
        setStatus('Password must be at least 8 characters');
        setTimeout(() => setStatus(''), 5000);
        return false;
      }
      return true;
  }*/

  /*function handle(){
    console.log(name,email,password);
    //ctx.users.push({name, email, password})
    const url = `/account/create/${name}/${email}/${password}`;
    (async () => {
        var res  = await fetch(url);
        var data = await res.json();    
        console.log(data);        
    })();
    props.setShow(false);
  }  */  

  /*return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    <button disabled={!name && !email && !password} type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>

  </>);*/
