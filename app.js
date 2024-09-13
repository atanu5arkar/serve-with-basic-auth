import express from "express";
import serveIndex from "serve-index";
import auth from "basic-auth";

const app = express();
const port = 5000;

const username = 'thatGuy', passwd = 'itsN0tMe';

app.get('/', (req, res, next) => {
    const credentials = auth(req);

    if (!credentials) {
        res.set({
            'WWW-Authenticate': 'Basic realm="Secure Area"',
            'Content-Type': 'text/plain'
        });
        return res.status(401).send('Authentication Required!');
    }
    const { name, pass } = credentials;
    
    if (username != name || passwd != pass) {
        res.set({
            'WWW-Authenticate': 'Basic realm="Secure Area"',
            'Content-Type': 'text/plain'
        });
        return res.status(401).send('Invalid Credentials!');
    }
    return next();
});

app.use(express.static('public'), serveIndex('public', { icons: true }));

app.listen(port, () =>
    console.log(`Server listening at ${port}.`));