import TrackPlayer from 'react-native-track-player'

module.exports = async (data) =>{
    if(data.type == 'playback-state') {
    }else if(data.type == 'remote-play') {
        TrackPlayer.play();
    } else if(data.type == 'remote-seek') {
        TrackPlayer.seekTo(data.position);
    }else if (data.type == 'remote-stop') {
        TrackPlayer.stop();
    }else if (data.type == 'remote-pause') {
        TrackPlayer.pause();
    }

};