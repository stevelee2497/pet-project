import Faker from 'faker';
import { BaseImagePath } from '../AppConstants';

export const parseUri = uri => ({ uri: `${BaseImagePath}/${uri}` });

export const randomImageUrl = (width, height) => `https://picsum.photos/id/${Faker.random.number({ min: 1, max: 100, })}/${width}/${height}`;

export const randomImage = (width, height) => ({
  uri: randomImageUrl(width, height),
});

const images = {
  home: require('../images/home.png'),
  chart: require('../images/chart.png'),
  circleUser: require('../images/circle-user.png'),
  bookSelf: require('../images/book-self.png'),
  music: require('../images/music.png'),
  player: require('../images/player.png'),
  audio: require('../images/audio.png'),
  bookShelf: require('../images/bookshelf.png')
};
export default images;
