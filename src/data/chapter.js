import Chapter from 'thoron';
import map from './map';
import unitFactory from './unitFactory';

const chapter = new Chapter({ map });
chapter.addUnit(unitFactory(), { position: [0, 0] });

export default chapter