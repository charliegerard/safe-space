# BossBot - Github Issue Comment Cleanup - Github action

Github action that looks for unwanted email content in issue comments and removes it.

It currently handles standard email reply text format from Outlook and Gmail.

It works when comments are posted or edited on issues.

BossBot is named in reference Tony Danza's character in "Who's the Boss".

## How to use

_If you do not have any Github actions already set up in your repo, start by creating a .github/workflows folder._

Inside your workflows folder, create a new .yml file, for example `main.yml` and copy the following lines:

Don't forget that this must be merged into your primary branch (such as `main` or `master`) for Github to see it.

```yml
on: [issue_comment]

jobs:
  bossbot_issue_comment_cleanup:
    runs-on: ubuntu-latest
    name: BossBot Issues Cleanup
    steps:
      - uses: actions/checkout@v2
      - name: BossBot Issues Cleanup - action step
        uses: banagale/bossbot-action@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SHOW_ANNOTATION: true
```

- `GITHUB_TOKEN` is **required** (note that
  Github [automatically creates this token](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow#:~:text=and%20use%20secrets.-,About%20the%20GITHUB_TOKEN%20secret,authenticate%20in%20a%20workflow%20run.&text=The%20token's%20permissions%20are%20limited,%22Permissions%20for%20the%20GITHUB_TOKEN%20.%22))
  but two other parameters are optional:
- `show_annotation` is optional and true if unset. Set to false if you do not want messages edited by BossBot to include
  an annotation
  
The action can take up to ~30 seconds to run after an issue comment is added or edited.

## Acknowledgements

BossBot is based originally on [safe-space](https://github.com/charliegerard/safe-space)
by [@charliegerard](https://github.com/charliegerard)