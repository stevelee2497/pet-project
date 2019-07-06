import Faker from 'faker';

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
  bookShelf: require('../images/bookshelf.png'),
  bg: require('../images/bg.jpg'),
  search: require('../images/search.png'),
  refresh: require('../images/refresh.png'),
  book: require('../images/book.jpg'),
  back: require('../images/back.png'),
  download: require('../images/download.png'),
  bookmark: require('../images/bookmark.png'),
  listening: require('../images/listening.png'),
  star: require('../images/star.png')
};
export default images;
