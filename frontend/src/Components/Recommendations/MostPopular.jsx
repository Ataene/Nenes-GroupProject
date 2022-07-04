import { AuthContext } from "../../auth/AuthProvider";

import { FirebaseContext } from "../../auth/FirebaseProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

async function addRating(postedAds, ratings) {

    const [loading, setLoading] = useState(false);
    const [ratings, setRatings] = useState("");



  const postRatings = async (e) => {
    e.preventDefault();
    try {
      let collectionRef = collection(db, "postedAds");
      const response = await addDoc(collectionRef, {
        ratings,
        timeStamp: serverTimestamp(),
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

    
  await runRatings(db, async (ratings) => {
    const res = await ratings.get(ratingsRef);
    if (!res.exists()) {
      throw "Document does not exist!";
    }

    const newNumRatings = res.data().numRatings + 1;

    const oldRatingTotal = res.data().avgRating * res.data().numRatings;
    const newAvgRating = (oldRatingTotal + rating) / newNumRatings;

    ratings.update(ratingsRef, {
      numRatings: newNumRatings,
      avgRating: newAvgRating,
    });
    ratings.set(ratingRef, { rating: rating });
  });
}

// if rating: asc: show top 4 


  if (!postedAds) {
    return <p className="mx-auto">Loading Data...</p>;
  }
