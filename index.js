const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");

async function run() {
  const tf = require("@tensorflow/tfjs");
  const toxicity = require("@tensorflow-models/toxicity");
  await tf.setBackend("cpu");

  try {
    const githubToken = core.getInput("GITHUB_TOKEN");
    const octokit = new Octokit({ auth: githubToken });
    const customMessage = core.getInput("message");
    const toxicityThreshold = core.getInput("toxicity_threshold");
    const { context } = github;
    const repository = context.payload.repository;
    const threshold = toxicityThreshold ? toxicityThreshold : 0.9;

    if (context.payload.review && context.payload.action === "submitted") {
      const issueNumber = context.payload.pull_request.number;
      const model = await toxicity.load(threshold);
      const reviewComment = [context.payload.review.body];
      const reviewObject = context.payload.review;
      let toxicComment = undefined;
      model.classify(reviewComment).then((predictions) => {
        predictions.forEach((prediction) => {
          if (toxicComment) {
            return;
          }
          prediction.results.forEach((result, index) => {
            if (toxicComment) {
              return;
            }
            if (result.match) {
              const commentAuthor = reviewObject.user.login;
              toxicComment = reviewComment[0];
              const message = customMessage
                ? customMessage
                : `<img src="https://media.giphy.com/media/3ohzdQ1IynzclJldUQ/giphy.gif" width="400"/> </br>
                                      Hey @${commentAuthor}! 👋 <br/> PRs and issues should be safe environments but your comment: <strong>"${toxicComment}"</strong> was classified as potentially toxic! 😔</br>
                                      Please consider spending a few seconds editing it and feel free to delete me afterwards! 🙂`;

              return octokit.issues.createComment({
                owner: repository.owner.login,
                repo: repository.name,
                issue_number: issueNumber,
                body: message,
              });
            }
          });
        });
      });
    }
    if (context.payload.comment) {
      if (
        context.payload.action === "created" ||
        context.payoad.action === "edited"
      ) {
        const issueNumber = context.payload.issue.number;
        const model = await toxicity.load(threshold);
        const comment = [context.payload.comment.body];
        const commentObject = context.payload.comment;
        let toxicComment = undefined;
        model.classify(comment).then((predictions) => {
          predictions.forEach((prediction) => {
            if (toxicComment) {
              return;
            }
            prediction.results.forEach((result, index) => {
              if (toxicComment) {
                return;
              }
              if (result.match) {
                const commentAuthor = commentObject.user.login;
                toxicComment = commentObject.body;
                const message = customMessage
                  ? customMessage
                  : `<img src="https://media.giphy.com/media/3ohzdQ1IynzclJldUQ/giphy.gif" width="400"/> </br>
                                      Hey @${commentAuthor}! 👋 <br/> PRs and issues should be safe environments but your comment: <strong>"${toxicComment}"</strong> was classified as potentially toxic! 😔</br>
                                      Please consider spending a few seconds editing it and feel free to delete me afterwards! 🙂`;

                return octokit.issues.createComment({
                  owner: repository.owner.login,
                  repo: repository.name,
                  issue_number: issueNumber,
                  body: message,
                });
              }
            });
          });
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
