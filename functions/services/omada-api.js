const login = async (req, res) => {
    // TODO: Implement login logic
    res.status(200).send({ "message": "login successful" });
};

const disconnect = async (req, res) => {
    // TODO: Implement disconnect logic
    res.status(200).send({ "message": "disconnect successful" });
};

module.exports = {
    login,
    disconnect
};