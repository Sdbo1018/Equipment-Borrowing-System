function sendSuccess(res, data, status = 200) {
  return res.status(status).json({ success: true, data });
}

function sendError(res, status, message, details = null) {
  return res.status(status).json({
    success: false,
    error: { message, details },
  });
}

module.exports = { sendSuccess, sendError };
