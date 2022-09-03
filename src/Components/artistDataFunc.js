const artistDataFunc = (data) => {
  // Sort data alphabetically by artist names
  const tempArtistData = data().sort(function (a, b) {
    return a.artist_name.localeCompare(b.artist_name);
  });

  const artistData = [];
  let skipIndex = false;

  // Combine the duplicate
  tempArtistData.map((artist, index) => {
    if (skipIndex === true) {
      skipIndex = false;
    } else {
      if (index < 27) {
        // If the next item artist name is equal to the current one
        if (tempArtistData[index + 1].artist_name === artist.artist_name) {
          const {
            album_cover,
            album_name,
            album_photo,
            song_audio,
            song_names,
          } = tempArtistData[index + 1];

          const tempSongNames = `${song_names},${artist.song_names}`;
          const tempSongAudio = `${song_audio},${artist.song_audio}`;

          const songNames = tempSongNames.split(",");
          const songAudio = tempSongAudio.split(",");

          // Merge the data together
          const combinedArtists = {
            album_cover: [album_cover, artist.album_cover],
            album_name: [album_name, artist.album_name],
            album_photo: [album_photo, artist.album_photo],
            artist_cover: artist.artist_cover,
            artist_name: artist.artist_name,
            artist_photo: artist.artist_photo,
            id: artist.id,
            song_audio: songAudio,
            song_names: songNames,
            artist_shadow: artist.artist_shadow,
            song_lengths: artist.song_lengths,
          };
          artistData.push(combinedArtists);
          skipIndex = true;
        }

        // If the next item artist name isn't equal to the current one
        else {
          artistData.push(artist);
          skipIndex = false;
        }
      } else {
        artistData.push(artist);
      }
    }
  });

  return artistData;
};

export default artistDataFunc;
