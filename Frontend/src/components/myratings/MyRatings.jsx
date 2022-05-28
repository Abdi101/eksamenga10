import "./myratings.css";
import ViewStars from '../coffeeDisplay/ViewStars';
import Navbar from '../navbar/Navbar';
import SingleRating from "./SingleRating";
import Header from "../header/Header";

function MyRatings(props) {

    const userToken = localStorage.getItem('userToken');

    return (
        <div>
            <Header />

            {
                userToken && <div style={{
                    backgroundColor: '#eee',
                    width: '100%',
                    margin: 0
                }}>
                    <Navbar />
                </div>
            }

            <div className="containerInner">

                <SingleRating />
                <SingleRating />
                <SingleRating />
                <SingleRating />

            </div>
        </div>
    )
}

export default MyRatings;
