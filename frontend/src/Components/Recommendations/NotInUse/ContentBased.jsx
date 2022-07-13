import { getCosineSimilarityRowVector, sortByScore, getItemIndexByTitle } from './Common';


  // Compute similarities based items in database
function predictWithContentBased(X, ItemsInDb, title) {
  const { index } = getItemIndexByTitle(ItemsInDb, title);

  // Compute similarities based on input movie
  const cosineSimilarityRowVector = getCosineSimilarityRowVector(X, index);

  // Enrich the vector to convey all information
  const contentBasedRecommendation = cosineSimilarityRowVector.map(
    (value, key) => ({
      score: value,
      itemId: ItemsInDb[key].id,
    })
  );

  return sortByScore(contentBasedRecommendation);
}

export default predictWithContentBased;