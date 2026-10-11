# CoolCommute Showcase

The website for CoolCommute, a climate-aware routing app that helps commuters avoid heat and air pollution and choose public transit. It presents the problem, the features, the tech stack and the team through a 3D hero and scroll-driven animation.

## ✨ Features
- **3D hero**: a React Three Fiber scene of three layers (transit, air quality, heat) that responds to the pointer and to scroll.
- **Scroll storytelling**: smooth scrolling, a pinned horizontal story and animated sections.
- **Feature and stack sections**: spotlight cards, an animated route diagram, and tabs for the stack, auth flow and profile payload.
- **Demo video**: scales in and plays when it comes into view.
- **Team and legal dialogs**: team, privacy and terms.

## Tech Stack
| Technology | Purpose |
| --- | --- |
| React + Vite | App and build tooling |
| three.js, React Three Fiber, drei | 3D hero scene |
| GSAP + ScrollTrigger | Scroll animation |
| Lenis | Smooth scrolling |
| Framer Motion | UI transitions |
| Tailwind CSS + shadcn/ui | Styling and components |

## Team
- **Anoop Singh Negi**: Core Architect, Routing Systems, Designer
- **Aman Deep**: Mobile and Cloud Integration

## Getting Started
```bash
npm install
npm run dev
```
Build for production with `npm run build`. Put the demo video in `public/CommuteVedio/`.

---
**CoolCommute Showcase**: the story behind climate-aware commuting.