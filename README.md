# QuickNotes

QuickNotes is a light, responsive browser application for managing everyday notes. It allows users to categorize their thoughts, search entries in real time, and save data locally across browser sessions.

## Features

- **Categorized Notes**: Assign category tags (Personal, Work, Study) with custom visual indicators.
- **Form Validation**: Protects against empty notes or text exceeding 200 characters.
- **Real-Time Search**: Search and filter existing notes instantly.
- **Local Persistence**: Notes are automatically stored using browser `localStorage`.
- **Responsive Layout**: Adapts gracefully to mobile and desktop screens using CSS Flexbox and media queries.
- **Clear All Option**: Allows bulk removal of notes with a safety confirmation prompt.

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Tonio3779/quicknotes-app.git
   ```

## What I Learned

**DOM Security**: Learned to use textContent and createElement instead of innerHTML when rendering user-submitted text to prevent XSS vulnerabilities.

**Flexbox Responsiveness**: Applied Flexbox layouts alongside @media queries to ensure forms and cards adapt smoothly to mobile viewports.

**Data Storage & State Management**: Worked with localStorage utilizing JSON.stringify and JSON.parse to persist array state between page reloads.
