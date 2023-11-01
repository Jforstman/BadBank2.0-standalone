const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const DisplayContext = React.createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNESjnlDD2x6aetTeeO2oAJ7aTQF1tMSI",
  authDomain: "badbank-7c30a.firebaseapp.com",
  databaseURL: "https://badbank-7c30a-default-rtdb.firebaseio.com",
  projectId: "badbank-7c30a",
  storageBucket: "badbank-7c30a.appspot.com",
  messagingSenderId: "1069856094511",
  appId: "1:1069856094511:web:72ffa412c3af96d22dc9da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : 'bg-danger ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} style={{maxWidth: "36rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus'>{props.status}</div>)}
      </div>
    </div>      
  );    
}
