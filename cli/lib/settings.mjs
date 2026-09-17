import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

export const settingsPath = path.join(os.homedir(), '.config', 'antislop', 'settings.json')
const modes = ['during', 'after', 'ask']

export function readSettings(file = settingsPath) {
  let settings
  try {
    settings = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    if (error.code === 'ENOENT') return {}
    throw new Error(`Cannot read ${file}: ${error.message}`)
  }
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
    throw new Error(`Expected a JSON object in ${file}`)
  }
  return settings
}

export function configureMode(args, file = settingsPath) {
  if (args.length > 1 || (args.length === 1 && !modes.includes(args[0]))) {
    throw new Error('Usage: antislop-ai --mode [during|after|ask]')
  }
  const settings = readSettings(file)
  if (args.length) {
    settings.mode = args[0]
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, JSON.stringify(settings, null, 2) + '\n')
  }
  const mode = settings.mode === undefined ? 'ask' : settings.mode
  if (!modes.includes(mode)) throw new Error(`Invalid mode in ${file}. Set --mode during, after, or ask.`)
  return `antislop global mode: ${mode}${settings.mode === undefined ? ' (default)' : ''}\n${file}`
}
