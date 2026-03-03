import {Router} from 'express'

export const router = Router();

//Routing
router.get("/", (req, res) => {
    res.json({
        status: 'success',
        msg: 'GET correcto',
        code: 200
    })
});

router.post("/", (req, res) => {
    res.json({
        status: "success",
        msg: "POST correcto",
        code: 200
    });
});