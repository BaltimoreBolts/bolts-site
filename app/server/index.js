const fs = require('fs');

const loadData = function (name) {
    return fs.readFileSync(`app/data/${name}.json`);
};

module.exports = function (express) {
    const router = express.Router();

    router.get('/history', (req, res) => {
        res.send(loadData('history'));
    });

    router.get('/sponsors', (req, res) => {
        res.send(loadData('sponsors'));
    });

    return router;
};
