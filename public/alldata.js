function AllData(){
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    //fetch all accounts from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);
  return (
    <>
    <h1 className="bg-danger text-white">All User Data</h1>
          <div className="card text-white">
          <div className="card-body bg-danger">
              <h6>Name: {data.name}</h6>
              <p>Email: {data.email}</p>
              <p>Password: {data.password}</p>
              <p>Balance: {data.balance}</p>
            </div>
          </div>
    </>
  );
}

//<h5>All Data in Store: </h5>
      //{data}
