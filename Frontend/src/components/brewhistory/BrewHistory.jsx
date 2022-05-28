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
          backgroundColor: '#1b1c23',
          width: '100%',
          margin: 0
        }}>
        <Navbar />
      </div>
      <h1>Brew history</h1>
      <div className="containerInner container neumorphism-card" style={{ marginTop: "20px", color: "#d9d9d9" }}>
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
        <SingleBrewHistory />
      </div>
    </>
  )
}

export default BrewHistory;
