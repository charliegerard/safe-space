module.exports = async function filterEmailChain(issueComment) {
  if (typeof issueComment != 'string') {
    throw new TypeError('filterEmailChain expects a string');
  }

  const filterReply = async (issueComment) => {
    /**
     * Remove email chains from an issue comment
     * Handles Outlook and Gmail
     * @type {RegExp}
     */
    const OUTLOOK_EMAIL_REGEX = /^\s*(From:.*[^]*)\b(?:unsubscribe.)$/gm;
    const GMAIL_EMAIL_REGEX = /^\s*(on .*[^]*)\b(wrote:.*[^]*)+(reply to this email directly,.*[^]*)+>(.*\s*)$/gm;

    if (issueComment.match(OUTLOOK_EMAIL_REGEX) !== null) {
      console.log('Filtering issue comment for outlook remenants');
      const filteredComment = async () => {
        return issueComment.replace(OUTLOOK_EMAIL_REGEX, '');
      };
      return await filteredComment();
    } else if (issueComment.match(GMAIL_EMAIL_REGEX) !== null) {
      console.log('Filtering issue comment for gmail remenants');
      const filteredComment = async () => {
        return issueComment.replace(GMAIL_EMAIL_REGEX, '');
      };
      return await filteredComment();
    } else {
      console.log('No email reply detected');
      return false;
    }
  };

  const filterBoss = async (updatedComment) => {
    /**
     * Remove any previous bossBot annotations
     * @type {RegExp}
     */
    const BOSS_COPY_REGEX = /^ *(<br\/><sub>🤖+.*🤖<\/sub>)\s*$/gm;
    if (updatedComment.match(BOSS_COPY_REGEX) !== null) {
      return updatedComment.replace(BOSS_COPY_REGEX, '');
    }
  };
  const updatedComment = await filterReply(issueComment);

  console.log('updatedComment is: ');
  console.log(updatedComment);

  if (updatedComment !== false) {
    return await filterBoss(updatedComment);
  } else {
    return updatedComment;
  }
};
