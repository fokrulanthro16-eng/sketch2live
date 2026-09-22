# Contributing to Sketch2Live

Thank you for your interest in contributing to **Sketch2Live**! We welcome community contributions, bug reports, feature enhancements, and design system upgrades.

---

## 🛠️ Development Workflow

1. **Fork the Repository**:
   - Fork the repository on GitHub and clone your fork locally:
     ```bash
     git clone https://github.com/fokrulanthro16-eng/sketch2live.git
     cd sketch2live
     ```

2. **Branch Naming Conventions**:
   - Create a feature branch with a descriptive name:
     - `feat/feature-name` (e.g. `feat/audio-sketch-notes`)
     - `fix/bug-description` (e.g. `fix/mobile-notch-scaling`)
     - `docs/documentation-update` (e.g. `docs/add-docker-guide`)

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Environment Setup**:
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Add your Google Gemini API key to `.env.local`.

5. **Run Locally**:
   ```bash
   npm run dev
   ```
   - Open `http://localhost:3000` to verify your changes.

---

## 📝 Commit Conventions (Conventional Commits)

We enforce the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature or major enhancement (e.g., `feat: add webcam snapshot scanner`)
- `fix:` A bug fix (e.g., `fix: resolve iframe sandbox reload race condition`)
- `docs:` Documentation changes only (e.g., `docs: update quickstart guide`)
- `style:` Formatting, missing semicolons, visual layout changes (no code behavior change)
- `refactor:` Code refactoring without changing public interfaces
- `perf:` Performance improvements (e.g., `perf: downscale image tokens to 1024px`)
- `test:` Adding or updating tests
- `chore:` Dependency bumps, CI/CD pipeline or build tool changes

---

## 🧪 Quality Standards & PR Checklist

Before submitting a Pull Request, please ensure:

- [ ] `npx tsc --noEmit` passes with 0 type errors.
- [ ] No `.env` or sensitive API keys are staged or committed.
- [ ] Code follows Tailwind CSS utility conventions and TypeScript strict mode.
- [ ] Added or modified components are responsive and accessible.
- [ ] All new functions include clear JSDoc or TypeScript annotations.

---

## 🚀 Submitting a Pull Request

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `main` branch of the upstream repository.
3. Provide a clear PR summary referencing any related issues or discussions.
