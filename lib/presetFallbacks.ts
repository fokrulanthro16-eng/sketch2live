import { UXAudit } from "./gemini";

export interface FallbackPresetData {
  html: string;
  audit: UXAudit;
}

export const SAAS_LANDING_FALLBACK: FallbackPresetData = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaSify.io - Scale Your Workflow with Next-Gen AI</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-blue-600 selection:text-white">

  <!-- Navigation Bar -->
  <header class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
          <i data-lucide="zap" class="w-5 h-5 text-white"></i>
        </div>
        <span class="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          SaaSify.io
        </span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
        <a href="#features" class="hover:text-white transition-colors">Features</a>
        <a href="#solutions" class="hover:text-white transition-colors">Solutions</a>
        <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
        <a href="#testimonials" class="hover:text-white transition-colors">Testimonials</a>
      </nav>

      <div class="flex items-center gap-3">
        <a href="#" class="hidden sm:inline-block text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2">
          Sign In
        </a>
        <a href="#" class="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all">
          Get Started
        </a>
      </div>
    </div>
  </header>

  <main>
    <!-- Hero Section -->
    <section class="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 mb-8 backdrop-blur-sm">
          <span class="flex h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
          Announcing AI Automation 2.0 • Read More &rarr;
        </div>

        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          Scale Your Workflow with <span class="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Next-Gen AI</span>
        </h1>

        <p class="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Automate repetitive business tasks, analyze complex multi-source telemetry, and supercharge customer engagement in minutes.
        </p>

        <!-- CTA Buttons -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#" class="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 transition-all">
            Start Free Trial
          </a>
          <a href="#" class="rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2">
            <i data-lucide="play" class="w-4 h-4 text-blue-400"></i> Book Demo
          </a>
        </div>

        <!-- Dashboard Preview Mockup -->
        <div class="mt-14 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-2 sm:p-4 shadow-2xl backdrop-blur-xl">
          <div class="rounded-xl border border-slate-800/80 bg-slate-950 p-6 text-left">
            <div class="flex items-center justify-between pb-4 border-b border-slate-800">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div class="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span class="ml-2 text-xs font-mono text-slate-500">live-analytics.saasify.internal</span>
              </div>
              <span class="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span> Live Edge Distribution
              </span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                <span class="text-xs text-slate-500 uppercase font-semibold">Active Workflows</span>
                <p class="text-2xl font-bold text-white mt-1">1,482,900</p>
                <span class="text-xs text-emerald-400">+18.4% this week</span>
              </div>
              <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                <span class="text-xs text-slate-500 uppercase font-semibold">Avg Latency</span>
                <p class="text-2xl font-bold text-white mt-1">8.2 ms</p>
                <span class="text-xs text-blue-400">Zero dropouts</span>
              </div>
              <div class="p-4 rounded-xl border border-slate-800 bg-slate-900/40">
                <span class="text-xs text-slate-500 uppercase font-semibold">Inference Throughput</span>
                <p class="text-2xl font-bold text-white mt-1">99.99%</p>
                <span class="text-xs text-purple-400">Enterprise SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 border-t border-slate-800/60 bg-slate-950/40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-blue-400">Built for Modern Teams</h2>
        <p class="mt-2 text-3xl sm:text-4xl font-bold text-white">Everything you need to ship faster</p>
        <p class="mt-4 text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Engineered for scale, verified for security, and designed to eliminate pipeline friction.
        </p>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-left hover:border-blue-500/40 hover:bg-slate-900 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
              <i data-lucide="zap" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Lightning Fast Inference</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-4">
              Processes multimodal payloads under 10ms with global edge distribution across 35 regions.
            </p>
            <a href="#" class="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Learn more &rarr;
            </a>
          </div>

          <!-- Card 2 -->
          <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-left hover:border-emerald-500/40 hover:bg-slate-900 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
              <i data-lucide="shield-check" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Enterprise Security</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-4">
              SOC-2 Type II certified with end-to-end payload encryption and role-based zero trust keys.
            </p>
            <a href="#" class="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Security overview &rarr;
            </a>
          </div>

          <!-- Card 3 -->
          <div class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-left hover:border-purple-500/40 hover:bg-slate-900 transition-all group">
            <div class="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-5 group-hover:scale-110 transition-transform">
              <i data-lucide="bar-chart-3" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Real-time Insights</h3>
            <p class="text-sm text-slate-400 leading-relaxed mb-4">
              Interactive telemetry graphs, automated anomaly triggers, and instant exportable compliance audits.
            </p>
            <a href="#" class="text-xs font-bold text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore dashboards &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="border-t border-slate-800 bg-slate-950 py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-xs text-slate-500">&copy; 2026 SaaSify Technologies Inc. All rights reserved.</p>
      <div class="flex items-center gap-6 text-xs text-slate-400">
        <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-white transition-colors">Security Whitepaper</a>
        <a href="#" class="hover:text-white transition-colors">System Status</a>
      </div>
    </div>
  </footer>

  <script>if (window.lucide) lucide.createIcons();</script>
</body>
</html>`,
  audit: {
    uxScore: 95,
    critique: [
      "Ambiguous call-to-action hierarchy and unaligned navigation in raw pencil sketch.",
      "Lacked distinct interactive states, dark theme contrast ratios, and mobile touch targets.",
      "Missing responsive layout grid specifications between feature card columns.",
    ],
    autoFixes: [
      "Auto-healed WCAG 2.1 AA compliant slate-950/blue-600 contrast palette with glowing accents.",
      "Expanded primary touch targets to 48px with active scale micro-interactions.",
      "Synthesized semantic HTML5 landmarks (<header>, <nav>, <main>, <section>, <footer>).",
      "Constructed fluid Tailwind CSS grid responsive across mobile, tablet, and 4K displays.",
    ],
  },
};

export const MOBILE_AUTH_FALLBACK: FallbackPresetData = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Back - Mobile Auth</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4 antialiased selection:bg-indigo-600 selection:text-white">

  <!-- Mobile Frame Container -->
  <div class="w-full max-w-sm rounded-[36px] border border-slate-800 bg-slate-900/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
    <!-- Top Glow Effect -->
    <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

    <!-- App Logo Icon -->
    <div class="flex justify-center mb-6">
      <div class="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-500/25 border border-indigo-400/30">
        <i data-lucide="zap" class="w-8 h-8 text-white fill-white"></i>
      </div>
    </div>

    <!-- Header Text -->
    <div class="text-center mb-8">
      <h1 class="text-2xl font-black tracking-tight text-white">Welcome Back</h1>
      <p class="text-xs text-slate-400 mt-1">Sign in to continue to your workspace</p>
    </div>

    <!-- Form -->
    <form class="space-y-4" onsubmit="event.preventDefault();">
      <!-- Email Field -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i data-lucide="mail" class="w-4 h-4"></i>
          </div>
          <input
            type="email"
            value="alex.johnson@company.com"
            placeholder="name@company.com"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      <!-- Password Field -->
      <div>
        <label class="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <i data-lucide="lock" class="w-4 h-4"></i>
          </div>
          <input
            type="password"
            value="••••••••••••••"
            placeholder="Enter your password"
            class="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
          />
          <button type="button" class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white">
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between text-xs pt-1">
        <label class="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300">
          <input type="checkbox" checked class="rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 cursor-pointer" />
          <span>Remember me</span>
        </label>
        <a href="#" class="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
          Forgot password?
        </a>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-xs font-bold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
      >
        <span>Sign In</span>
        <i data-lucide="arrow-right" class="w-4 h-4"></i>
      </button>

      <!-- Divider -->
      <div class="relative my-6 flex items-center justify-center">
        <div class="w-full border-t border-slate-800"></div>
        <span class="bg-slate-900 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider absolute">
          OR
        </span>
      </div>

      <!-- Social Logins -->
      <div class="grid grid-cols-2 gap-3">
        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all"
        >
          <i class="fa-brands fa-google text-red-400"></i>
          <span>Google</span>
        </button>
        <button
          type="button"
          class="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950/80 py-2.5 px-3 text-xs font-semibold text-slate-200 hover:bg-slate-800 transition-all"
        >
          <i class="fa-brands fa-github text-white"></i>
          <span>GitHub</span>
        </button>
      </div>

      <!-- Sign Up Footer -->
      <p class="text-center text-xs text-slate-500 mt-6 pt-2">
        Don't have an account?
        <a href="#" class="font-semibold text-indigo-400 hover:underline ml-1">Create Account</a>
      </p>
    </form>
  </div>

  <script>if (window.lucide) lucide.createIcons();</script>
</body>
</html>`,
  audit: {
    uxScore: 96,
    critique: [
      "Input fields in paper drawing lacked icon cues and clear touch target boundaries.",
      "Undefined error and focus visual states for keyboard navigation.",
      "Social buttons had inconsistent vertical rhythm in raw sketch.",
    ],
    autoFixes: [
      "Auto-healed form fields with Lucide icons (mail, lock, eye) and 48px touch targets.",
      "Injected modern password visibility toggle and high-contrast focus rings.",
      "Structured balanced social auth grid with brand colors and rounded-xl containers.",
      "Configured mobile viewport simulation with dynamic island aesthetics.",
    ],
  },
};

export const DISASTER_RELIEF_FALLBACK: FallbackPresetData = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emergency Disaster Relief Field Triage & Registry</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://unpkg.com/lucide@latest"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-3 sm:p-6 antialiased selection:bg-red-600 selection:text-white">

  <div class="max-w-7xl mx-auto space-y-6">
    <!-- Mission Header Banner -->
    <header class="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/80 via-slate-900 to-zinc-950 p-4 sm:p-6 shadow-2xl flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30 text-white shrink-0">
          <i data-lucide="shield-alert" class="w-7 h-7"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-xl sm:text-2xl font-black tracking-tight text-white">
              Disaster Relief Field Triage
            </h1>
            <span class="rounded-full bg-red-500/20 border border-red-500/40 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wider">
              Offline Mode
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-0.5">
            Emergency field intake, supply allocation, and zero-latency local triage buffer
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-300">
          <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Local Storage Ready
        </span>
        <button id="exportCsvBtn" class="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer">
          <i data-lucide="download" class="w-4 h-4"></i>
          <span>📥 Export CSV</span>
        </button>
      </div>
    </header>

    <!-- Two-Column Grid: Left Intake Form | Right Triage Registry Table -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      <!-- LEFT: Intake Form (5 cols) -->
      <div class="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl backdrop-blur-md">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <h2 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="clipboard-list" class="w-4 h-4 text-red-400"></i>
            Victim / Family Intake
          </h2>
          <span class="text-[10px] text-slate-500 font-mono">FORM_ID: #FL-2026</span>
        </div>

        <form id="triageForm" class="space-y-4">
          <!-- Priority Selector Badges -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-2">Triage Priority Category</label>
            <div class="grid grid-cols-2 gap-2" id="prioritySelector">
              <label class="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-950/30 p-2.5 text-xs font-semibold text-red-300 cursor-pointer hover:bg-red-950/60 transition-colors">
                <input type="radio" name="priority" value="RED: Immediate" checked class="text-red-600 focus:ring-0">
                <span>🔴 RED (Immediate)</span>
              </label>
              <label class="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-950/30 p-2.5 text-xs font-semibold text-amber-300 cursor-pointer hover:bg-amber-950/60 transition-colors">
                <input type="radio" name="priority" value="YELLOW: Delayed" class="text-amber-600 focus:ring-0">
                <span>🟡 YELLOW (Delayed)</span>
              </label>
              <label class="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-2.5 text-xs font-semibold text-emerald-300 cursor-pointer hover:bg-emerald-950/60 transition-colors">
                <input type="radio" name="priority" value="GREEN: Minor" class="text-emerald-600 focus:ring-0">
                <span>🟢 GREEN (Minor)</span>
              </label>
              <label class="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs font-semibold text-slate-300 cursor-pointer hover:bg-slate-900 transition-colors">
                <input type="radio" name="priority" value="BLACK: Expectant" class="text-slate-400 focus:ring-0">
                <span>⚫ BLACK (Expectant)</span>
              </label>
            </div>
          </div>

          <!-- Victim Name / Identifier -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Patient / Family Name</label>
            <input
              type="text"
              id="inputName"
              required
              placeholder="E.g., Marcus Vance / Family of 3"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <!-- Age & Sector Grid -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Age / Group</label>
              <input
                type="text"
                id="inputAge"
                required
                placeholder="E.g., 28 / Adult"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-300 mb-1">Sector / Zone Grid</label>
              <input
                type="text"
                id="inputSector"
                required
                placeholder="Sector 4-B (North)"
                class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>

          <!-- Critical Medical Needs -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Medical Condition / Injuries</label>
            <input
              type="text"
              id="inputCondition"
              placeholder="Severe dehydration, fracture, insulin need"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <!-- Supplies Required -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Emergency Supplies Needed</label>
            <input
              type="text"
              id="inputSupplies"
              placeholder="Clean Water (5L), MREs x 4, Blankets"
              class="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full rounded-xl bg-gradient-to-r from-red-600 to-rose-600 py-3 text-xs font-bold text-white shadow-xl shadow-red-600/30 hover:from-red-500 hover:to-rose-500 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <i data-lucide="plus-circle" class="w-4 h-4"></i>
            <span>Log & Commit Field Record</span>
          </button>
        </form>
      </div>

      <!-- RIGHT: Interactive Triage Registry Table (7 cols) -->
      <div class="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-xl backdrop-blur-md flex flex-col min-h-[580px]">
        <div class="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div class="flex items-center gap-2">
            <i data-lucide="database" class="w-4 h-4 text-emerald-400"></i>
            <h2 class="text-sm font-bold text-white">Local Field Registry</h2>
            <span id="recordCountBadge" class="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-mono text-slate-300">
              5 Records
            </span>
          </div>

          <div class="text-[11px] text-slate-400">
            Auto-saves locally in RAM
          </div>
        </div>

        <!-- Table Container -->
        <div class="flex-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/90">
          <table class="w-full text-left border-collapse text-xs">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-900/90 text-slate-400 font-semibold">
                <th class="py-2.5 px-3">Time</th>
                <th class="py-2.5 px-3">Priority</th>
                <th class="py-2.5 px-3">Victim / Family</th>
                <th class="py-2.5 px-3">Sector</th>
                <th class="py-2.5 px-3">Medical / Supplies</th>
              </tr>
            </thead>
            <tbody id="triageTableBody" class="divide-y divide-slate-800/60 font-mono text-[11px]">
              <tr class="hover:bg-slate-900/40 transition-colors">
                <td class="py-2.5 px-3 text-slate-400">14:02</td>
                <td class="py-2.5 px-3"><span class="rounded bg-red-600/30 border border-red-500/50 text-red-300 px-2 py-0.5 text-[10px] font-bold">RED</span></td>
                <td class="py-2.5 px-3 font-sans text-white font-semibold">Maria Sanchez (3)</td>
                <td class="py-2.5 px-3 text-slate-300">Sector 4-B</td>
                <td class="py-2.5 px-3 text-slate-400 font-sans">Severe trauma, Blood O-</td>
              </tr>
              <tr class="hover:bg-slate-900/40 transition-colors">
                <td class="py-2.5 px-3 text-slate-400">14:08</td>
                <td class="py-2.5 px-3"><span class="rounded bg-amber-600/30 border border-amber-500/50 text-amber-300 px-2 py-0.5 text-[10px] font-bold">YELLOW</span></td>
                <td class="py-2.5 px-3 font-sans text-white font-semibold">David Chen</td>
                <td class="py-2.5 px-3 text-slate-300">Sector 2-A</td>
                <td class="py-2.5 px-3 text-slate-400 font-sans">Fracture, Splint required</td>
              </tr>
              <tr class="hover:bg-slate-900/40 transition-colors">
                <td class="py-2.5 px-3 text-slate-400">14:15</td>
                <td class="py-2.5 px-3"><span class="rounded bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">GREEN</span></td>
                <td class="py-2.5 px-3 font-sans text-white font-semibold">Sarah Connor (4)</td>
                <td class="py-2.5 px-3 text-slate-300">North Gate</td>
                <td class="py-2.5 px-3 text-slate-400 font-sans">Minor cuts, MREs x 8</td>
              </tr>
              <tr class="hover:bg-slate-900/40 transition-colors">
                <td class="py-2.5 px-3 text-slate-400">14:21</td>
                <td class="py-2.5 px-3"><span class="rounded bg-red-600/30 border border-red-500/50 text-red-300 px-2 py-0.5 text-[10px] font-bold">RED</span></td>
                <td class="py-2.5 px-3 font-sans text-white font-semibold">Unknown Male #4</td>
                <td class="py-2.5 px-3 text-slate-300">Med Station 1</td>
                <td class="py-2.5 px-3 text-slate-400 font-sans">Head injury, Unconscious</td>
              </tr>
              <tr class="hover:bg-slate-900/40 transition-colors">
                <td class="py-2.5 px-3 text-slate-400">14:35</td>
                <td class="py-2.5 px-3"><span class="rounded bg-amber-600/30 border border-amber-500/50 text-amber-300 px-2 py-0.5 text-[10px] font-bold">YELLOW</span></td>
                <td class="py-2.5 px-3 font-sans text-white font-semibold">Alvarez Family (5)</td>
                <td class="py-2.5 px-3 text-slate-300">Sector 3-C</td>
                <td class="py-2.5 px-3 text-slate-400 font-sans">Dehydration, Water x 15L</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-4 flex items-center justify-between text-xs text-slate-500">
          <span>Standard START Triage Protocol</span>
          <span class="text-emerald-400">✓ Instant Offline Export Supported</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Interactive Form Handling & Offline CSV Export Script -->
  <script>
    const records = [
      { time: "14:02", priority: "RED", name: "Maria Sanchez (3)", sector: "Sector 4-B", medical: "Severe trauma, Blood O-" },
      { time: "14:08", priority: "YELLOW", name: "David Chen", sector: "Sector 2-A", medical: "Fracture, Splint required" },
      { time: "14:15", priority: "GREEN", name: "Sarah Connor (4)", sector: "North Gate", medical: "Minor cuts, MREs x 8" },
      { time: "14:21", priority: "RED", name: "Unknown Male #4", sector: "Med Station 1", medical: "Head injury, Unconscious" },
      { time: "14:35", priority: "YELLOW", name: "Alvarez Family (5)", sector: "Sector 3-C", medical: "Dehydration, Water x 15L" }
    ];

    const form = document.getElementById("triageForm");
    const tableBody = document.getElementById("triageTableBody");
    const countBadge = document.getElementById("recordCountBadge");
    const exportBtn = document.getElementById("exportCsvBtn");

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const priorityRadio = document.querySelector('input[name="priority"]:checked');
      const priorityFull = priorityRadio ? priorityRadio.value : "RED";
      const priority = priorityFull.includes("RED") ? "RED" : (priorityFull.includes("YELLOW") ? "YELLOW" : (priorityFull.includes("GREEN") ? "GREEN" : "BLACK"));
      const name = document.getElementById("inputName").value;
      const sector = document.getElementById("inputSector").value;
      const condition = document.getElementById("inputCondition").value || "General evaluation";
      const now = new Date();
      const timeStr = String(now.getHours()).padStart(2, '0') + ":" + String(now.getMinutes()).padStart(2, '0');

      records.unshift({ time: timeStr, priority: priority, name: name, sector: sector, medical: condition });

      const pColor = priority === 'RED' ? 'bg-red-600/30 border-red-500/50 text-red-300' :
                    (priority === 'YELLOW' ? 'bg-amber-600/30 border-amber-500/50 text-amber-300' :
                    (priority === 'GREEN' ? 'bg-emerald-600/30 border-emerald-500/50 text-emerald-300' : 'bg-slate-700 text-slate-300'));

      const newRow = document.createElement("tr");
      newRow.className = "hover:bg-slate-900/40 transition-colors bg-red-950/20";
      newRow.innerHTML = \`
        <td class="py-2.5 px-3 text-slate-400">\${timeStr}</td>
        <td class="py-2.5 px-3"><span class="rounded \${pColor} border px-2 py-0.5 text-[10px] font-bold">\${priority}</span></td>
        <td class="py-2.5 px-3 font-sans text-white font-semibold">\${name}</td>
        <td class="py-2.5 px-3 text-slate-300">\${sector}</td>
        <td class="py-2.5 px-3 text-slate-400 font-sans">\${condition}</td>
      \`;

      tableBody.insertBefore(newRow, tableBody.firstChild);
      countBadge.textContent = records.length + " Records";
      form.reset();
    });

    // 100% Offline CSV Export directly from browser memory
    exportBtn.addEventListener("click", function() {
      let csv = "Time,Priority,Victim/Family,Sector,Medical/Supplies\\n";
      records.forEach(r => {
        csv += \`"\${r.time}","\${r.priority}","\${r.name.replace(/"/g, '""')}","\${r.sector.replace(/"/g, '""')}","\${r.medical.replace(/"/g, '""')}"\\n\`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "disaster_relief_triage_registry.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });

    if (window.lucide) lucide.createIcons();
  </script>
</body>
</html>`,
  audit: {
    uxScore: 97,
    critique: [
      "Field drawings lacked standard START triage color coding and offline export actions.",
      "No client-side state buffer defined for disaster zones with zero internet connectivity.",
      "Form input layout lacked emergency field contrast for bright sunlight visibility.",
    ],
    autoFixes: [
      "Engineered full client-side JavaScript record buffering that persists without server dependency.",
      "Synthesized immediate offline CSV export button with standard comma-separated formatting.",
      "Implemented color-coded emergency triage categorization (Red, Yellow, Green, Black).",
      "Optimized high-contrast slate-950 UI with 48px tactile input ergonomics.",
    ],
  },
};
