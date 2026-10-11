import {
  Route,
  MonitorSmartphone,
  Layers,
  Compass,
  ShieldCheck,
  RefreshCw,
  HardDrive,
  MapPin,
} from "lucide-react";

export const repoUrl = "https://github.com/arthavgonda/CoolCommute";

export const navLinks = [
  { label: "Problem", href: "#problem", id: "problem" },
  { label: "Process", href: "#process", id: "process" },
  { label: "Features", href: "#features", id: "features" },
  { label: "Stack", href: "#tech", id: "tech" },
  { label: "Showcase", href: "#showcase", id: "showcase" },
];

export const heroStats = [
  { value: "5–10°C", label: "Urban heat island temperature rise" },
  { value: "2–3×", label: "Pollution at busy junctions" },
  { value: "3", label: "Questions to personalise a route" },
];

export const problems = [
  {
    index: "01",
    title: "Heat exposure",
    body: "Urban heat islands can raise temperatures by 5–10°C. Commuters spend hours in extreme heat without realising the health impact.",
    stat: "5–10°C",
    caption: "Added by urban heat islands",
  },
  {
    index: "02",
    title: "Air pollution",
    body: "Traffic junctions and busy roads have 2–3× higher pollution levels. Traditional routing ignores this completely.",
    stat: "2–3×",
    caption: "Higher at junctions and busy roads",
  },
  {
    index: "03",
    title: "Private vehicles",
    body: "More private cars mean more emissions. Public transport has to be made the easier choice to break the cycle.",
    stat: "Transit",
    caption: "Favoured by default in every route",
  },
];

export const steps = [
  {
    index: "01",
    label: "Profile",
    title: "Tell it how you commute",
    body: "Three questions set your sensitivity to air quality, your tolerance for heat, and whether you would trade minutes for lower exposure.",
    rows: [
      ["airSensitivity", "Low · Medium · High"],
      ["heatAvoidance", "Shaded route weighting"],
      ["tradeoff", "Speed · Exposure · Balanced"],
    ],
  },
  {
    index: "02",
    label: "Location",
    title: "Share where you are, or don’t",
    body: "Location is optional. With it, routes respond to conditions around you. Without it, you still receive baseline transit recommendations and nothing runs in the background.",
    rows: [
      ["Permission", "Optional"],
      ["Precision", "Latitude and longitude"],
      ["Fallback", "Baseline recommendations"],
      ["Tracking", "No continuous background tracking"],
    ],
  },
  {
    index: "03",
    label: "Routing",
    title: "Routes weighed for exposure",
    body: "Suggested transit and walking paths steer around heat islands and polluted corridors. They are advisory estimates, and road safety always comes first.",
    rows: [
      ["Avoids", "Urban heat islands"],
      ["Avoids", "High air-pollution corridors"],
      ["Favours", "Public transit"],
      ["Output", "Advisory estimates"],
    ],
  },
  {
    index: "04",
    label: "Sync",
    title: "Carried across your devices",
    body: "Preferences sync through Amazon API Gateway behind Cognito token authentication, and stay cached on the device for fast access.",
    rows: [
      ["Identity", "Amazon Cognito User Pools"],
      ["Transport", "Amazon API Gateway"],
      ["Cache", "On-device"],
      ["Control", "Remote deletion on request"],
    ],
  },
];

export const features = [
  {
    icon: Route,
    title: "Climate-aware routing",
    body: "Routes weighted for heat and air quality, not only distance and time.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cross-platform",
    body: "One codebase across iOS, Android and web, built with React Native and Expo.",
  },
  {
    icon: Layers,
    title: "Glass interface",
    body: "Frosted surfaces and custom blur effects rendered with React Native Skia.",
  },
  {
    icon: Compass,
    title: "Guided onboarding",
    body: "Lottie-driven onboarding that tunes your profile in three questions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure sign-in",
    body: "Amazon Cognito User Pools with SRP authentication and verification codes.",
  },
  {
    icon: RefreshCw,
    title: "Profile sync",
    body: "Preferences synced through API Gateway so every device stays aligned.",
  },
  {
    icon: HardDrive,
    title: "Local cache",
    body: "Profile data cached on the device for rapid access.",
  },
  {
    icon: MapPin,
    title: "Optional location",
    body: "Location access is opt-in, with sensible baseline recommendations without it.",
  },
];

export const stack = [
  { name: "React Native", role: "Cross-platform UI framework" },
  { name: "Expo", role: "Development and platform tooling" },
  { name: "React Native Skia", role: "Custom graphics and blur effects" },
  { name: "Lottie", role: "Smooth onboarding animations" },
  { name: "AWS Cognito", role: "Secure user authentication" },
  { name: "API Gateway", role: "Backend API and profile sync" },
];

export const authSteps = [
  {
    title: "Sign in with Cognito",
    body: "Users authenticate against an Amazon Cognito User Pool using the USER_SRP_AUTH protocol, so passwords never travel in plaintext.",
  },
  {
    title: "Verify with a code",
    body: "Verification codes confirm new accounts before a session is issued.",
  },
  {
    title: "Call the API with tokens",
    body: "Cognito tokens authorise every request to Amazon API Gateway.",
  },
  {
    title: "Sync and control your profile",
    body: "Preferences are synced remotely and can be deleted at any time through the DELETE /profile endpoint.",
  },
];

export const profileExample = `{
  "airSensitivity": "medium",
  "heatAvoidance": "medium",
  "tradeoff": "balanced",
  "location": { "lat": 30.27, "lng": 78.05 },
  "completedAt": "2026-10-06T09:22:26.560Z",
  "synced": true
}`;

export const team = [
    {
    initials: "AN",
    name: "Anoop S Negi",
    role: "Core Architect, Routing Systems, Design",
    href: "https://www.linkedin.com/in/anoopsnegi/",
  },
  {
    initials: "AD",
    name: "Aman Deep",
    role: " Mobile Integration, Designer",
    href: "https://www.linkedin.com/in/aman-deep-74300b28b/",
  },
];