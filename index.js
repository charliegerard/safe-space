const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");

function run() {
  const filterEmailChain = require('./filterEmailChain');

  try {
    const githubToken = core.getInput("GITHUB_TOKEN");
    const octokit = new Octokit({ auth: githubToken });
    const { context } = github;
    const repository = context.payload.repository;

    if (context.payload.comment) {
      if (context.payload.action === "created" || context.payload.action === "edited") {
        const issueNumber = context.payload.issue.number;

        const commentBody = context.payload.comment.body;
        const commentId = context.payload.comment.id;

        const filteredComment = filterEmailChain(commentBody);
        const message = `<br/><sub>🤖 - Edited by BossBot - 🤖</sub>`;

        if (filteredComment !== commentBody) {
          const revisedMessage = filteredComment + message;
          console.log('Issue comment meta: ', 'Repo owner:', repository.owner.login, 'Issue number: ', issueNumber, 'Comment id: ', commentId);

          const ignore = octokit.issues.updateComment({
            owner: repository.owner.login,
            repo: repository.name,
            comment_id: commentId,
            body: revisedMessage,
          });
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
