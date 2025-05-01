# Superposition: AI Debate Arena 🗣️⚖️
![Superposition Logo](superposition_logo.png)
Welcome to **Superposition**, the ultimate AI-powered debate showdown where virtual debaters clash over topics as wild as "Are boneless wings just chicken nuggets?"! Powered by OpenAI’s GPT-4o-mini, this app lets you craft debaters with unique styles, personalities, and arguments, then watch them duke it out in a digital debate hall. With a sleek interface, password-protected access, and a neutral AI judge to crown the winner, Superposition is your ticket to intellectual chaos in a quantum superposition of fun! 🚀

Hosted live at https://zuperposition.netlify.app, this project is ready to spark debates that’ll leave you questioning reality itself. Let’s dive in! 🎉

## 🌟 Features That’ll Make You Debate Everything

- **Customizable Debaters**: Create two debaters with:
  - **Names**: Call them “Socrates” or “Captain Witty”!
  - **Debate Styles**: Formal, humorous, or aggressive.
  - **Personalities**: Confident, witty, or calm.
  - **Argument Styles**: Logical, emotional, or anecdotal.
- **Dynamic Debates**:
  - Two conversation threads with non-alternating responses (1-2 per round, randomly chosen).
  - Debaters reference each other by name for spicy counters! 😏
  - Three rounds of back-and-forth, plus opening statements.
- **Neutral AI Judge**: A fair AI scores debaters on clarity, persuasiveness, and relevance, declaring a winner with flair. ⚖️
- **Password Protection**: Lock the app behind a secret password (set in `.env`) to keep random internet folks from hogging your OpenAI API key. 🔒
- **Secure API Key Handling**: OpenAI API key is hidden in Netlify functions, safe from prying eyes. 🕵️‍♂️
- **Sleek UI**: Built with Tailwind CSS and Poppins font, featuring a light gray theme, gradient buttons, and blue/purple debater names for that extra pizzazz. ✨

## 🛠️ Tech Stack

- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Backend**: Node.js (Netlify serverless functions)
- **AI**: OpenAI GPT-4o-mini (via secure API proxy)
- **Deployment**: Netlify (serverless functions for `/auth` and `/api/openai`)
- **Tools**: `netlify-cli`, `dotenv` for environment variables

## 🚀 Getting Started: Unleash the Debate!

Follow these steps to set up Superposition locally and start debating in no time. Don’t worry, it’s easier than arguing about pineapple on pizza! 🍕

### Prerequisites

- **Node.js**: Version 18.14.0 or higher (LTS 20.x recommended). Download here.

- **Netlify CLI**: For local testing and deployment.

  ```bash
  npm install -g netlify-cli
  ```

- **Git**: For version control (optional but recommended).

- An **OpenAI API key** from platform.openai.com.

### Installation

1. **Clone or Create the Project**:

   - Clone (if using Git):

     ```bash
     git clone <your-repo-url>
     cd superposition-debate
     ```

   - Or create the folder structure:

     ```
     superposition-debate/
     ├── index.html
     ├── functions/
     │   └── api.js
     ├── netlify.toml
     ├── package.json
     ├── .env
     ├── .gitignore
     ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the root:

     ```
     OPENAI_API_KEY=sk-your-openai-api-key-here
     SITE_PASSWORD=your-secure-password-here
     TOKEN_SECRET=your-random-secret-key-here
     ```

   - Replace with:

     - Your OpenAI API key.
     - A strong password (e.g., `SuperSecure123!`).
     - A random secret (e.g., generate with `openssl rand -base64 32` or a random string).

4. **Ensure** `.gitignore`:

   ```
   .env
   node_modules/
   .netlify/
   ```

### Running Locally

1. Start the local server with Netlify CLI:

   ```bash
   netlify dev
   ```

2. Open `http://localhost:8888` in your browser.

3. Enter the `SITE_PASSWORD` from `.env`.

4. Configure debaters, pick a topic, and click “Start Debate” to watch the AI magic unfold! 🪄

### Debugging Tips

- **Console Errors**: Check Developer Tools (F12 → Console) for issues.

- **Function Logs**: View Netlify function logs:

  ```bash
  netlify functions:logs
  ```

- **Test Auth**:

  ```bash
  curl -X POST http://localhost:8888/.netlify/functions/api/auth \
  -H "Content-Type: application/json" \
  -d '{"password": "your-secure-password-here"}'
  ```

## 🌍 Deploying to Netlify: Share the Debate Fever!

Ready to take Superposition live? Deploy it to Netlify and let the world witness AI debates! Here’s how:

1. **Log in to Netlify**:

   ```bash
   netlify login
   ```

2. **Set Environment Variables**:

   - In Netlify dashboard → Your site → Site Settings → Environment Variables, add:

     ```
     OPENAI_API_KEY=sk-your-openai-api-key-here
     SITE_PASSWORD=your-secure-password-here
     TOKEN_SECRET=your-random-secret-key-here
     ```

3. **Deploy**:

   - If using Git:

     ```bash
     git add .
     git commit -m "Ready for epic debates"
     git push
     ```

     Link to Netlify:

     ```bash
     netlify init
     ```

   - Or deploy manually:

     ```bash
     netlify deploy --prod
     ```

     Select the `superposition-debate` folder.

4. **Verify**:

   - Visit your site (e.g., `https://zuperposition.netlify.app`).
   - Enter the `SITE_PASSWORD` and test the debate flow.
   - Ensure no `/auth 404` errors in Developer Tools → Console.

## 🎮 How to Use Superposition

1. **Enter the Password**: Input the `SITE_PASSWORD` to unlock the app. Wrong password? You’ll get a polite “try again” nudge. 😜
2. **Configure Debaters**:
   - Name your debaters (e.g., “Logic Lord” vs. “Witty Wizard”).
   - Choose their debate style, personality, and argument approach.
3. **Pick a Topic**: Enter something fun like “Is a hot dog a sandwich?”.
4. **Start the Debate**: Click “Start Debate” to see opening statements and three rounds of AI-powered arguments.
5. **Score the Debate**: Hit “Score Debate” for a neutral AI judge to analyze and crown a winner. 🏆
6. **Laugh and Learn**: Enjoy the witty banter and maybe rethink your stance on tacos vs. burritos! 🌮

## 🔒 Security: Keeping the Debate Safe

- **Password Protection**: The app is locked behind a password set in `SITE_PASSWORD`, preventing random users from spamming your OpenAI API key.
- **Hidden API Key**: The OpenAI API key is stored in Netlify’s environment variables and accessed via a serverless function (`functions/api.js`).
- **Token-Based Auth**: A simple token system ensures only authenticated users access the debate logic. (Pro tip: Upgrade to JWT for extra security!)

## 🤝 Contributing: Join the Debate Revolution!

Got ideas to make Superposition even more epic? Want to add a “sarcastic” debate style or a leaderboard? We’d love your help! 🙌

1. Fork the repo.

2. Create a branch:

   ```bash
   git checkout -b feature/awesome-debate-tweak
   ```

3. Commit changes:

   ```bash
   git commit -m "Added epic sarcasm mode"
   ```

4. Push and open a pull request.

No idea is too wild—let’s make debates as chaotic as a quantum superposition! ⚛️

## 📜 License

This project is licensed under the MIT License. Debate freely, share widely! 🎉

## 🙌 Acknowledgments

- **OpenAI**: For powering our AI debaters with GPT-4o-mini.
- **Netlify**: For seamless serverless hosting.
- **Tailwind CSS**: For making the UI look snazzy.
- **You**: For bringing this debate arena to life! 😎

---

*Built with 💻 and a passion for AI-fueled arguments. Let’s debate the meaning of life next!*
