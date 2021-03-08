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
        const commentObject = context.payload.comment;

        const filteredComment = filterEmailChain(commentBody);
        console.log(filteredComment);

        const commentAuthor = commentObject.user.login;
        const message = `Hey @${commentAuthor}! 👋 <br/> You're great 😔</br>🙂`;

        console.log('owner', repository.owner, 'issue number: ', issueNumber, 'issue comment id: ', commentId);

        const ignore = octokit.issues.updateComment({
          owner: repository.owner.login,
          repo: repository.name,
          comment_id: commentId,
          body: filteredComment + message,
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
