const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");

async function run() {
  const filterEmailChain = require('./filterEmailChain');

  const showAnnotation = core.getInput("show_annotation");

  let bossCopy;
  if ((showAnnotation === 'false') || (showAnnotation === false)) {
    console.log('BossBot Annotation disabled');
    bossCopy = '';
  } else {
    bossCopy = `<br/><sub>Edited by BossBot - 🤖</sub>`;
  }

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

        const filteredComment = await filterEmailChain(commentBody);

        if (filteredComment !== false) {
          const revisedMessage = filteredComment + bossCopy;
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

const ignore = run();
