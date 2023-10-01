import artists from '../data/artists.json'
import playlists from '../data/playlists.json'

export const getArtist = (userId) => {
  const artitsList = artists.find(artist => artist.id === userId)
  return new Promise((resolve) => {
    setTimeout(() => resolve(artitsList), 1000)
  }) 
}


export const getArtistPlayLists = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(playlists), 3000)
  }) 
}
