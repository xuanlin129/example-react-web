import { getNewOutlet } from 'reconnect.js';

const DimensionOutlet = getNewOutlet(
  'dimension',
  {
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    device: window.innerWidth < 576 ? 'mb' : 'pc',
  },
  { autoDelete: false }
);

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  DimensionOutlet.update({
    windowWidth: width,
    windowHeight: height,
    device: width < 576 ? 'mb' : 'pc',
  });
});
