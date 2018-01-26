import TrackPlayer from 'react-native-track-player'


module.exports = async (data) =>{

    if(data.type == 'playback-state') {
        // Update the UI with the new state
    }else if(data.type == 'remote-play') {
        // The play button was pressed, we can forward this command to the player using
        TrackPlayer.play();
    } else if(data.type == 'remote-seek') {
        // Again, we can forward this command to the player using
        TrackPlayer.seekTo(data.position);
    }else if (data.type == 'remote-stop') {
        TrackPlayer.stop();
    }

};