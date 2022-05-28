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
          backgroundColor: '#444',
          width: '100%',
          margin: 0
        }}>
        <Navbar />
      </div>
      <h1>Brew history</h1>
      <div className="containerInner container neumorphism-card" style={{ marginTop: "20px", color: "black" }}>
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
      </div>
    </>
  )
}

export default BrewHistory;
