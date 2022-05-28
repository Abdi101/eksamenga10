import Header from "../header/Header";
import "../myratings/myratings.css"
import Navbar from "../navbar/Navbar";
import SingleBrewHistory from './SingleBrewHitory';

const BrewHistory = () => {
  return (
    <>
    <Header />
      <div
        style={{
          backgroundColor: '#eee',
          width: '100%',
          margin: 0
        }}>
        <Navbar />
      </div>
      <div className="containerInner" style={{ marginTop: "20px" }}>
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
      </div>
    </>
  )
}

export default BrewHistory;
