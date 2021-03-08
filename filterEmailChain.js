module.exports = function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }
  console.log('Filtering issue comment for email remenants');
  return issueComment.replace(/^\s*(From:.*[^]*)\b(?:unsubscribe.)$+/g, '');
};