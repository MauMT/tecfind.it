const {Router} = require('express');
const router = Router();

router.get("/", (req,res) => {
    res.send("Hello World!");
});

router.get("/post/:id", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.get("/myposts", (req,res) => {
    res.send(`My Posts`);
});

router.post("/signup", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.get("/login", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.post("/login", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.get("/logout", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.post("/createpost", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.delete("/post", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.post("/createcomment", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

router.put("/post/status", (req,res) => {
    res.send(`Post ${req.params.id}`);
});

module.exports = router; 