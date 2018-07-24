import { Team } from '../models/team'

interface FloodMessage {
  _id: string
  isFile: boolean
  timestamp: number
  userID: string
}

interface FloodControl {
  teams?: {
    [key: string]: {
      channels?: {
        [key: string]: {
          threads?: {
            [key: string]: {
              messages?: FloodMessage[]
            }
          }
        }
      }
    }
  }
}

const floodControl: FloodControl = {}

const mainThreadName = 'main'
const floodSeconds = 20

export function initFloodFeature() {
  // noop
}

function createObjects({
  teamID,
  channelID,
  threadID,
}: {
  teamID: Team['_id']
  channelID: string
  threadID?: string
}) {
  const _threadID = threadID || mainThreadName

  floodControl.teams = floodControl.teams || {}
  floodControl.teams[teamID] = floodControl.teams[teamID] || {}
  const teamTree = floodControl.teams[teamID]

  teamTree.channels = teamTree.channels || {}
  teamTree.channels[channelID] = teamTree.channels[channelID] || {}
  const channelTree = teamTree.channels[channelID]

  channelTree.threads = channelTree.threads || {}
  channelTree.threads[_threadID] = channelTree.threads[_threadID] || {}
  const threadTree = channelTree.threads[_threadID]

  threadTree.messages = threadTree.messages || []

  return floodControl
}

export function removeMessage({
  teamID,
  channelID,
  threadID,
  messageID,
}: {
  teamID: Team['_id']
  channelID: string
  threadID?: string
  messageID: string
}) {
  const _threadID = threadID || mainThreadName

  const flood = createObjects({ teamID, channelID, threadID: _threadID })

  let messages = flood.teams![teamID].channels![channelID].threads![_threadID].messages!
  messages = messages.filter(message => message._id !== messageID)

  flood.teams![teamID].channels![channelID].threads![_threadID].messages = messages
  // console.log('[flood.removeMessage]', messageID, JSON.stringify(floodControl))
}

export function registerMessage({
  teamID,
  channelID,
  threadID,
  messageID,
  userID,
  timestamp,
  isFile,
}: {
  teamID: Team['_id']
  channelID: string
  threadID?: string
  messageID: string
  userID: string
  timestamp: number
  isFile: boolean
}) {
  const _threadID = threadID || mainThreadName

  const flood = createObjects({ teamID, channelID, threadID: _threadID })
  flood.teams![teamID].channels![channelID].threads![_threadID].messages!.push({
    _id: messageID,
    isFile,
    timestamp,
    userID,
  })
  // console.log('[flood.registerMessage]', messageID, JSON.stringify(floodControl))
}

export function registerTemporaryMessage({
  teamID,
  channelID,
  threadID,
  messageID,
  userID,
  timestamp,
  isFile = false,
  cleanAfterSeconds = floodSeconds,
}: {
  teamID: Team['_id']
  channelID: string
  threadID: string
  messageID: string
  userID: string
  timestamp: number
  isFile?: boolean
  cleanAfterSeconds?: number
}) {
  const _threadID = threadID || mainThreadName

  registerMessage({ teamID, channelID, threadID: _threadID, messageID, userID, timestamp, isFile })

  // console.log(
  //   '[flood.registerTemporaryMessage][timer]',
  //   cleanAfterSeconds,
  //   messageID,
  //   JSON.stringify(floodControl),
  // )
  setTimeout(() => {
    removeMessage({ teamID, channelID, threadID: _threadID, messageID })
  }, cleanAfterSeconds * 1000)
}

export function isUserFloodingThread({
  teamID,
  channelID,
  threadID,
  userID,
  numberOfMessagesAllowed = 1,
}: {
  teamID: Team['_id']
  channelID: string
  threadID: string
  userID: string
  numberOfMessagesAllowed?: number
}) {
  const _threadID = threadID || mainThreadName

  const flood = createObjects({ teamID, channelID, threadID: _threadID })

  const _messages = flood.teams![teamID].channels![channelID].threads![_threadID].messages!
  const normalMessages = _messages.filter(message => message.userID === userID && !message.isFile)
  const fileMessages = _messages.filter(message => message.userID === userID && !!message.isFile)

  return (
    normalMessages.length > numberOfMessagesAllowed ||
    fileMessages.length > numberOfMessagesAllowed ||
    normalMessages.length + fileMessages.length > numberOfMessagesAllowed + 1
  )
}
