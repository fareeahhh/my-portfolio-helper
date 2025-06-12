# my-portfolio-helper
Academic Portfolio Management Platform - MERN Stack Web Programming Project


## 🚀 Getting Started (Using Bun + Vite)

Follow these steps to run the project locally after cloning:

---

### ✅ 1. Open the Project in VS Code

- Open **Visual Studio Code**.
- Use `File → Open Folder` and select the cloned project folder.

---

### ✅ 2. Ensure Bun is Installed

Check if Bun is already installed:

```bash
bun --version
If not, install it using:

bash
Copy
Edit
curl -fsSL https://bun.sh/install | bash
After installation, restart your terminal to make the bun command available.

✅ 3. Install Dependencies
Inside the root project folder, run:

bash
Copy
Edit
bun install
This will install all project dependencies using bun.lockb.

✅ 4. Start the Development Server
To launch the local server:

bash
Copy
Edit
bun run dev
The app should now be running at http://localhost:5173

⚠️ Troubleshooting
🔍 Missing dev Script?
Ensure your package.json includes the following script:

json
Copy
Edit
"scripts": {
  "dev": "vite"
}
If it's missing, add it manually so that bun run dev works as expected.
