const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");

async function run() {
  const filterEmailChain = require('./filterEmailChain');
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

    if (context.payload.comment) {
      if (
        context.payload.action === "created" ||
        context.payload.action === "edited"
      ) {
        const issueNumber = context.payload.issue.number;
        const model = await toxicity.load(threshold);

        filterEmailChain('This is an EMAIL.');

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
                  : `Hey @${commentAuthor}! 👋 <br/> You're great 😔</br>🙂`;
                console.log('this is a test of console logging from an action 👋');
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
