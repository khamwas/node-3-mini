let allMessages = [{ username: "Boba Fett", message: "AHHHHHH" }];
module.exports = {
  getAllMessages: (req, res, next) => {
    return res.status(200).json(allMessages);
  },
  createMessage: (req, res, next) => {
    // console.log(req.body);
    allMessages.push(req.body);
    if (req.session.history) {
      req.session.history.push(req.body);
    } else {
      req.session.history = [req.body];
    }
    return res.status(200).json(allMessages);
  },
  getHistory: (req, res, next) => {
    return res.status(200).json(req.session.history);
  }
};
