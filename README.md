# screen-reader-headings

A Claude Code mod for screen reader users who move through the chat with heading navigation keys.

## What it does

- When Claude needs an answer from you, it writes the question in the chat under the heading "Question for you", with numbered options. You can reply by typing a number or your own words in the normal message box, so you don't have to reach the multiple-choice dialog.
- When Claude finishes a piece of work, its reply ends with the heading "Summary" and two or three short sentences on what changed and what is left.
- Claude avoids tables and other layouts that depend on seeing the screen.
- In the desktop app, VS Code and mobile, it also adds a heading above the multiple-choice dialog showing the question.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install screen-reader-headings --marketplace eliezerandres11-wq/screen-reader-headings
```

Or from a shell:

```bash
claude plugin install screen-reader-headings --marketplace eliezerandres11-wq/screen-reader-headings
```

Answer `y` when asked to add the marketplace, then press Enter to choose the user scope.

In the Claude desktop app, where `/plugin` does not run: activate the + button next to the prompt box, then Plugins, then Add marketplace and enter `eliezerandres11-wq/screen-reader-headings`, then Add plugin.

## Limits

The next-step box the desktop app shows at the end of a reply belongs to the app, and a mod cannot turn it into a heading. That is why the summary is also written in the chat under its own heading.
