import React from "react";
import Votes from "./components/Votes/Votes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <>
        <Votes />
        <ToastContainer />
      </>
    )
  }
}

export default App;