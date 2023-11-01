function Home() {
  const ctx = React.useContext(UserContext);
  console.log(ctx);

  React.useEffect(() => {
    },[])
  return(
    <Card 
      bgcolor="danger"
      txtcolor="white"
      header={<>
      <h1>Welcome to MyBank!</h1>
      </>}
      title={<>
      <span>
      <h4>Click the Login button above to log into your account.</h4></span>
      </>}
      body={(<img src="bank.png" className="img-fluid"
      style={{opacity: '0.6' }} 
      alt="Responsive image"/>)}
      />
  );
}
