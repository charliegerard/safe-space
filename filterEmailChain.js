module.exports = function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }
  console.log('Reached filter');
  return issueComment.toLowerCase();
};