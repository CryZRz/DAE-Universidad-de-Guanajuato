import fs from "fs/promises"
import {join} from "path";
const {pathname} = new URL('../public', import.meta.url)

export const deleteArchive = async (name, path) => {
    try {
        await fs.unlink(join(pathname, path, name))
        return true
    } catch (e) {
        return false
    }
}