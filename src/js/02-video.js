import Player from '@vimeo/player';
import _, { now } from 'lodash';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

function onTimeUpdate(timeupdate) {
  localStorage.setItem('videoplayer-current-time', timeupdate.seconds);
}

player.on('timeupdate', _.throttle(onTimeUpdate, 1000));
