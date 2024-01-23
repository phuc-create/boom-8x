import {
  PICKET_INIT,
  FAKE_BOOM_WARNING,
  PICKET_ACTIVE,
  BOOM_WARNING,
  BOOM_DANGEROUS_ZONE,
  BOOM_INIT,
} from './constants'

const checkIdx = (num: number) => {
  switch (num) {
    case PICKET_INIT:
      return FAKE_BOOM_WARNING

    case PICKET_ACTIVE:
      return PICKET_ACTIVE

    case BOOM_WARNING:
      return BOOM_DANGEROUS_ZONE

    case BOOM_DANGEROUS_ZONE:
      return BOOM_DANGEROUS_ZONE

    case BOOM_INIT:
      return BOOM_WARNING

    default:
      return FAKE_BOOM_WARNING
  }
}

export { checkIdx }
