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

      if (controller.logic.mode === "projects1" || controller.logic.mode === "projects2") {
        controller.sounds.playClick()
        openExternal(links.github)
        return
      }

      if (
        controller.logic.mode === "projects3" ||
        controller.logic.mode === "projects4" ||
        controller.logic.mode === "projects5" ||
        controller.logic.mode === "projects6" ||
        controller.logic.mode === "projects7" ||
        controller.logic.mode === "projects8"
      ) {
        controller.sounds.playClick()
        openExternal(links.resume)
      }
    }

    return true
  }

  if (!patchExperienceLinks()) {
    const patchTimer = window.setInterval(() => {
      if (patchExperienceLinks()) {
        window.clearInterval(patchTimer)
      }
    }, 400)
  }
})()
