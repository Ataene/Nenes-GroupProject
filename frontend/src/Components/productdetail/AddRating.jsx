// This snippet file was generated by processing the source file:
// ./firestore-next/test.firestore.js
//
// To update the snippets in this file, edit the source and then run
// 'npm run snippets'.

// [START add_rating_transaction_modular]
import { collection, doc, runTransaction } from "firebase/firestore";

async function addRating(restaurantRef, rating) {
  // Create a reference for a new rating, for use inside the transaction
  const ratingRef = doc(collection(restaurantRef, "ratings"));

  // In a transaction, add the new rating and update the aggregate totals
  await runTransaction(db, async (transaction) => {
    const res = await transaction.get(restaurantRef);
    if (!res.exists()) {
      throw "Document does not exist!";
    }

    // Compute new number of ratings
    const newNumRatings = res.data().numRatings + 1;

    // Compute new average rating
    const oldRatingTotal = res.data().avgRating * res.data().numRatings;
    const newAvgRating = (oldRatingTotal + rating) / newNumRatings;

    // Commit to Firestore
    transaction.update(restaurantRef, {
      numRatings: newNumRatings,
      avgRating: newAvgRating,
    });
    transaction.set(ratingRef, { rating: rating });
  });
}
// [END add_rating_transaction_modular]
