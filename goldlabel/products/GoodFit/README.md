# Good Fit?

Very simply, it analyses a JD (Job Description) to a CV (Resume) for fit. It returns scrore out of 10, a reason and a suggestion


[project="Weekend Portfolio Project."]

Here's how we might approach this **Good Fit** project efficiently:

### App functionality

1. **User Input:**
   - Job description (JD) pasted into a text area.
   - Resume content pasted into a second text area.

2. **Analysis:**
   - Compare the JD and Resume using an LLM (e.g., OpenAI's GPT-4 Turbo).
   - Output includes:
     - A fit score (out of 10)
     - Brief reasoning explaining the score
     - Call To Action

### Example Output

Score: 7/10

Reason:
Your resume aligns well with the required technical skills (JavaScript, React, AWS), but lacks evidence of team leadership experience mentioned explicitly in the job description.

Suggestion: Buy a subscription