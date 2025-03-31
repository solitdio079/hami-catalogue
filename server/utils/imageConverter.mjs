import webp from 'webp-converter'
import fs from 'node:fs'

export default function imageConverter(inputPath, outputPath) {
    const result = webp.cwebp(
      inputPath,
      outputPath,
      '-q 80'
    )

    result.then((response) => {
        console.log("Hooray"+response)
        fs.unlinkSync(inputPath)
    })
    
}