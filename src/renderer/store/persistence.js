import { remote } from 'electron'
import fs from 'fs'
import { ensureDirSync } from 'fs-extra'
import path from 'path'
import { promisify } from 'util'
import { ServiceManager, ConfigManager } from 'cp_core'

export const storePath = path.join(remote.app.getPath('userData'), 'data')
console.log(storePath)
ensureDirSync(storePath)
const serviceFile = path.resolve(storePath, 'service.json')
const configFile = path.resolve(storePath, 'config.json')

export async function saveServices () {
  await promisify(fs.writeFile)(serviceFile, JSON.stringify(ServiceManager.exportServices(), null, 2), { encoding: 'utf8' })
}

export async function readServices () {
  try {
    const str = await promisify(fs.readFile)(serviceFile, { encoding: 'utf8' })
    const data = JSON.parse(str)
    ServiceManager.importServices(data)
  } catch (error) {
    //
  }
}

export async function saveConfigs () {
  await promisify(fs.writeFile)(configFile, JSON.stringify(ConfigManager.exportConfigMap(), null, 2), { encoding: 'utf8' })
}

export async function readConfigs () {
  try {
    const str = await promisify(fs.readFile)(configFile, { encoding: 'utf8' })
    const data = JSON.parse(str)
    ConfigManager.importConfigMap(ServiceManager.getServices(), data)
  } catch (error) {
    //
  }
}
