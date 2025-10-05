import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/all';
import * as PIXI from 'pixi.js';
import './reset.css';

const VITE_GITHUB_PAGES_PATH =
  import.meta.env.BASE_URL !== '/' ? `${import.meta.env.BASE_URL}` : '';

const app = new PIXI.Application();

// gsap plugin
gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const init = async () => {
  await app.init({
    resizeTo: window,
    background: '#1099bb'
  });
  document.body.appendChild(app.canvas);

  // assets
  await PIXI.Assets.load([
    {
      alias: 'bunny',
      src: `${VITE_GITHUB_PAGES_PATH}/assets/images/bunny.png`
    }
  ]);

  // container
  const container = new PIXI.Container();
  app.stage.addChild(container);
  // graphics
  const graphics = new PIXI.Graphics();
  graphics.rect(0, 0, app.screen.width, app.screen.height);
  graphics.fill(0xde3249);
  container.addChild(graphics);
  // text
  const text = new PIXI.Text({ text: 'Container1' });
  text.pivot.set(0.5);
  text.position.set(
    app.screen.width / 2 - text.width / 2,
    app.screen.height / 2 - text.height / 2
  );
  container.addChild(text);

  // container
  const container2 = new PIXI.Container();
  app.stage.addChild(container2);
  // graphics
  const graphics2 = new PIXI.Graphics();
  graphics2.rect(0, 0, app.screen.width, app.screen.height);
  graphics2.fill(0x0032cf);
  container2.addChild(graphics2);
  // text
  const text2 = new PIXI.Text({ text: 'Container2' });
  text2.pivot.set(0.5);
  text2.position.set(
    app.screen.width / 2 - text2.width / 2,
    app.screen.height / 2 - text2.height / 2
  );
  container2.addChild(text2);
  // sprite
  const bunny = PIXI.Sprite.from('bunny');
  bunny.anchor.set(0.5);
  bunny.position.set(app.screen.width / 2, app.screen.height / 2 + 40);
  container2.addChild(bunny);

  window.setTimeout(() => {
    gsap
      .timeline({ defaults: { duration: 2 } })
      .to(container2, { alpha: 0.0 })
      .eventCallback('onComplete', () => {
        container2.destroy();
      });
  }, 5 * 1000);
};

init();
