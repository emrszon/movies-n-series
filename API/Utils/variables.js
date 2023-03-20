const TYPES = {
  movie: "Película",
  serie: "Serie"
}

const parseType = (string) => {
  if (["peli", "pelicula", "peliculas"].includes(string.toLowerCase())) return TYPES.movie;
  if  (["serie", "series"].includes(string.toLowerCase())) return TYPES.serie;
} 

const SORT_FIELDS = ["name", "type", "gender", "rating"]

const FILTER_FIELDS = ["name", "type", "gender"]

module.exports = {
  TYPES,
  parseType,
  SORT_FIELDS,
  FILTER_FIELDS
}