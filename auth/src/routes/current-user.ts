import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    if (!req.session?.jwt) {
        return res.send({ currentUser: null })
    }

    try {
        // Get secret from env var with Kubernetes
        const payload = jwt.verify(req.session.jwt, 'asdf');
        return res.send({ currentUser: payload })
    } catch (err) {
        return res.send({ currentUser: null })
    }
});

export { router as currentUserRouter };