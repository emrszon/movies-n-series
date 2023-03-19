const TYPES = {
  movie: "Película",
  serie: "Serie"
}

const parseType = (string) => {
  if (["peli", "pelicula", "peliculas"].includes(string.toLowerCase())) return TYPES.movie;
  if  (["serie", "series"].includes(string.toLowerCase())) return TYPES.serie;
} 

module.exports = {
  TYPES,
  parseType
}