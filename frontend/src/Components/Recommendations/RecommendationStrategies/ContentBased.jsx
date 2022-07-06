import { getCosineSimilarityRowVector, sortByScore, getItemIndexByTitle } from './common';


  // Compute similarities based on input movie
function predictWithContentBased(X, ItemsInList, title) {
  const { index } = getItemIndexByTitle(ItemsInList, title);


 // Enrich the vector to convey all information
  // Use references from before which we kept track of
  const contentBasedRecommendation = cosineSimilarityRowVector.map(
    (value, key) => ({
      score: value,
      movieId: ItemsInList[key].id,
    })
  );

  return sortByScore(contentBasedRecommendation);
}

export default predictWithContentBased;