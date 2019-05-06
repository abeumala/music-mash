const SpotifyWebApi = require('spotify-web-api-node');

class SpotifyManager {
  constructor () {
    this.manager = new SpotifyWebApi({
      clientId: 'dfb83778fd354330a501056a5b2d2f06',
      clientSecret: 'ad0b78adf93d49a790b8c74721f0ade2'
    });
    this.songs = [];
  }
  init () {
    let dis = this;
    return this.manager.clientCredentialsGrant()
      .then((data) => {
        dis.manager.setAccessToken(data.body['access_token']);
      })
      .catch((err) => console.log(err));
  }
  getSongsForPlaylist (playlistId) {
    let dis = this;

    return new Promise((resolve, reject) => { // promise to return asynchronos function in another file, a promise that waits;
      dis.manager.getPlaylistTracks(playlistId) // for another promise to be fulfilled then returns, if not we cant return promise form getSongsForPlaylist
        .then((data) => {
          data.body.items.map((item) => {
            dis.songs.push(item.track);
          });
          resolve(dis.songs);
        })
        .catch((err) => reject(err));
    });
  }
}

module.exports = SpotifyManager;
