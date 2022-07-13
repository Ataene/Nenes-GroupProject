import similarity from "compute-cosine-similarity";

export function sortByScore(recommendation) {
  return recommendation.sort((a, b) => b.score - a.score);
}

export function getCosineSimilarityRowVector(matrix, index) {
  return matrix.map((rowRelative, i) => {
    return similarity(matrix[index], matrix[i]);
  });
}

export function getItemIndexByTitle(ItemsInDb, query) {
  const index = ItemsInDb.map((item) => item.title).indexOf(query);

  if (!index) {
    throw new Error("Item not found");
  }

  const { title, id } = ItemsInDb[index];
  return { index, title, id };
}