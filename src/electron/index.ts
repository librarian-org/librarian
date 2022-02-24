import Main from './Main';

(async () => {
  try {
    const main = new Main();
    await main.initialize();
  } catch (err) {
    console.error("ERROR INITIALIZING APP");
    console.error(err);
    throw err;
  }
})();
