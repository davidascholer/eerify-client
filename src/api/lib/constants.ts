// horrorTriggers.ts

export const HORROR_TRIGGER_DEFINITIONS = {
  doesTheDogDie: {
    label: "Does the Dog Die",
    description: "An animal dies or is seriously harmed during the movie."
  },
  jumpScare: {
    label: "Jump Scare",
    description: "The movie contains sudden loud noises or visuals intended to startle the viewer."
  },
  blood: {
    label: "Blood",
    description: "The movie contains frequent or excessive amounts of blood."
  },
  bodyHorror: {
    label: "Body Horror",
    description: "Disturbing transformations or violations of the human body (Cronenberg-style)."
  },
  surgery: {
    label: "Surgery",
    description: "Scenes involving medical procedures, needles, or surgical instruments."
  },
  isolation: {
    label: "Isolation",
    description: "Themes of loneliness, emptiness, or characters being cut off from others."
  },
  doom: {
    label: "Doom",
    description: "A persistent sense that no matter what the characters do, the outcome is bleak."
  },
  possession: {
    label: "Possession",
    description: "A character, animal, or object is overtaken or controlled by another entity."
  },
  torture: {
    label: "Torture",
    description: "Living beings are deliberately subjected to pain or suffering."
  }
} as const;
