module.exports = async function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }

  const filterComment = async (issueComment) => {
    const OUTLOOK_EMAIL_REGEX = /^\s*(From:.*[^]*)\b(?:unsubscribe.)$/gm;
    const GMAIL_EMAIL_REGEX = /^\s*(on .*[^]*)\b(wrote:.*[^]*)+(reply to this email directly,.*[^]*)+>(.*\s*)$/gm;

    if (issueComment.match(OUTLOOK_EMAIL_REGEX) !== null) {
      console.log('Filtering issue comment for email remenants');
      const filteredComment = async () => {
        return issueComment.replace(OUTLOOK_EMAIL_REGEX, '');
      };
      return await filteredComment();
    } else if (issueComment.match(GMAIL_EMAIL_REGEX) !== null) {
      return issueComment.replace(GMAIL_EMAIL_REGEX, '');
    } else {
      console.log('No email reply detected');
      return false;
    }
  };

  return await filterComment(issueComment);

};
