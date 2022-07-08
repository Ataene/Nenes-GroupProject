


function fromMetaDataFile(item) {
  ITEM_META_DATA[row.id] = {
    id: item.id,
    color: item.color,
    category: item.category,
    genres: softEval(row.genres, []),
    homepage: row.homepage,
    language: row.original_language,
    title: row.original_title,
    overview: row.overview,
    popularity: row.popularity,
    studio: softEval(row.production_companies, []),
    manufacturedDate: item.manufacturedDate,
    voteAverage: row.vote_average,
    voteCount: row.vote_count,
  };
}