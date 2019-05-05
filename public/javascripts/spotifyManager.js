// game event listeners

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
    this.manager.clientCredentialsGrant()
      .then((data) => {
        // console.log(data);
        dis.manager.setAccessToken(data.body['access_token']);
      })
      .catch((err) => console.log(err));
  }
  getSongsForPlaylist (playlistId) {
    let dis = this;

    return new Promise((resolve, reject) => {
      dis.manager.getPlaylistTracks(playlistId)
        .then((data) => {
          data.body.items.map((item) => {
            dis.songs.push(item.track);
          });
          resolve(dis.songs);
        })
        .catch((err) => console.log(err));
    });
  }
}
module.exports = SpotifyManager;
