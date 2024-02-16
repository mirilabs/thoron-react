import Chapter from 'thoron';
import map from './map';
import unitFactory from './unitFactory';

const chapter = new Chapter({ map });
chapter.addUnit({
  record: unitFactory(),
  position: { x: 0, y: 0 }
});

export default chapter