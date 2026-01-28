# Project Development Journey 🚀

## Session Goal
Build a premium streetwear website ("VIBE") with advanced 3D animations, interactive cursor effects, and a unique "Shining Disco" canvas interaction, inspired by high-end design trends (including *trae.ai*).

---

## 📅 Development Log

### Phase 1: Foundation & 3D Setup
- **Initial Build**: Created responsive HTML/HTML structure with `styles.css` using extensive CSS variables for the color palette (Coral/Teal).
- **3D Features**:
    - Implemented **3D Scroll Configurations**: Elements fade in and move on the Z-axis.
    - Added **Tilt Effects**: Product cards rotate in 3D space on hover.
    - **Parallax Hero**: Mouse movement influences hero image perspective.

### Phase 2: The "TRAE" Cursor Effect
- **Custom Cursor System**:
    - Replaced default cursor with a **Coral Dot + Trailing Ring**.
    - Added a **Spotlight** effect for subtle ambient lighting.
- **Border Glow**:
    - Implemented a persistent viewport border with radial gradient corners.
    - Logic: Corner intensity reacts dynamically to cursor proximity.
- **Magnetic Interactions**:
    - Buttons and Cards now "pull" magnetically toward the cursor on hover.

### Phase 3: Brand Evolution (VYBE -> VIBE)
- **Rebranding**: Changed name from "VYBE" to "VIBE" for a sharper identity.
- **Theme Shift**:
    - Transitioned to a **Dark Neon Theme**.
    - Backgrounds darkened to `#0a0a0a` to make the Neon Coral (`#F47B6C`) pop.
    - Added glowing border accents and text shadows.

### Phase 4: The Canvas & "Shining Disco" ✨
- **Text Distortion**:
    - Created a `<canvas>` element rendering the text "VIBE".
    - **Particle System**: Text is composed of individual particles.
    - **Interaction**: Particles scatter/explode when the cursor touches them.
- **Effect Refinement**:
    - **From Square to Circle**: Refined particles to be rounded dots for a cleaner look.
    - **Shining Disco**: Added color cycling (HSL) and "Laser" beams connecting particles.
    - **Scanning Sweep**: Added a laser scanline effect on hover.

### Phase 5: Mobile & Responsiveness 📱
- **Touch Support**:
    - Mapped `touchmove` events to the cursor logic so mobile users can "draw" on the canvas.
- **Gyroscope Integration**:
    - Added **Tilt Control**: Tilting the phone moves the border glow and canvas particles.
    - **Permission Handling**: Added an "Enable Motion" button (iOS requirement) to request sensor access.
- **Optimization**:
    - Reduced particle density to **10%** for smooth 60fps performance on mobile.
    - Hid custom cursor overlays on small screens to prevent layout interference.

---

## 🛠 Tech Stack
- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+).
- **Rendering**: HTML5 Canvas API for particle effects.
- **Design System**: Custom CSS Variables, Glassmorphism, Neon Glows.
- **Deployment**: GitHub Pages.

## 🔗 Links
- **Repo**: [github.com/siva0704/vibe-streetwear](https://github.com/siva0704/vibe-streetwear)
- **Live Demo**: [siva0704.github.io/vibe-streetwear](https://siva0704.github.io/vibe-streetwear/)
