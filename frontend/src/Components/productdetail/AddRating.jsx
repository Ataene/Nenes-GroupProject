import React from "react";
import { collection, doc, runTransaction } from "firebase/firestore";

const  addRating = (postedAds, rating) => {
  // Create a reference for a new rating, for use inside the transaction
  const ratingRef = doc(collection(postedAds, "ratings"));

  // In a transaction, add the new rating and update the aggregate totals
  await runTransaction(db, async (transaction) => {
    const res = await transaction.get(postedAds);
    if (!res.exists()) {
      throw "Document does not exist!";
    }

    // Compute new number of ratings
    const newNumRatings = res.data().numRatings + 1;

    // Compute new average rating
    const oldRatingTotal = res.data().avgRating * res.data().numRatings;
    const newAvgRating = (oldRatingTotal + rating) / newNumRatings;

    // Commit to Firestore
    transaction.update(postedAds, {
      numRatings: newNumRatings,
      avgRating: newAvgRating,
    });
    transaction.set(ratingRef, { rating: rating });
  });
}

export default addRating
