# 🧠 SentinelMind
### Human-Aware Zero Trust Security
**Security that understands people, not just credentials.**

---

<div align="center">
  <img src="public/favicon.svg" alt="SentinelMind Logo" width="120" />
  <h1>SentinelMind</h1>
  <p>
    <b>The First Security Platform to Measure Human Reliability in Real-Time.</b>
  </p>

  [![Status](https://img.shields.io/badge/Status-Prototype_Active-06b6d4?style=for-the-badge&logo=react)](https://sentinelmind.demo)
  [![Security Model](https://img.shields.io/badge/Model-Human_Zero_Trust-ef4444?style=for-the-badge&logo=shield)](https://sentinelmind.demo)
  [![Tech Stack](https://img.shields.io/badge/Tech-React_|_Three.js_|_Tailwind-blueviolet?style=for-the-badge&logo=typescript)](https://sentinelmind.demo)
</div>

---

## 🔥 Why Now? The 2025 Security Crisis
> **"Security systems do not measure human reliability in real time."**

*   **80–90%** of data breaches involve human error.
*   **Traditional Zero Trust** protects networks and devices but ignores the *state of the user*.
*   **AI acceleration** means human mistakes happen faster and cost more.

**SentinelMind bridges this critical gap.** We don't just verify *who* you are (Identity) or *what* you're using (Device). We verify *how* you are behaving right now.

---

## ⚡ What No Existing System Does

| Feature | 🔒 Traditional Zero Trust | 🧠 SentinelMind |
| :--- | :---: | :---: |
| **Identity Verification** | ✅ | ✅ |
| **Device Health Checks** | ✅ | ✅ |
| **Human Reliability Analysis** | ❌ | **✅ (Real-time HRS)** |
| **Continuous Trust Re-evaluation** | ❌ | **✅ (Dynamic)** |
| **Stress/Fatigue Detection** | ❌ | **✅ (Behavioral)** |
| **Explainable Decisions** | ❌ | **✅ (Transparency)** |

---

## 🧠 The Solution: Human Reliability Score (HRS)

SentinelMind introduces the **HRS Engine**, a background prosessing layer that continuously evaluates user interactions to detect anomalies *before* a breach occurs.

### 🛑 BEFORE SentinelMind
1.  **Login once** -> Full Trust granted using static credentials.
2.  **User panics/rushes** -> System ignores behavior.
3.  **Mistake made** -> Breach occurs. **Too late.**

### ✅ AFTER SentinelMind
1.  **Continuous Evaluation** -> Trust is fluid, not binary.
2.  **Risk Detected** -> HRS drops (e.g., erratic mouse movement, rapid API calls).
3.  **Dynamic Response** -> Access throttled *before* damage is done.

---

## 📸 Interactive Demo Preview

### 1. The Command Center (Login V2)
*A movie-grade entry point featuring a split-screen 3D experience.*
- **Left**: Interactive 3D neural network simulation.
- **Right**: Real-time 3D Cyber Globe visualizing global threat data.
*Screenshot placeholder: Login Page*

### 2. The Dashboard (Simulator Mode)
*The heart of the demo. Watch the HRS engine adapt in real-time.*
- **Simulator Controls**: Toggle "Stress Mode", "Breach Scenario", or "Fatigue".
- **Real-Time Readout**: Watch the HRS graph dip and recover.
- **Dynamic UI**: Access panels lock/unlock instantly based on score.
*Screenshot placeholder: Dashboard with Simulator ON*

---

## 🚀 How It Works (The 9-Phase Flow)

### 🟢 Phase 1-3: Baseline (Invisible Protection)
*   **User Enters**: Standard login (integration friendly).
*   **Observation**: System tracks behavioral biomarkers (typing cadence, click velocity, sequence deviation).
*   **Scoring**: HRS remains **Stable (75-100)**. Access is normal.

### 🟠 Phase 4-5: Detection & Response (The Magic)
*   **Trigger**: User starts rushing downloads or accessing sensitive files erratically.
*   **Analysis**: Anomaly detected. **HRS Drops to 42 (Unreliable)**.
*   **Action**: "Dynamic Access Adjustment". Bulk download is disabled. One-click actions now require confirmation.
    > *"Access limited temporarily due to unusual activity pattern."*

### 🟣 Phase 6-7: Explainability & Recovery
*   **Why?**: User clicks "Why was I blocked?". System shows: *"High velocity actions + Unusual path"*.
*   **Recovery**: User slows down -> Behavior stabilizes -> **HRS Rises** -> Access restored automatically.

---

## 🛡️ Critical "Show-Stoppers" Addressing

| Concern | Reality & Mitigation |
| :--- | :--- |
| **"Isn't human behavior subjective?"** | **Yes.** That's why we use *risk ranges*, not binary labels. We adjust sensitivity, we don't ban users. Humans stay in the loop. |
| **False Positives (Blocking real users)** | **Mitigated by Gradual Response.** We slow users down or ask for confirmation; we don't lock them out. Work continues, just safely. |
| **Privacy Concerns (Surveillance)** | **Zero Personal Data.** We track *system interaction events* (mouse velocity, API call rate), not biometrics, cameras, or content. |
| **Adoption Resistance** | **Simulator-First Approach.** We prove value via simulation before protecting real assets. Works alongside existing tools. |

---

## 🛠️ Technology Stack
*   **Frontend**: React 18, TypeScript, Vite
*   **UI/UX**: TailwindCSS, Shadcn/UI, Framer Motion (Advanced Animations)
*   **3D Visualization**: `react-globe.gl` (Cyber Threat Map), Canvas API (Neural Network)
*   **State Management**: React Context (Simulator Engine)

---

## 🔮 Future Roadmap
1.  **Hackathon**: Fully functional Simulator & Frontend Prototype. **(Current)**
2.  **Pilot**: Integration with key logger for local workstation testing.
3.  **Enterprise**: API connectors for Okta/Splunk to feed real-time security data.

---

<div align="center">
  <p>© 2025 Team GRAVITON</p>
</div>
