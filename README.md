# Prime Analytics Landing

Simple Node/Express server serving static landing page and forwarding form submissions to Telegram.

## Running locally or on a server

1. Install dependencies
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example` and fill in:
   - `BOT_TOKEN` – Telegram bot token
   - `CHAT_ID` – chat to receive messages
   - `PORT` – port to listen on (default 3000)
3. Start the server
   ```bash
   npm start
   ```
4. The site will be available at `http://<server-ip>:<PORT>`.

Make sure the chosen port is open in the firewall so the site is reachable from the internet.
