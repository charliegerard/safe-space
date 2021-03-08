const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");

function run() {
  const filterEmailChain = require('./filterEmailChain');

  try {
    const githubToken = core.getInput("GITHUB_TOKEN");
    const octokit = new Octokit({ auth: githubToken });
    const customMessage = core.getInput("message");
    const { context } = github;
    const repository = context.payload.repository;

    if (context.payload.comment) {
      if (context.payload.action === "created" || context.payload.action === "edited") {
        const issueNumber = context.payload.issue.number;

        const comment = context.payload.comment.body;
        const commentObject = context.payload.comment;

        const filteredComment = filterEmailChain(comment);
        console.log(filteredComment);

        const commentAuthor = commentObject.user.login;
        const message = customMessage ? customMessage : `Hey @${commentAuthor}! 👋 <br/> You're great 😔</br>🙂`;
        console.log('this is a test of console logging from an action 👋');

        const ignore = octokit.issues.createComment({
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: issueNumber,
          body: message,
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
