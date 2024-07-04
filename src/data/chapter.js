import Chapter from 'thoron';
import map from './map';
import unitFactory from './unitFactory';

const chapter = new Chapter({ map });
chapter.addUnit({
  record: unitFactory(),
  position: { x: 0, y: 0 }
});
chapter.addUnit({
  record: unitFactory(),
  position: { x: 2, y: 1 }
})

export default chapter