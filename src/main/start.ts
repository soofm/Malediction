const fs = require('fs')

async function glob (dir: string, paths: string[] = []) {
  const files = await fs.readdir(dir)
  
}