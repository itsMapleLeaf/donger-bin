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
      const content = await readFilePromise(this.savePath, "utf8")
      return JSON.parse(content)
    } catch {
      return this.defaultValue
    }
  }

  async save(data: D) {
    await makeDir(dirname(this.savePath))
    await writeFilePromise(this.savePath, JSON.stringify(data))
  }
}
