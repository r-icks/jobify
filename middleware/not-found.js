const notFoundMiddleware = (req, res) => {
    res.send("Route to the server does not exceed").status(404);
}

export default notFoundMiddleware;