import math from "mathjs";

import { getCosineSimilarityRowVector, sortByScore } from "../RecommendationStrategies/common";

export function predictWithCfUserBased(
  ratingsGroupedByUser,
  ratingsGroupedByItem,
  userId
) {
  const { userItem } = getMatrices(
    ratingsGroupedByUser,
    ratingsGroupedByItem,
    userId
  );
  const { matrix, itemIds, userIndex } = userItem;

  const matrixNormalized = meanNormalizeByRowVector(matrix);
  const userRatingsRowVector = matrixNormalized[userIndex];

  const cosineSimilarityRowVector = getCosineSimilarityRowVector(
    matrixNormalized,
    userIndex
  );

  const predictedRatings = userRatingsRowVector.map((rating, itemIndex) => {
    const itemId = itemIds[itemIndex];

    const itemRatingsRowVector = getItemRatingsRowVector(
      matrixNormalized,
      itemIndex
    );

    let score;
    if (rating === 0) {
      score = getPredictedRating(
        itemRatingsRowVector,
        cosineSimilarityRowVector
      );
    } else {
      score = rating;
    }

    return { score, itemId };
  });

  return sortByScore(predictedRatings);
}

export function predictWithCfItemBased(
  ratingsGroupedByUser,
  ratingsGroupedByItem,
  userId
) {
  const { itemUser } = getMatrices(
    ratingsGroupedByUser,
    ratingsGroupedByItem,
    userId
  );
  const { matrix, itemIds, userIndex } = itemUser;

  const matrixNormalized = meanNormalizeByRowVector(matrix);
  const userRatingsRowVector = getUserRatingsRowVector(
    matrixNormalized,
    userIndex
  );

  const predictedRatings = userRatingsRowVector.map((rating, movieIndex) => {
    const itemId = itemIds[itemIndex];

    const cosineSimilarityRowVector = getCosineSimilarityRowVector(
      matrixNormalized,
      itemIndex
    );

    let score;
    if (rating === 0) {
      score = getPredictedRating(
        userRatingsRowVector,
        cosineSimilarityRowVector
      );
    } else {
      score = rating;
    }

    return { score, itemId };
  });

  return sortByScore(predictedRatings);
}

function getPredictedRating(ratingsRowVector, cosineSimilarityRowVector) {
  const N = 5;
  const neighborSelection = cosineSimilarityRowVector
    // keep track of rating and similarity
    .map((similarity, index) => ({
      similarity,
      rating: ratingsRowVector[index],
    }))
    // only neighbors with a rating
    .filter((value) => value.rating !== 0)
    // most similar neighbors on top
    .sort((a, b) => b.similarity - a.similarity)
    // N neighbors
    .slice(0, N);

  const numerator = neighborSelection.reduce((result, value) => {
    return result + value.similarity * value.rating;
  }, 0);

  const denominator = neighborSelection.reduce((result, value) => {
    return result + math.pow(value.similarity, 2);
  }, 0);

  return numerator / math.sqrt(denominator);
}

function getUserRatingsRowVector(itemBasedMatrix, userIndex) {
  return itemBasedMatrix.map((itemRatings) => {
    return itemRatings[userIndex];
  });
}

function getItemRatingsRowVector(userBasedMatrix, itemIndex) {
  return userBasedMatrix.map((userRatings) => {
    return userRatings[itemIndex];
  });
}

function meanNormalizeByRowVector(matrix) {
  return matrix.map((rowVector) => {
    return rowVector.map((cell) => {
      return cell !== 0 ? cell - getMean(rowVector) : cell;
    });
  });
}

function getMean(rowVector) {
  const valuesWithoutZeroes = rowVector.filter((cell) => cell !== 0);
  return valuesWithoutZeroes.length ? math.mean(valuesWithoutZeroes) : 0;
}

export function getMatrices(ratingsGroupedByUser, ratingsGroupedByItem, uId) {
  const itemUser = Object.keys(ratingsGroupedByItem).reduce(
    (result, itemId) => {
      const rowVector = Object.keys(ratingsGroupedByUser).map(
        (userId, userIndex) => {
          if (userId == uId) {
            result.userIndex = userIndex;
          }

          return getConditionalRating(ratingsGroupedByItem, itemId, userId);
        }
      );

      result.matrix.push(rowVector);
      result.itemIds.push(itemId);

      return result;
    },
    { matrix: [], itemIds: [], userIndex: null }
  );

  const userItem = Object.keys(ratingsGroupedByUser).reduce(
    (result, userId, userIndex) => {
      const rowVector = Object.keys(ratingsGroupedByItem).map((itemId) => {
        return getConditionalRating(ratingsGroupedByUser, userId, itemId);
      });

      result.matrix.push(rowVector);

      if (userId == uId) {
        result.userIndex = userIndex;
      }

      return result;
    },
    {
      matrix: [],
      movieIds: Object.keys(ratingsGroupedByItem),
      userIndex: null,
    }
  );

  return { itemUser, userItem };
}

function getConditionalRating(value, primaryKey, secondaryKey) {
  if (!value[primaryKey]) {
    return 0;
  }

  if (!value[primaryKey][secondaryKey]) {
    return 0;
  }

  return value[primaryKey][secondaryKey].rating;
}
