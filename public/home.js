function Home(){
  return (
    <Card
      bgcolor="danger"
      txtcolor="white"
      header="Welcome to MyBank!"
      title="Click Login above to log into your account"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive"/>)}
    />
  );  
}
