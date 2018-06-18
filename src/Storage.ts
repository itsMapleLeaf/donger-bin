import { readFile, writeFile } from "fs"
import makeDir from "make-dir"
import { dirname } from "path"
import { promisify } from "util"

const readFilePromise = promisify(readFile)
const writeFilePromise = promisify(writeFile)

export class Storage<D> {
  constructor(private defaultValue: D, private savePath: string) {}

  async load(): Promise<D> {
    try {
      const buffer = await readFilePromise(this.savePath)
      return JSON.parse(buffer.toString())
    } catch {
      return this.defaultValue
    }
  }

  async save(data: D) {
    await makeDir(dirname(this.savePath))
    await writeFilePromise(this.savePath, JSON.stringify(data))
  }
}
