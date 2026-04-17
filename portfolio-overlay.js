(() => {
  const links = {
    linkedin: "https://linkedin.com/in/harshal-galande",
    github: "https://github.com/Harshalx07",
    email: "mailto:harshalgalande9@gmail.com",
    resume: new URL(
      "assets/documents/Harshal_Galande_DevOps-Resume.pdf",
      window.location.href
    ).href,
  }

  const shell = document.querySelector(".portfolio-shell")
  const toggle = document.querySelector(".portfolio-toggle")
  const startButton = document.querySelector(".start")

  if (!shell || !toggle) {
    return
  }

  let userToggled = false

  const setCollapsed = (collapsed) => {
    shell.classList.toggle("is-collapsed", collapsed)
    toggle.setAttribute("aria-expanded", String(!collapsed))
    toggle.textContent = collapsed ? "Open brief" : "Hide brief"
  }

  const applyInitialLayout = () => {
    if (userToggled) {
      return
    }

    setCollapsed(window.innerWidth < 960)
  }

  applyInitialLayout()
  window.addEventListener("resize", applyInitialLayout)

  toggle.addEventListener("click", () => {
    userToggled = true
    setCollapsed(!shell.classList.contains("is-collapsed"))
  })

  const revealUi = () => {
    document.body.classList.add("experience-started")
  }

  if (startButton) {
    startButton.addEventListener(
      "click",
      () => {
        window.setTimeout(revealUi, 650)
      },
      { once: true }
    )
  } else {
    revealUi()
  }

  const openExternal = (href) => {
    window.open(href, "_blank", "noopener,noreferrer")
  }

  const patchExperienceLinks = () => {
    const controller = window.experience && window.experience.controller

    if (!controller || controller.__harshalLinksPatched) {
      return Boolean(controller)
    }

    controller.__harshalLinksPatched = true

    const inAboutMode = () =>
      controller.logic.mode === "aboutMe" ||
      controller.logic.mode === "skills" ||
      controller.logic.mode === "experience"

    controller.socialControls.twitter = async () => {
      if (!controller.logic.buttonsLocked && inAboutMode()) {
        openExternal(links.linkedin)
      }
    }

    controller.socialControls.linkedIn = async () => {
      if (!controller.logic.buttonsLocked && inAboutMode()) {
        openExternal(links.linkedin)
      }
    }

    controller.socialControls.gitHub = async () => {
      if (!controller.logic.buttonsLocked && inAboutMode()) {
        openExternal(links.github)
      }
    }

    controller.socialControls.medium = async () => {
      if (!controller.logic.buttonsLocked && inAboutMode()) {
        openExternal(links.resume)
      }
    }

    controller.socialControls.mail = async () => {
      if (!controller.logic.buttonsLocked && inAboutMode()) {
        window.location.href = links.email
      }
    }

    controller.menuControls.jZhou = async (obj, color) => {
      if (!controller.logic.buttonsLocked && controller.logic.mode === "menu") {
        controller.sounds.playClick()
        controller.menuControls.buttonIndicator(obj, color)
        await controller.sleep(220)
        openExternal(links.github)
      }
    }

    controller.menuControls.articles = async (obj, color) => {
      if (!controller.logic.buttonsLocked && controller.logic.mode === "menu") {
        controller.sounds.playClick()
        controller.menuControls.buttonIndicator(obj, color)
        await controller.sleep(220)
        openExternal(links.resume)
      }
    }

    controller.projectControls.projectEnter = async () => {
      if (controller.logic.buttonsLocked) {
        return
      }

      const projectMode = controller.logic.mode
      const githubModes = new Set(["projects1", "projects2"])
      const resumeModes = new Set([
        "projects3",
        "projects4",
        "projects5",
        "projects6",
        "projects7",
        "projects8",
      ])

      if (githubModes.has(projectMode)) {
        controller.sounds.playClick()
        openExternal(links.github)
        return
      }

      if (resumeModes.has(projectMode)) {
        controller.sounds.playClick()
        openExternal(links.resume)
      }
    }

    return true
  }

  const theme = {
    bg: "#07111f",
    bgSoft: "#0d1b30",
    panel: "rgba(11, 24, 42, 0.92)",
    panelAlt: "rgba(16, 37, 60, 0.82)",
    text: "#f4fbff",
    muted: "#a7c3d9",
    cyan: "#5af0ff",
    green: "#8cffba",
    pink: "#ff70d7",
    amber: "#ffc95c",
    red: "#ff7d94",
    border: "rgba(132, 223, 235, 0.18)",
  }

  const waitForFonts = async () => {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready
      } catch (_error) {
        // Ignore font loading issues and fall back to the browser defaults.
      }
    }
  }

  const roundRect = (ctx, x, y, width, height, radius) => {
    const r = Math.min(radius, width / 2, height / 2)
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + width, y, x + width, y + height, r)
    ctx.arcTo(x + width, y + height, x, y + height, r)
    ctx.arcTo(x, y + height, x, y, r)
    ctx.arcTo(x, y, x + width, y, r)
    ctx.closePath()
  }

  const fillRoundedRect = (ctx, x, y, width, height, radius, fillStyle) => {
    ctx.save()
    roundRect(ctx, x, y, width, height, radius)
    ctx.fillStyle = fillStyle
    ctx.fill()
    ctx.restore()
  }

  const strokeRoundedRect = (
    ctx,
    x,
    y,
    width,
    height,
    radius,
    strokeStyle,
    lineWidth = 1
  ) => {
    ctx.save()
    roundRect(ctx, x, y, width, height, radius)
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
    ctx.restore()
  }

  const createCanvas = (width, height) => {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    return { canvas, ctx: canvas.getContext("2d"), width, height }
  }

  const drawBase = (ctx, width, height, accentA, accentB) => {
    ctx.fillStyle = theme.bg
    ctx.fillRect(0, 0, width, height)

    const baseGradient = ctx.createLinearGradient(0, 0, width, height)
    baseGradient.addColorStop(0, "#081424")
    baseGradient.addColorStop(0.55, "#0a1830")
    baseGradient.addColorStop(1, "#050d18")
    ctx.fillStyle = baseGradient
    ctx.fillRect(0, 0, width, height)

    const glowOne = ctx.createRadialGradient(
      width * 0.2,
      height * 0.15,
      0,
      width * 0.2,
      height * 0.15,
      width * 0.45
    )
    glowOne.addColorStop(0, accentA)
    glowOne.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = glowOne
    ctx.globalAlpha = 0.22
    ctx.fillRect(0, 0, width, height)

    const glowTwo = ctx.createRadialGradient(
      width * 0.85,
      height * 0.82,
      0,
      width * 0.85,
      height * 0.82,
      width * 0.35
    )
    glowTwo.addColorStop(0, accentB)
    glowTwo.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = glowTwo
    ctx.globalAlpha = 0.2
    ctx.fillRect(0, 0, width, height)
    ctx.globalAlpha = 1

    ctx.save()
    ctx.strokeStyle = "rgba(111, 209, 255, 0.08)"
    ctx.lineWidth = 1

    for (let x = 0; x < width; x += 48) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += 48) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    ctx.restore()
  }

  const textWidth = (ctx, text) => ctx.measureText(text).width

  const drawWrappedText = (
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight,
    maxLines = Infinity
  ) => {
    const paragraphs = String(text).split("\n")
    let currentY = y
    let lineCount = 0

    for (const paragraph of paragraphs) {
      const words = paragraph.split(/\s+/).filter(Boolean)
      let line = ""

      if (words.length === 0) {
        currentY += lineHeight
        lineCount += 1
        continue
      }

      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word
        if (textWidth(ctx, testLine) <= maxWidth || !line) {
          line = testLine
        } else {
          ctx.fillText(line, x, currentY)
          currentY += lineHeight
          lineCount += 1

          if (lineCount >= maxLines) {
            return currentY
          }

          line = word
        }
      }

      if (lineCount >= maxLines) {
        return currentY
      }

      ctx.fillText(line, x, currentY)
      currentY += lineHeight
      lineCount += 1

      if (lineCount >= maxLines) {
        return currentY
      }
    }

    return currentY
  }

  const drawChip = (ctx, x, y, label, fillStyle = "rgba(255,255,255,0.06)") => {
    ctx.save()
    ctx.font = "500 22px 'IBM Plex Mono', monospace"
    const width = textWidth(ctx, label) + 38
    fillRoundedRect(ctx, x, y, width, 48, 24, fillStyle)
    strokeRoundedRect(ctx, x, y, width, 48, 24, "rgba(255,255,255,0.08)")
    ctx.fillStyle = theme.text
    ctx.textBaseline = "middle"
    ctx.fillText(label, x + 19, y + 24)
    ctx.restore()
    return width
  }

  const drawMetric = (ctx, x, y, width, height, value, label, accent) => {
    fillRoundedRect(ctx, x, y, width, height, 28, "rgba(255,255,255,0.04)")
    strokeRoundedRect(ctx, x, y, width, height, 28, "rgba(255,255,255,0.08)")
    ctx.fillStyle = accent
    ctx.font = "700 46px 'Space Grotesk', sans-serif"
    ctx.fillText(value, x + 26, y + 60)
    ctx.fillStyle = theme.muted
    ctx.font = "500 24px 'Space Grotesk', sans-serif"
    drawWrappedText(ctx, label, x + 26, y + 98, width - 52, 30, 3)
  }

  const drawSectionCard = (ctx, x, y, width, height, title, lines, accent) => {
    fillRoundedRect(ctx, x, y, width, height, 30, theme.panel)
    strokeRoundedRect(ctx, x, y, width, height, 30, theme.border)

    ctx.fillStyle = accent
    ctx.font = "500 22px 'IBM Plex Mono', monospace"
    ctx.fillText(title.toUpperCase(), x + 28, y + 42)

    ctx.fillStyle = theme.text
    ctx.font = "600 28px 'Space Grotesk', sans-serif"
    const contentTop = y + 86

    if (Array.isArray(lines)) {
      let bulletY = contentTop

      for (const line of lines) {
        ctx.fillStyle = accent
        ctx.fillRect(x + 30, bulletY - 13, 12, 12)
        ctx.fillStyle = theme.muted
        ctx.font = "500 24px 'Space Grotesk', sans-serif"
        bulletY = drawWrappedText(ctx, line, x + 58, bulletY, width - 88, 30, 3) + 6
      }
    } else {
      ctx.fillStyle = theme.muted
      ctx.font = "500 24px 'Space Grotesk', sans-serif"
      drawWrappedText(ctx, lines, x + 28, contentTop, width - 56, 32, 7)
    }
  }

  const makeBigIntroScreen = (mobile) => {
    const { canvas, ctx, width, height } = createCanvas(
      mobile ? 1080 : 1600,
      mobile ? 1600 : 900
    )
    drawBase(ctx, width, height, "rgba(90, 240, 255, 0.9)", "rgba(255, 112, 215, 0.8)")

    fillRoundedRect(
      ctx,
      mobile ? 56 : 70,
      mobile ? 70 : 70,
      width - (mobile ? 112 : 140),
      height - (mobile ? 140 : 140),
      36,
      "rgba(6, 18, 32, 0.78)"
    )
    strokeRoundedRect(
      ctx,
      mobile ? 56 : 70,
      mobile ? 70 : 70,
      width - (mobile ? 112 : 140),
      height - (mobile ? 140 : 140),
      36,
      "rgba(132, 223, 235, 0.16)"
    )

    const left = mobile ? 96 : 118
    let y = mobile ? 150 : 150

    ctx.fillStyle = theme.green
    ctx.font = "500 24px 'IBM Plex Mono', monospace"
    ctx.fillText("CLOUD / DEVOPS / AUTOMATION", left, y)

    y += mobile ? 84 : 94
    ctx.fillStyle = theme.text
    ctx.font = mobile
      ? "700 72px 'Space Grotesk', sans-serif"
      : "700 82px 'Space Grotesk', sans-serif"
    ctx.fillText("Harshal Galande", left, y)

    y += mobile ? 72 : 78
    ctx.fillStyle = theme.cyan
    ctx.font = mobile
      ? "600 38px 'Space Grotesk', sans-serif"
      : "600 42px 'Space Grotesk', sans-serif"
    ctx.fillText("Cloud & DevOps Engineer", left, y)

    y += 60
    ctx.fillStyle = theme.muted
    ctx.font = "500 26px 'Space Grotesk', sans-serif"
    y = drawWrappedText(
      ctx,
      "Hands-on with AWS, Azure, GCP, Kubernetes, Terraform, Jenkins, Docker, Ansible, monitoring, and DevSecOps workflows built for practical delivery.",
      left,
      y,
      mobile ? width - 190 : 760,
      38,
      5
    )

    y += 18
    const chips = [
      "Pune, India",
      "AWS / Azure / GCP",
      "Docker + Kubernetes",
      "Terraform + Ansible",
      "Jenkins + GitHub",
      "DevSecOps",
    ]

    let chipX = left
    let chipY = y
    const chipLimit = mobile ? width - 96 : left + 800

    for (const chip of chips) {
      const chipWidth = textWidth(ctx, chip) + 38

      if (chipX + chipWidth > chipLimit) {
        chipX = left
        chipY += 62
      }

      chipX += drawChip(
        ctx,
        chipX,
        chipY,
        chip,
        "rgba(255,255,255,0.05)"
      ) + 12
    }

    const metricsY = mobile ? chipY + 96 : height - 236
    const metricWidth = mobile ? width - 192 : 300

    if (mobile) {
      drawMetric(ctx, left, metricsY, metricWidth, 130, "75%", "faster provisioning via IaC workflows", theme.amber)
      drawMetric(ctx, left, metricsY + 152, metricWidth, 130, "60%", "less manual deployment effort", theme.green)
      drawMetric(ctx, left, metricsY + 304, metricWidth, 130, "80%", "security coverage boost with DevSecOps", theme.pink)
    } else {
      drawMetric(ctx, left, metricsY, 290, 128, "75%", "faster provisioning with Terraform workflows", theme.amber)
      drawMetric(ctx, left + 314, metricsY, 290, 128, "60%", "less manual deployment effort through CI/CD", theme.green)
      drawMetric(ctx, left + 628, metricsY, 290, 128, "80%", "security coverage gain from DevSecOps checks", theme.pink)
    }

    const rightCardX = mobile ? left : width - 460
    const rightCardY = mobile ? metricsY + 470 : 140
    const rightCardWidth = mobile ? width - 192 : 320
    const rightCardHeight = mobile ? 300 : 560

    drawSectionCard(
      ctx,
      rightCardX,
      rightCardY,
      rightCardWidth,
      rightCardHeight,
      "Resume Snapshot",
      [
        "Cloud DevOps Intern at CloudDevOpsHub",
        "Built multi-cloud workflows across AWS, Azure, and GCP",
        "Created GitHub-Jenkins pipelines with Docker",
        "Worked with Kubernetes, Terraform, Trivy, OPA, Prometheus, and Grafana",
      ],
      theme.cyan
    )

    return canvas
  }

  const makeAboutScreen = (mobile) => {
    const { canvas, ctx, width, height } = createCanvas(
      mobile ? 1080 : 1600,
      mobile ? 1600 : 900
    )
    drawBase(ctx, width, height, "rgba(90, 240, 255, 0.92)", "rgba(140, 255, 186, 0.8)")

    const panelX = mobile ? 52 : 64
    const panelY = mobile ? 56 : 56
    const panelW = width - panelX * 2
    const panelH = height - panelY * 2

    fillRoundedRect(ctx, panelX, panelY, panelW, panelH, 38, "rgba(7, 18, 31, 0.8)")
    strokeRoundedRect(ctx, panelX, panelY, panelW, panelH, 38, theme.border)

    ctx.fillStyle = theme.green
    ctx.font = "500 24px 'IBM Plex Mono', monospace"
    ctx.fillText("ABOUT", panelX + 38, panelY + 50)

    ctx.fillStyle = theme.text
    ctx.font = mobile
      ? "700 54px 'Space Grotesk', sans-serif"
      : "700 64px 'Space Grotesk', sans-serif"
    ctx.fillText("Professional Summary", panelX + 38, panelY + 126)

    ctx.fillStyle = theme.muted
    ctx.font = "500 26px 'Space Grotesk', sans-serif"
    drawWrappedText(
      ctx,
      "Driven Cloud and DevOps Engineer with hands-on project experience in automation, cloud platforms, and modern DevOps tools. Focused on delivering real-world solutions using Docker, Kubernetes, Ansible, Terraform, Jenkins, and CI/CD pipelines across AWS, GCP, and Azure.",
      panelX + 38,
      panelY + 186,
      mobile ? panelW - 76 : 860,
      38,
      6
    )

    drawSectionCard(
      ctx,
      panelX + 38,
      mobile ? panelY + 410 : panelY + 390,
      mobile ? panelW - 76 : 540,
      mobile ? 250 : 230,
      "Key Highlights",
      [
        "Proficient with DevOps tools and infrastructure automation workflows.",
        "Built and released applications through CI/CD pipelines.",
        "Strong grasp of cloud-native architecture and Infrastructure as Code.",
      ],
      theme.cyan
    )

    drawSectionCard(
      ctx,
      mobile ? panelX + 38 : panelX + 606,
      mobile ? panelY + 690 : panelY + 390,
      mobile ? panelW - 76 : 438,
      mobile ? 220 : 230,
      "Objective",
      "To contribute in a Cloud or DevOps role where AWS, Kubernetes, Terraform, and CI/CD can be used to automate infrastructure and deliver secure, scalable cloud-native systems.",
      theme.amber
    )

    drawSectionCard(
      ctx,
      mobile ? panelX + 38 : panelX + 1072,
      mobile ? panelY + 944 : panelY + 390,
      mobile ? panelW - 76 : 426,
      mobile ? 220 : 230,
      "Contact",
      [
        "Pune, India",
        "harshalgalande9@gmail.com",
        "+91 81809 03425",
        "LinkedIn: harshal-galande",
        "GitHub: Harshalx07",
      ],
      theme.green
    )

    return canvas
  }

  const makeSkillsScreen = (mobile) => {
    const { canvas, ctx, width, height } = createCanvas(
      mobile ? 1080 : 1600,
      mobile ? 1600 : 900
    )
    drawBase(ctx, width, height, "rgba(140, 255, 186, 0.92)", "rgba(90, 240, 255, 0.72)")

    fillRoundedRect(ctx, 50, 52, width - 100, height - 104, 38, "rgba(7, 18, 31, 0.8)")
    strokeRoundedRect(ctx, 50, 52, width - 100, height - 104, 38, theme.border)

    ctx.fillStyle = theme.green
    ctx.font = "500 24px 'IBM Plex Mono', monospace"
    ctx.fillText("SKILLS", 88, 104)

    ctx.fillStyle = theme.text
    ctx.font = mobile
      ? "700 56px 'Space Grotesk', sans-serif"
      : "700 64px 'Space Grotesk', sans-serif"
    ctx.fillText("Core Stack & Tooling", 88, 172)

    const cards = [
      [
        "Cloud + Containers",
        "AWS, GCP, Azure with Docker and Kubernetes (GKE, EKS).",
      ],
      [
        "IaC + CI/CD",
        "Terraform, Ansible, Git, GitHub, Jenkins, and delivery pipelines.",
      ],
      [
        "Monitoring + DevSecOps",
        "Prometheus, Grafana, CloudWatch, Trivy, Aqua, OPA, secrets management.",
      ],
      [
        "Linux + Scripting",
        "Linux administration, troubleshooting, services, packages, Python, and Shell.",
      ],
      [
        "Networking",
        "VPC, Load Balancing, DNS, and TCP/IP fundamentals for cloud systems.",
      ],
      [
        "Mindset",
        "Problem-solving, collaboration, Agile teamwork, and AI tool integration interest.",
      ],
    ]

    const columnCount = mobile ? 1 : 2
    const gap = 18
    const cardWidth = mobile ? width - 176 : (width - 88 * 2 - gap) / 2
    const cardHeight = mobile ? 150 : 160
    let x = 88
    let y = 228

    cards.forEach(([title, body], index) => {
      drawSectionCard(ctx, x, y, cardWidth, cardHeight, title, body, index % 2 ? theme.green : theme.cyan)

      if ((index + 1) % columnCount === 0) {
        x = 88
        y += cardHeight + gap
      } else {
        x += cardWidth + gap
      }
    })

    return canvas
  }

  const makeExperienceScreen = (mobile) => {
    const { canvas, ctx, width, height } = createCanvas(
      mobile ? 1080 : 1600,
      mobile ? 1600 : 900
    )
    drawBase(ctx, width, height, "rgba(255, 201, 92, 0.9)", "rgba(90, 240, 255, 0.8)")

    fillRoundedRect(ctx, 50, 52, width - 100, height - 104, 38, "rgba(7, 18, 31, 0.8)")
    strokeRoundedRect(ctx, 50, 52, width - 100, height - 104, 38, theme.border)

    ctx.fillStyle = theme.amber
    ctx.font = "500 24px 'IBM Plex Mono', monospace"
    ctx.fillText("EXPERIENCE", 88, 104)

    ctx.fillStyle = theme.text
    ctx.font = mobile
      ? "700 54px 'Space Grotesk', sans-serif"
      : "700 62px 'Space Grotesk', sans-serif"
    ctx.fillText("Cloud DevOps Intern", 88, 170)

    ctx.fillStyle = theme.cyan
    ctx.font = "600 30px 'Space Grotesk', sans-serif"
    ctx.fillText("CloudDevOpsHub | Indore, India | 2025 - 2026", 88, 216)

    drawMetric(ctx, 88, mobile ? 260 : 270, mobile ? width - 176 : 310, 128, "75%", "faster provisioning with Terraform workflows", theme.amber)
    drawMetric(
      ctx,
      mobile ? 88 : 422,
      mobile ? 410 : 270,
      mobile ? width - 176 : 310,
      128,
      "60%",
      "reduction in manual deployment effort",
      theme.green
    )
    drawMetric(
      ctx,
      mobile ? 88 : 756,
      mobile ? 560 : 270,
      mobile ? width - 176 : 310,
      128,
      "80%",
      "security coverage improvement from DevSecOps integration",
      theme.pink
    )

    drawSectionCard(
      ctx,
      88,
      mobile ? 720 : 438,
      mobile ? width - 176 : 690,
      mobile ? 350 : 318,
      "What I Worked On",
      [
        "Executed cloud-native projects using AWS, Azure, GCP, Kubernetes, and Terraform across multi-cloud platforms.",
        "Built GitHub-Jenkins CI/CD pipelines with Docker for production-ready deployments.",
        "Integrated Trivy scanning, OPA policy checks, and secrets management into delivery flows.",
        "Contributed in Agile sprints using Git, GitHub, and Jira.",
      ],
      theme.cyan
    )

    drawSectionCard(
      ctx,
      806,
      438,
      706,
      318,
      "Strengths",
      [
        "Multi-cloud delivery mindset",
        "Infrastructure as Code with Terraform and Ansible",
        "Containers, Kubernetes, and cloud-native deployment",
        "Monitoring, logging, and secure release practices",
      ],
      theme.green
    )

    if (mobile) {
      drawSectionCard(
        ctx,
        88,
        1096,
        width - 176,
        260,
        "Mentored By",
        "Worked under Vikas Ratnawat, Founder, while focusing on practical automation, deployment, and operational improvement.",
        theme.amber
      )
    }

    return canvas
  }

  const makeProjectTerminalDefault = () => {
    const { canvas, ctx, width, height } = createCanvas(1024, 1400)
    drawBase(ctx, width, height, "rgba(90, 240, 255, 0.92)", "rgba(255, 201, 92, 0.82)")

    fillRoundedRect(ctx, 64, 70, width - 128, height - 140, 36, "rgba(7, 18, 31, 0.84)")
    strokeRoundedRect(ctx, 64, 70, width - 128, height - 140, 36, theme.border)

    ctx.fillStyle = theme.green
    ctx.font = "500 22px 'IBM Plex Mono', monospace"
    ctx.fillText("PROJECT TERMINAL", 104, 120)

    ctx.fillStyle = theme.text
    ctx.font = "700 58px 'Space Grotesk', sans-serif"
    ctx.fillText("Harshal's Build Board", 104, 206)

    ctx.fillStyle = theme.muted
    ctx.font = "500 26px 'Space Grotesk', sans-serif"
    drawWrappedText(
      ctx,
      "Use the project menu to open delivery work, multi-cloud automation, Kubernetes deployments, and resume-backed DevOps capabilities.",
      104,
      268,
      width - 208,
      38,
      5
    )

    drawMetric(ctx, 104, 480, width - 208, 138, "2", "resume-listed project builds", theme.cyan)
    drawMetric(ctx, 104, 644, width - 208, 138, "6", "additional capability cards mapped from experience", theme.green)
    drawMetric(ctx, 104, 808, width - 208, 138, "1", "click Enter on a card for GitHub or resume", theme.amber)

    drawSectionCard(
      ctx,
      104,
      986,
      width - 208,
      212,
      "Quick View",
      [
        "1. Java Spring Boot CI/CD",
        "2. E-Commerce Microservices",
        "3-8. Internship, IaC, Kubernetes, DevSecOps, Ops stack, Contact",
      ],
      theme.pink
    )

    return canvas
  }

  const makeProjectMenu = () => {
    const { canvas, ctx, width, height } = createCanvas(1024, 1400)
    drawBase(ctx, width, height, "rgba(90, 240, 255, 0.88)", "rgba(140, 255, 186, 0.78)")

    fillRoundedRect(ctx, 52, 58, width - 104, height - 116, 34, "rgba(7, 18, 31, 0.82)")
    strokeRoundedRect(ctx, 52, 58, width - 104, height - 116, 34, theme.border)

    ctx.fillStyle = theme.green
    ctx.font = "500 22px 'IBM Plex Mono', monospace"
    ctx.fillText("SELECT A CARD", 88, 106)

    ctx.fillStyle = theme.text
    ctx.font = "700 48px 'Space Grotesk', sans-serif"
    ctx.fillText("Projects + Capability Snapshots", 88, 178)

    const cards = [
      ["01", "CI/CD for Spring Boot", theme.cyan],
      ["02", "Microservices on GKE", theme.green],
      ["03", "Internship Impact", theme.amber],
      ["04", "Terraform + Multi-Cloud", theme.pink],
      ["05", "Docker + Kubernetes", theme.cyan],
      ["06", "Monitoring + DevSecOps", theme.green],
      ["07", "Linux + Networking", theme.amber],
      ["08", "Contact + Resume", theme.pink],
    ]

    const cardWidth = 402
    const cardHeight = 110
    const gap = 22
    let x = 88
    let y = 248

    cards.forEach(([num, label, accent], index) => {
      fillRoundedRect(ctx, x, y, cardWidth, cardHeight, 26, "rgba(255,255,255,0.04)")
      strokeRoundedRect(ctx, x, y, cardWidth, cardHeight, 26, "rgba(255,255,255,0.08)")
      ctx.fillStyle = accent
      ctx.font = "700 28px 'IBM Plex Mono', monospace"
      ctx.fillText(num, x + 24, y + 44)
      ctx.fillStyle = theme.text
      ctx.font = "600 28px 'Space Grotesk', sans-serif"
      drawWrappedText(ctx, label, x + 24, y + 84, cardWidth - 48, 32, 2)

      if (index % 2 === 1) {
        x = 88
        y += cardHeight + gap
      } else {
        x += cardWidth + gap
      }
    })

    ctx.fillStyle = theme.muted
    ctx.font = "500 24px 'Space Grotesk', sans-serif"
    drawWrappedText(
      ctx,
      "Click a numbered tile to load its detail. Use Enter for GitHub on the first two cards, or the hosted resume for the rest.",
      88,
      1188,
      width - 176,
      34,
      4
    )

    return canvas
  }

  const projectCards = [
    {
      title: "CI/CD Pipeline for Java Spring Boot",
      eyebrow: "PROJECT 01",
      accent: theme.cyan,
      stack: "GitHub | Jenkins | Docker | Jenkinsfile",
      bullets: [
        "Built a CI/CD pipeline that improved build speed and reliability by 50%.",
        "Containerized the application and deployed it to a remote server.",
        "Automated testing and production rollout in one delivery path.",
      ],
      footer: "Enter opens GitHub",
    },
    {
      title: "E-Commerce Application with Microservices",
      eyebrow: "PROJECT 02",
      accent: theme.green,
      stack: "Java | Python | Go | .NET | Kubernetes | GKE",
      bullets: [
        "Engineered a modular microservices backend for an e-commerce platform.",
        "Deployed services on Google Kubernetes Engine (GKE).",
        "Improved uptime and scalability by 70%.",
      ],
      footer: "Enter opens GitHub",
    },
    {
      title: "Cloud DevOps Internship Impact",
      eyebrow: "PROJECT 03",
      accent: theme.amber,
      stack: "CloudDevOpsHub | AWS | Azure | GCP | Terraform",
      bullets: [
        "Worked on automation and scalability across multi-cloud platforms.",
        "Helped standardize cloud provisioning and deployment workflows.",
        "Focused on practical delivery under mentorship at CloudDevOpsHub.",
      ],
      footer: "Enter opens Resume",
    },
    {
      title: "Multi-Cloud Infrastructure as Code",
      eyebrow: "PROJECT 04",
      accent: theme.pink,
      stack: "Terraform | AWS | Azure | GCP | IaC",
      bullets: [
        "Orchestrated infrastructure-as-code workflows across three cloud platforms.",
        "Reduced provisioning time by 75% with repeatable automation.",
        "Improved consistency by standardizing environment configuration.",
      ],
      footer: "Enter opens Resume",
    },
    {
      title: "Docker & Kubernetes Delivery",
      eyebrow: "PROJECT 05",
      accent: theme.cyan,
      stack: "Docker | Kubernetes | GKE | EKS | Containers",
      bullets: [
        "Built container-first delivery workflows for cloud-native applications.",
        "Used Kubernetes to improve scalability, rollout control, and service resilience.",
        "Supported production-ready deployment patterns for real workloads.",
      ],
      footer: "Enter opens Resume",
    },
    {
      title: "Monitoring & DevSecOps",
      eyebrow: "PROJECT 06",
      accent: theme.green,
      stack: "Prometheus | Grafana | CloudWatch | Trivy | OPA",
      bullets: [
        "Integrated scanning, policy checks, and secrets handling into deployments.",
        "Used observability tooling for healthier systems and clearer operations.",
        "Raised security coverage by 80% through secure delivery practices.",
      ],
      footer: "Enter opens Resume",
    },
    {
      title: "Linux, Networking & Automation",
      eyebrow: "PROJECT 07",
      accent: theme.amber,
      stack: "Linux | Python | Shell | VPC | DNS | Load Balancing",
      bullets: [
        "Comfortable with Linux troubleshooting, services, packages, and boot flow.",
        "Worked with networking foundations including VPC, DNS, TCP/IP, and load balancing.",
        "Used scripting to simplify repetitive operational work.",
      ],
      footer: "Enter opens Resume",
    },
    {
      title: "Contact & Resume",
      eyebrow: "PROJECT 08",
      accent: theme.pink,
      stack: "Pune | LinkedIn | GitHub | Email",
      bullets: [
        "LinkedIn: linkedin.com/in/harshal-galande",
        "GitHub: github.com/Harshalx07",
        "Email: harshalgalande9@gmail.com",
      ],
      footer: "Enter opens Resume",
    },
  ]

  const makeProjectCard = (card) => {
    const { canvas, ctx, width, height } = createCanvas(1024, 1400)
    drawBase(ctx, width, height, "rgba(90, 240, 255, 0.82)", "rgba(255, 112, 215, 0.7)")

    fillRoundedRect(ctx, 52, 58, width - 104, height - 116, 34, "rgba(7, 18, 31, 0.82)")
    strokeRoundedRect(ctx, 52, 58, width - 104, height - 116, 34, theme.border)

    ctx.fillStyle = card.accent
    ctx.font = "500 22px 'IBM Plex Mono', monospace"
    ctx.fillText(card.eyebrow, 92, 108)

    ctx.fillStyle = theme.text
    ctx.font = "700 54px 'Space Grotesk', sans-serif"
    drawWrappedText(ctx, card.title, 92, 186, width - 184, 60, 3)

    fillRoundedRect(ctx, 92, 324, width - 184, 86, 24, "rgba(255,255,255,0.04)")
    strokeRoundedRect(ctx, 92, 324, width - 184, 86, 24, "rgba(255,255,255,0.08)")
    ctx.fillStyle = theme.muted
    ctx.font = "500 22px 'IBM Plex Mono', monospace"
    drawWrappedText(ctx, card.stack, 120, 375, width - 240, 28, 2)

    drawSectionCard(
      ctx,
      92,
      458,
      width - 184,
      470,
      "Details",
      card.bullets,
      card.accent
    )

    drawSectionCard(
      ctx,
      92,
      968,
      width - 184,
      190,
      "Action",
      card.footer,
      theme.green
    )

    ctx.fillStyle = theme.muted
    ctx.font = "500 24px 'Space Grotesk', sans-serif"
    drawWrappedText(
      ctx,
      "Use Back to return to the menu and explore the next card.",
      92,
      1232,
      width - 184,
      32,
      3
    )

    return canvas
  }

  const assignGeneratedTexture = (resources, key, canvas, referenceKey = key) =>
    new Promise((resolve) => {
      const dataUrl = canvas.toDataURL("image/png")
      const existing = resources.items[key]
      const reference = resources.items[referenceKey] || existing

      resources.loaders.textureLoader.load(dataUrl, (texture) => {
        if (reference) {
          texture.flipY = reference.flipY
          texture.encoding = reference.encoding
          texture.magFilter = reference.magFilter
          texture.minFilter = reference.minFilter
          texture.wrapS = reference.wrapS
          texture.wrapT = reference.wrapT
          texture.anisotropy = reference.anisotropy
        } else {
          texture.flipY = false
        }

        texture.needsUpdate = true

        if (existing && typeof existing.dispose === "function") {
          existing.dispose()
        }

        resources.items[key] = texture
        resolve(texture)
      })
    })

  const refreshActiveScreens = (experience) => {
    const { controller, materials, resources, config } = experience
    const vertical = config.vertical === true

    const setBigScreen = (texture, isDefault = false) => {
      materials.bigScreenMaterial.uniforms.uTexture1.value = texture
      materials.bigScreenMaterial.uniforms.uTexture2.value = texture
      materials.bigScreenMaterial.uniforms.uProgress.value = 0
      materials.bigScreenMaterial.uniforms.uTexture1IsDefault.value = isDefault ? 1 : 0
      materials.bigScreenMaterial.uniforms.uTexture2IsDefault.value = isDefault ? 1 : 0
    }

    const setProjectScreen = (texture, isDefault = false) => {
      materials.vendingMachineScreenMaterial.uniforms.uTexture1.value = texture
      materials.vendingMachineScreenMaterial.uniforms.uTexture2.value = texture
      materials.vendingMachineScreenMaterial.uniforms.uProgress.value = 0
      materials.vendingMachineScreenMaterial.uniforms.uTexture1IsDefault.value = isDefault ? 1 : 0
      materials.vendingMachineScreenMaterial.uniforms.uTexture2IsDefault.value = isDefault ? 1 : 0
    }

    switch (controller.logic.mode) {
      case "aboutMe":
        setBigScreen(
          vertical
            ? resources.items.bigScreenAboutMeMobileTexture
            : resources.items.bigScreenAboutMeTexture
        )
        break
      case "skills":
        setBigScreen(
          vertical
            ? resources.items.bigScreenSkillsMobileTexture
            : resources.items.bigScreenSkillsTexture
        )
        break
      case "experience":
        setBigScreen(
          vertical
            ? resources.items.bigScreenExperienceMobileTexture
            : resources.items.bigScreenExperienceTexture
        )
        break
      case "projects0":
        setProjectScreen(resources.items.vendingMachineMenuTexture)
        break
      case "projects1":
      case "projects2":
      case "projects3":
      case "projects4":
      case "projects5":
      case "projects6":
      case "projects7":
      case "projects8": {
        const projectKey = `${controller.logic.mode.replace("projects", "project")}Texture`
        setProjectScreen(resources.items[projectKey])
        break
      }
      default:
        break
    }
  }

  const injectPortfolioScreens = async () => {
    const experience = window.experience

    if (experience && experience.__harshalScreenPatchApplied) {
      return true
    }

    if (
      !experience ||
      !experience.resources ||
      !experience.resources.loaders ||
      !experience.resources.loaders.textureLoader ||
      !experience.materials ||
      !experience.materials.bigScreenMaterial ||
      !experience.materials.vendingMachineScreenMaterial
    ) {
      return false
    }

    experience.__harshalScreenPatchApplied = true
    await waitForFonts()

    const resources = experience.resources
    const materials = experience.materials

    const generatedScreens = [
      ["bigScreenDefaultTexture", makeBigIntroScreen(false)],
      ["bigScreenAboutMeTexture", makeAboutScreen(false)],
      ["bigScreenSkillsTexture", makeSkillsScreen(false)],
      ["bigScreenExperienceTexture", makeExperienceScreen(false)],
      ["bigScreenAboutMeMobileTexture", makeAboutScreen(true)],
      ["bigScreenSkillsMobileTexture", makeSkillsScreen(true)],
      ["bigScreenExperienceMobileTexture", makeExperienceScreen(true)],
      ["vendingMachineDefaultTexture", makeProjectTerminalDefault()],
      ["vendingMachineMenuTexture", makeProjectMenu()],
      ...projectCards.map((card, index) => [`project${index + 1}Texture`, makeProjectCard(card)]),
    ]

    for (const [key, canvas] of generatedScreens) {
      await assignGeneratedTexture(resources, key, canvas)
    }

    materials.bigScreenMaterial.uniforms.uDefaultTexture.value =
      resources.items.bigScreenDefaultTexture
    materials.vendingMachineScreenMaterial.uniforms.uDefaultTexture.value =
      resources.items.vendingMachineDefaultTexture

    refreshActiveScreens(experience)
    return true
  }

  if (!patchExperienceLinks()) {
    const patchTimer = window.setInterval(() => {
      if (patchExperienceLinks()) {
        window.clearInterval(patchTimer)
      }
    }, 400)
  }

  injectPortfolioScreens().then((applied) => {
    if (!applied) {
      const textureTimer = window.setInterval(async () => {
        if (await injectPortfolioScreens()) {
          window.clearInterval(textureTimer)
        }
      }, 450)
    }
  })
})()
