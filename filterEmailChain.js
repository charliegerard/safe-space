module.exports = async function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }
  const OUTLOOK_EMAIL_REGEX = /\^\\s\*\(From:\.\*\[\^]\*\)\\b\(\?:unsubscribe.\)\$\+/g;
  if (issueComment.match(OUTLOOK_EMAIL_REGEX) !== null) {
    console.log('Filtering issue comment for email remenants');
    console.log(issueComment.match(OUTLOOK_EMAIL_REGEX));
    const filteredComment = async () => {
      issueComment.replace(OUTLOOK_EMAIL_REGEX, '');
    };
    return await filteredComment();
  }
  return false;
};
