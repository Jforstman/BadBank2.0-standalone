function AllData(){
    const [data, setData] = React.useState([]);
    const[loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {

        // fetch all accounts from API
        fetch('/account/all')
          .then(response => response.json())
          .then(data => {
              console.log(data);
              setData(data);
        })
  
        setLoaded(true);

  }, []);

    return (<>
        <h5>All Data in Store:</h5>
        {data}
    </>);
}
