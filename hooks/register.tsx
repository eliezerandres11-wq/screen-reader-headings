import type { Register } from 'claude-code'

// Instructions added to Claude's system prompt so every question and every
// end-of-reply summary sits under a real markdown heading in the chat.
const RULES = `The user relies on a screen reader and moves around the chat with heading navigation keys. Follow these rules in every reply:
- Whenever you need an answer or a decision from the user, put the question in your chat message under the heading "## Question for you", followed by numbered options in plain text. The user may answer by typing the number or their own words in the message box. Do this even when you also show a multiple-choice dialog or a next-step box.
- End every reply that did work (changed files, ran commands, or finished a task) with the heading "## Summary", followed by two or three short sentences on what changed and what is still left. If a question is also needed, put "## Question for you" after the summary.
- Do not use tables or layouts that depend on seeing the screen.`

function questionText(q: unknown): string {
  if (q !== null && typeof q === 'object' && 'question' in q) {
    const text = (q as { question: unknown }).question
    if (typeof text === 'string') return text
  }
  return 'Claude has a question'
}

export const register: Register = on => {
  on('prompt.compose', async ($, e, next) => {
    const result = await next(e)
    return {
      sections: [
        ...result.sections,
        { id: 'screen-reader-headings:rules', text: RULES, scope: 'session' },
      ],
    }
  })

  // Put a heading above the multiple-choice dialog, where the surface can draw
  // markdown (the desktop app, VS Code and mobile; the terminal cannot here).
  on('ui.render', { component: 'AskUserQuestion' }, async ($, e, next) => {
    const engineDialog = await next(e)
    if (e.surface === 'terminal') return engineDialog

    const { Box, Markdown } = $.ui.resolve(e)
    const questions = e.props.questions
    const heading =
      questions.length === 1
        ? `## Question: ${questionText(questions[0])}`
        : `## ${questions.length} questions from Claude`

    return (
      <Box flexDirection="column">
        <Markdown text={heading} />
        {engineDialog}
      </Box>
    )
  })
}
