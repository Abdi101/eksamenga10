//import './CoffeeRecipe.css';

const StarRating = (props) => {

    const ratingLevel = (level) => {
        switch(true) {
          case (level == 1):
            return "★☆☆☆☆";
            break;
          case (level == 2):
            return "★★☆☆☆";
            break;
          case (level == 3):
            return "★★★☆☆";
            break;
          case (level == 4):
            return "★★★★☆";
            break;
          case (level == 5):
            return "★★★★★";
            break;
          default:
            return "unknown";
        }
    }

    return (
        <span className="starRating">
        <b>Rating: </b>{ratingLevel(props.rating)}
        </span>
    );
}

export default StarRating;